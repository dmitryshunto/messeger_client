import { createAction, createReducer } from "@reduxjs/toolkit"
import { BaseThunkActionType, EventHandlersType, PropertiesType } from "../types/redux"
import { addBaseCasesToBuilder, apiRequestHandler, createBaseActions, createBaseInitialsState, subscribeCallback, unSubscribeCallback } from "./functions"
import chatApi from '../api/chats'
import { BaseMessageData, GetMessagesResponse, MessageType } from "../types/chats"
import webSocketApi from '../api/webSocket'
import { dataReceivingErrMsg } from "../config"
import { ReadMessageData } from "../types/webSocket"
import {actions as authActions} from './authorizationReducer'

const initialState = {
    ...createBaseInitialsState<GetMessagesResponse>(true),
    chatId: null as number | null,
    readMessages: [] as MessageType[],
    unreadMessages: [] as MessageType[],
    unsentMessages: [] as BaseMessageData[],
    isAllMesagesReceived: false,
    isMoreMessagesReceiving: false
}

const reducerKey = 'MESSAGES'

export const actions = {
    ...createBaseActions<GetMessagesResponse>(reducerKey),
    messageSent: createAction<MessageType>(`${reducerKey}/MESSAGE_SENT`),
    setChatId: createAction<number>(`${reducerKey}/SET_CHAT_ID`),
    messageSendingError: createAction<BaseMessageData>(`${reducerKey}/MESSAGE_SENDING_ERROR`),
    deleteUnsentMessage: createAction<number>(`${reducerKey}/DELETE_UNSENT_MESSAGE`),
    addMoreMessages: createAction<MessageType[]>(`${reducerKey}/ADD_MORE_MESSAGES`),
    allMessagesReceived: createAction(`${reducerKey}/ALL_PREDICTION_RECEIVED`),
    setIsMoreMessagesReceiving: createAction<boolean>(`${reducerKey}/SET_IS_MORE_MESSAGES_RECEIVING`),
    setReadMessages: createAction<MessageType[]>(`${reducerKey}/SET_READ_MESSAGES`),
    setUnreadMessages: createAction<MessageType[]>(`${reducerKey}/SET_UNREAD_MESSAGES`),
    setUserLastReadMessageId: createAction(`${reducerKey}/SET_USER_LAST_READ_MESSAGE_ID`, (userId: number, lastReadMessageId: number) => {
        return {
            payload: {
                userId,
                lastReadMessageId 
            }
        }
    })
}

type ActionType = ReturnType<PropertiesType<typeof actions>>

export const getMessages = (chatId: string): BaseThunkActionType<ActionType> => async (dispatch, getState) => {
    dispatch(actions.setIsGettingData(true))
    dispatch(actions.setChatId(+chatId))
    dispatch(startListening())
    await apiRequestHandler<GetMessagesResponse, typeof chatApi.getMessages>(chatApi.getMessages, dispatch, actions, chatId)
    const state = getState()
    const messages = state.messages.data?.messages
    if (messages) {
        dispatch(divideReadUnreadMessages())
        const newLastReadMessageId = messages[messages.length - 1].id
        webSocketApi.messageRead(newLastReadMessageId, +chatId)
        dispatch(authActions.messageRead(+chatId))        
    }
}

const divideReadUnreadMessages = (): BaseThunkActionType<ActionType> => async (dispatch, getState) => {
    const state = getState()
    const messages = state.messages.data?.messages
    if (messages) {
        const userId = state.authorization.data?.id
        const lastReadMessageId = state.messages.data?.membersData.find(member => member.id === userId)?.lastReadMessageId
        if (lastReadMessageId) {
            const unreadMessages: MessageType[] = []
            const readMessages: MessageType[] = []
            messages.forEach(message => {
                if (lastReadMessageId && message.id <= lastReadMessageId) {
                    readMessages.push(message)
                } else {
                    unreadMessages.push(message)
                }
            })
            dispatch(actions.setReadMessages(readMessages))
            dispatch(actions.setUnreadMessages(unreadMessages))
        } else {
            dispatch(actions.setUnreadMessages(messages))
        }
    }
} 

