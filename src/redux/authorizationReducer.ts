import { BaseThunkActionType, PropertiesType } from '../types/redux'
import { MyProfileData, UIUserData, UserAuthorizationData, UserRegistrationData, UserRegistrationFormData, ValidationError } from '../types/users'
import authorizationAPI from '../api/authorization'
import webSocketApi from '../api/webSocket'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { addBaseCasesToBuilder, createBaseActions, createBaseInitialsState } from './functions'
import { startListening as startOnlineStatusListening } from './onlineStatus'
import { dataReceivingErrMsg, notAuthMsg } from '../config'
import { MessageData, ReadMessageData, SubscriberType } from '../types/webSocket'
import { MessageType } from '../types/chats'
import { getFileFromDataUrl } from '../functions/common'

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
            dispatch(startOnlineStatusListening())
            dispatch(startListening())
        } else {
            dispatch(actions.setErrorMessage(dataReceivingErrMsg))
        }
    }).catch(error => {
        const errorMessage = error.response?.data?.message || 'Unexpected error'
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
            dispatch(startOnlineStatusListening())
        } else {
            dispatch(actions.setErrorMessage('Data recieving error!'))
        }
    }).catch(error => {
        dispatch(actions.setErrorMessage(error.response?.data?.message))
        dispatch(actions.setValidationErrors(error.response?.data?.errors))
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
            dispatch(startOnlineStatusListening())
        }
    }).catch(error => {
        dispatch(actions.setErrorMessage(notAuthMsg))
    }).finally(() => {
        dispatch(actions.setIsGettingData(false))
    })
}

let messageSentCallback: SubscriberType<MessageType> | null = null

export const startListening = (): BaseThunkActionType<ActionType> => async (dispatch) => {
    if (!messageSentCallback) {
        messageSentCallback = (message) => {
            dispatch(actions.messageSent(message.chatId))
        }
        webSocketApi.subscribe(messageSentCallback, 'message')
    }
}

export const stopListening = () => {
    if (messageSentCallback) {
        webSocketApi.subscribe(messageSentCallback, 'message')()
        messageSentCallback = null
    }
}

export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder<MyProfileData, typeof initialState>(builder, baseActions)
    builderWithBaseCases
        .addCase(actions.setCreatingUserSuccessMesage, (state, acion) => {
            state.creatingUserSuccessMessage = acion.payload
        })
        .addCase(actions.setValidationErrors, (state, action) => {
            state.validationErrors = action.payload
        })
        .addCase(actions.setInitialState, (state) => {
            webSocketApi.stop()
            return initialState
        })
        .addCase(actions.messageSent, (state, action) => {
            const newMessages = state.data?.newMessages
            if (newMessages && !newMessages.find(chatId => chatId === action.payload)) {
                newMessages.push(action.payload)
            }
        })
        .addCase(actions.messageRead, (state, action) => {
            if (state.data) {
                state.data.newMessages = state.data.newMessages.filter(chatId => chatId !== action.payload)
            }
        })
})