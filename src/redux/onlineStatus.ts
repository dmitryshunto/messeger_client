import { createAction, createReducer } from "@reduxjs/toolkit"
import { BaseThunkActionType, PropertiesType } from "../types/redux"
import { addBaseCasesToBuilder, createBaseActions, createBaseInitialsState } from "./functions"
import { UserSocketsData } from "../types/onlineStatus"
import webSocketApi from '../api/webSocket'

const initialState = {
    ...createBaseInitialsState<UserSocketsData[]>(),
    myOnlineStatus: false
}

const reducerKey = 'ONLINE_USERS'

const actions = {
    ...createBaseActions<UserSocketsData[]>(reducerKey),
    userConnected: createAction<UserSocketsData>(`${reducerKey}/USER_CONNECTED`),
    userDisconnected: createAction<number>(`${reducerKey}/USER_DISCONNECTED`),
    myOnlineStatusChanged: createAction<boolean>(`${reducerKey}/MY_ONLINE_STATUS_CHANGED`)
} 

type ActionType = ReturnType<PropertiesType<typeof actions>>

export const startListening = (): BaseThunkActionType<ActionType> => async (dispatch) => {
    webSocketApi.subscribe((users: UserSocketsData[]) => {
        dispatch(actions.setData(users))
    }, 'onlineUsers')
    webSocketApi.subscribe((user: UserSocketsData) => {
        dispatch(actions.userConnected(user))
    }, 'userConnected')
    webSocketApi.subscribe((userId: number) => {
        dispatch(actions.userDisconnected(userId))
    }, 'userDisconnected')
    webSocketApi.subscribe((onlineStatus: boolean) => {
        dispatch(actions.myOnlineStatusChanged(onlineStatus))
    }, 'onlineStatusChanged') 
}

export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder(builder, actions, initialState)
    builderWithBaseCases.addCase(actions.userConnected, (state, action) => {
        if(state.data) {
            state.data = [...state.data, action.payload]
        } else {
            state.data = [action.payload]
        }
    })
    builderWithBaseCases.addCase(actions.userDisconnected, (state, action) => {
        if(state.data) {
            state.data = state.data.filter(user => user.userId !== action.payload)
        }
    })
    builderWithBaseCases.addCase(actions.myOnlineStatusChanged, (state, action) => {
        state.myOnlineStatus = action.payload
    })

})