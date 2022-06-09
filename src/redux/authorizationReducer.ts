import { BaseThunkActionType, EventHandlersType, PropertiesType } from '../types/redux'
import { MyProfileData, UserAuthorizationData, UserRegistrationFormData, ValidationError } from '../types/users'
import authorizationAPI from '../api/authorization'
import webSocketApi from '../api/webSocket'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { addBaseCasesToBuilder, createBaseActions, createBaseInitialsState, subscribeCallback, unSubscribeCallback } from './functions'
import { startListening as startOnlineStatusListening } from './onlineStatus'
import { dataReceivingErrMsg, serverError } from '../config'
import { SubscriberType } from '../types/webSocket'
import { MessageType } from '../types/chats'
import UIfx from 'uifx'
import {stopListening as stopOnlineStatusListening} from './onlineStatus'

const notificationSoundFile = require('../sounds/newPrediction.mp3')
const notificationSound = new UIfx(notificationSoundFile)

const initialState = {
    ...createBaseInitialsState<MyProfileData>(true),
    creatingUserSuccessMessage: null as string | null,
    validationErrors: null as ValidationError[] | null
}

const reducerKey = 'AUTHORIZATION'

const baseActions = createBaseActions<MyProfileData>(reducerKey)

export const actions = {
    ...baseActions,
    setCreatingUserSuccessMesage: createAction<string | null>(`${reducerKey}/SET_CREATING_USER_SUCCESS_MESSAGE`),
    setValidationErrors: createAction<ValidationError[] | null>(`${reducerKey}/SET_VALIDATION_ERRORS`),
    messageSent: createAction<number>(`${reducerKey}/messageSent`),
    messageRead: createAction<number>(`${reducerKey}/messageRead`)
}

export type ActionType = ReturnType<PropertiesType<typeof actions>>

export const authorizeUser = (data: UserAuthorizationData): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    authorizationAPI.authorize(data).then(response => {
        if (response.data.data) {
            dispatch(actions.setData(response.data.data.user))
            localStorage.setItem('token', response.data.data.tokens['accessToken'])
            dispatch(actions.setErrorMessage(null))
            webSocketApi.start(response.data.data.tokens.accessToken)
            dispatch(startListening())
        } else {
            dispatch(actions.setErrorMessage(dataReceivingErrMsg))
        }
    }).catch(error => {
        const errorMessage = error.response?.data?.message || serverError
        dispatch(actions.setErrorMessage(errorMessage))
    }).finally(() => {
        dispatch(actions.setIsGettingData(false))
    })
}

export const createUser = (data: UserRegistrationFormData): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    authorizationAPI.create(data).then(response => {
        if (response.data.data) {
            dispatch(actions.setData(response.data.data.user))
            dispatch(actions.setCreatingUserSuccessMesage(response.data.message))
            localStorage.setItem('token', response.data.data.tokens['accessToken'])
            dispatch(actions.setValidationErrors(null))
            dispatch(actions.setErrorMessage(null))
            dispatch(startListening())
        } else {
            dispatch(actions.setErrorMessage(dataReceivingErrMsg))
        }
    }).catch(error => {
        if(error.response) {
            dispatch(actions.setErrorMessage(error.response?.data?.message))
            dispatch(actions.setValidationErrors(error.response?.data?.errors))
        } else {
            dispatch(actions.setErrorMessage(serverError))
        }  
    }).finally(() => {
        dispatch(actions.setIsGettingData(false))
    })
}

export const logout = (): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    authorizationAPI.logout().then(response => {
        localStorage.removeItem('token')
        dispatch(actions.setData(null))
        webSocketApi.stop()
        stopListening()
    }).catch(error => {
        dispatch(actions.setErrorMessage(error.response?.data?.message))
    }).finally(() => {
        dispatch(actions.setIsGettingData(false))
    })
}

export const checkAuth = (): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    authorizationAPI.checkAuth().then(response => {
        if (response.data.data) {
            dispatch(actions.setData(response.data.data.user))
            localStorage.setItem('token', response.data.data.tokens['accessToken'])
            webSocketApi.start(response.data.data.tokens.accessToken)
            dispatch(startListening())
        }
    }).catch(error => {
        const errorMessage = 'Please sing in!'
        dispatch(actions.setErrorMessage(errorMessage))
    }).finally(() => {
        dispatch(actions.setIsGettingData(false))
    })
}

const eventCallbacks: EventHandlersType = {}

export const startListening = (): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(startOnlineStatusListening())
    const eventHandlers: EventHandlersType = {
        'message': (message) => {
            dispatch(actions.messageSent(message.chatId))
        }
    }
    subscribeCallback(eventCallbacks, eventHandlers)
}

export const stopListening = () => {
    stopOnlineStatusListening()
    unSubscribeCallback(eventCallbacks)
    webSocketApi.stop()
}

export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder<MyProfileData, typeof initialState>(builder, baseActions, initialState, stopListening)
    builderWithBaseCases
        .addCase(actions.setCreatingUserSuccessMesage, (state, acion) => {
            state.creatingUserSuccessMessage = acion.payload
        })
        .addCase(actions.setValidationErrors, (state, action) => {
            state.validationErrors = action.payload
        })
        .addCase(actions.messageSent, (state, action) => {
            const newMessages = state.data?.newMessages
            if (newMessages && !newMessages.find(chatId => chatId === action.payload)) {
                newMessages.push(action.payload)
                notificationSound.play()
            }
        })
        .addCase(actions.messageRead, (state, action) => {
            if (state.data) {
                state.data.newMessages = state.data.newMessages.filter(chatId => chatId !== action.payload)
            }
        })
})