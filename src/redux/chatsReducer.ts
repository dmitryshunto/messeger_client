import { createAction, createReducer } from "@reduxjs/toolkit"
import { ChatData, MessageType } from "../types/chats"
import { BaseThunkActionType, PropertiesType } from "../types/redux"
import { addBaseCasesToBuilder, apiRequestHandler, createBaseActions, createBaseInitialsState } from "./functions"
import chatApi from '../api/chats'
import { SubscriberType } from "../types/webSocket"
import webSocketApi from '../api/webSocket'

const initialState = {
    ...createBaseInitialsState<ChatData[]>(true),
}

const reducerKey = 'CHATS'

export const actions = {
    ...createBaseActions<ChatData[]>(reducerKey),
    newMessage: createAction<number>(`${reducerKey}/setChatsNewMessages`),
    newChat: createAction<ChatData>(`${reducerKey}/newChat`)
}

type ActionType = ReturnType<PropertiesType<typeof actions>>

export const getChats = (): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    apiRequestHandler(chatApi.getChats, dispatch, actions)
    dispatch(startListening())
}

let messageCallback: SubscriberType<MessageType> | null = null
let chatCreatedCallback: SubscriberType<ChatData> | null = null

export const startListening = (): BaseThunkActionType<ActionType> => async (dispatch, getState) => {
    if(!messageCallback) {
        // here we are checking existing callback, if it doesnt exist we assign it the value and make the subcription
        messageCallback = (message: MessageType) => {
            dispatch(actions.newMessage(message.chatId))
        }
        webSocketApi.subscribe(messageCallback, 'message')
    }
    if(!chatCreatedCallback) {
        // here we are checking existing callback, if it doesnt exist we assign it the value and make the subcription
        chatCreatedCallback = (data: ChatData) => {
            dispatch(actions.newChat(data))
        }
        webSocketApi.subscribe(chatCreatedCallback, 'chatCreated')
    }
}

export const stopListening = () => {
    if (messageCallback) {
        webSocketApi.subscribe(messageCallback, 'message')()
        messageCallback = null
    }
    if (chatCreatedCallback) {
        webSocketApi.subscribe(chatCreatedCallback, 'chatCreated')()
        chatCreatedCallback = null
    }
}

export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder(builder, actions, initialState, stopListening)
    builderWithBaseCases
        .addCase(actions.newMessage, (state, action) => {
            const chat = state.data?.find(chat => chat.id === action.payload)
            if(chat) {
                chat.newMessages = chat.newMessages === null ? 1 : chat.newMessages + 1
            }           
        })
        .addCase(actions.newChat, (state, action) => {
            if(state.data) state.data = [action.payload, ...state.data]
            else state.data = [action.payload]
        })
})