export const getMoreMessages = (): BaseThunkActionType<ActionType> => async (dispatch, getState) => {
    const state = getState()
    const chatId = state.messages.chatId
    const oldestMessageId = state.messages.data?.messages[0].id
    if (chatId && oldestMessageId) {
        dispatch(actions.setIsMoreMessagesReceiving(true))
        chatApi.getMessages(`${chatId}`, oldestMessageId).then(response => {
            if (response.data.data) {
                const additioanalMessages = response.data.data.messages
                if (additioanalMessages.length) {
                    dispatch(actions.addMoreMessages(additioanalMessages))
                    dispatch(divideReadUnreadMessages())
                } else {
                    dispatch(actions.allMessagesReceived())
                }
                dispatch(actions.setErrorMessage(null))
            } else {
                dispatch(actions.setErrorMessage(dataReceivingErrMsg))
            }
        }).catch(error => {
            dispatch(actions.setErrorMessage(error.response?.data?.message))
        }).finally(() => {
            dispatch(actions.setIsMoreMessagesReceiving(false))
        })
    }
}

const eventCallbacks: EventHandlersType = {}

export const startListening = (): BaseThunkActionType<ActionType> => async (dispatch, getState) => {
    const eventHandlers: EventHandlersType = {
        'message': (message: MessageType) => {
            const state = getState()
            const userId = state.authorization.data?.id
            dispatch(actions.messageSent(message))
            if (userId) {
                webSocketApi.messageRead(message.id, message.chatId)
                dispatch(authActions.messageRead(message.chatId))
                dispatch(actions.setUserLastReadMessageId(userId, message.id))
                dispatch(divideReadUnreadMessages())
            }
        },
        'messageRead': (data: ReadMessageData) => {
            const state = getState()
            if(state.messages.chatId === data.chatId) {
                dispatch(actions.setUserLastReadMessageId(data.userId, data.messageId))
            }
        }    
    } as const
    subscribeCallback(eventCallbacks, eventHandlers)   
}

export const stopListening = () => {
    unSubscribeCallback(eventCallbacks)
}

export const sendMessage = (chatId: number, messageText: string): BaseThunkActionType<ActionType> => async (dispatch, getState) => {
    const state = getState()
    const userId = state.authorization.data?.id
    const isOnline = state.onlineUsers.myOnlineStatus
    if (userId) {
        const messageData: BaseMessageData = { chatId, userId, body: messageText }
        if (isOnline) {
            try {
                webSocketApi.sendMessage(messageData)
            } catch (e) {
                console.log(e)
                dispatch(actions.messageSendingError(messageData))
            }
        } else {
            dispatch(actions.messageSendingError(messageData))
        }
    }
}

export const resendUnsentMesage = (chatId: number, messageText: string, unsentMessageIndex: number): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(sendMessage(chatId, messageText))
    dispatch(actions.deleteUnsentMessage(unsentMessageIndex))
}

export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder(builder, actions, initialState, stopListening)
    builderWithBaseCases
        .addCase(actions.messageSent, (state, action) => {
            if (state.chatId === action.payload.chatId) {
                state.data?.messages.push(action.payload)
                state.readMessages.push(action.payload)
            }
        })
        .addCase(actions.setChatId, (state, action) => {
            state.chatId = action.payload
        })
        .addCase(actions.messageSendingError, (state, action) => {
            state.unsentMessages.push(action.payload)
        })
        .addCase(actions.deleteUnsentMessage, (state, actions) => {
            state.unsentMessages = state.unsentMessages.filter((message, index) => {
                if (index !== actions.payload) return message
            })
        })
        .addCase(actions.addMoreMessages, (state, action) => {
            if (state.data) state.data.messages = [...action.payload, ...state.data.messages]
        })
        .addCase(actions.allMessagesReceived, (state) => {
            state.isAllMesagesReceived = true
        })
        .addCase(actions.setIsMoreMessagesReceiving, (state, action) => {
            state.isMoreMessagesReceiving = action.payload
        })
        .addCase(actions.setReadMessages, (state, action) => {
            state.readMessages = action.payload
        })
        .addCase(actions.setUnreadMessages, (state, action) => {
            state.unreadMessages = action.payload
        })
        .addCase(actions.setUserLastReadMessageId, (state, action) => {
            const user = state.data?.membersData.find(member => member.id === action.payload.userId)
            if(user) user.lastReadMessageId = action.payload.lastReadMessageId
        })
})