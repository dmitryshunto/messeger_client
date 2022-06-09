import { createAction, createReducer } from "@reduxjs/toolkit"
import { ChatData, MessageType } from "../types/chats"
import { BaseThunkActionType, EventHandlersType, PropertiesType } from "../types/redux"
import { addBaseCasesToBuilder, apiRequestHandler, createBaseActions, createBaseInitialsState, subscribeCallback, unSubscribeCallback } from "./functions"
import chatApi from '../api/chats'

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

const eventCallbacks: EventHandlersType = {}

export const startListening = (): BaseThunkActionType<ActionType> => async (dispatch, getState) => {
    const eventHandlers: EventHandlersType = {
        'message': (message: MessageType) => {
            dispatch(actions.newMessage(message.chatId))
        },
        'chatCreated': (data: ChatData) => {
            dispatch(actions.newChat(data))
        }
    }
    subscribeCallback(eventCallbacks, eventHandlers)
}

export const stopListening = () => {
    unSubscribeCallback(eventCallbacks)
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
