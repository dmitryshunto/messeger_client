import { BaseThunkActionType, PropertiesType } from "../types/redux"
import { createBaseActions, createBaseInitialsState, addBaseCasesToBuilder, apiRequestHandler } from "./functions"
import chatApi from '../api/chats'
import { createAction, createReducer } from "@reduxjs/toolkit"
import { StartingPrivateChatInfo } from "../types/chats"
import { dataReceivingErrMsg, notAuthMsg } from "../config"

const baseInitialState = createBaseInitialsState<StartingPrivateChatInfo>()

const initialState = {
    ...baseInitialState,
}

const reducerKey = 'CREATE_CHAT'

const baseActions = createBaseActions<StartingPrivateChatInfo>(reducerKey)

export const actions = {
    ...baseActions,
    setChatId: createAction<number>(`${reducerKey}/SET_CHAT_ID`)
}

type ActionType = ReturnType<PropertiesType<typeof actions>>

export const createChat = (companionId: number, body: string, chatName?: string): BaseThunkActionType<ActionType> => async (dispatch, getState) => {
    const userId = getState().authorization.data?.id
    if(!userId) {
        dispatch(actions.setErrorMessage(notAuthMsg))
    } else {
        const memberIds = [userId, companionId]
        dispatch(actions.setIsGettingData(true))
        chatApi.createChat(memberIds, body, userId, chatName).then((response) => {
            if(response.data.data) {
                dispatch(actions.setChatId(response.data.data.id))
                dispatch(actions.setErrorMessage(null))
            } else {
                dispatch(actions.setErrorMessage(dataReceivingErrMsg))
            }
        }).catch(error => {
            dispatch(actions.setErrorMessage(error.response?.data?.message))
        }).finally(() => {
            dispatch(actions.setIsGettingData(false))
        })
    }
}

export const getStartingChatInfo = (companionId: number): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    apiRequestHandler<StartingPrivateChatInfo, typeof chatApi.getStartingChatInfo>(chatApi.getStartingChatInfo, dispatch, actions, companionId)
}

export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder(builder, baseActions, initialState)
    builderWithBaseCases
        .addCase(actions.setChatId, (state, action) => {
            if(state.data) state.data.chatId = action.payload
        })
})
