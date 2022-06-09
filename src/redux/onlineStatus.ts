import { createAction, createReducer } from "@reduxjs/toolkit"
import { BaseThunkActionType, EventHandlersType, PropertiesType } from "../types/redux"
import { addBaseCasesToBuilder, createBaseActions, createBaseInitialsState, subscribeCallback, unSubscribeCallback } from "./functions"
import { UserSocketsData } from "../types/onlineStatus"
import { EmitEventTypes } from '../api/webSocket'

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

const eventCallbacks: EventHandlersType = {}

export const startListening = (): BaseThunkActionType<ActionType> => async (dispatch) => {
    const eventHandlers: EventHandlersType = {
        'onlineUsers': (users: UserSocketsData[]) => {
            dispatch(actions.setData(users))
        },
        'userConnected': (user: UserSocketsData) => {
            dispatch(actions.userConnected(user))
        },
        'userDisconnected': (userId: number) => {
            dispatch(actions.userDisconnected(userId))
        },
        'onlineStatusChanged': (onlineStatus: boolean) => {
            dispatch(actions.myOnlineStatusChanged(onlineStatus))
        }    
    } as const 
    
    for(let event in eventHandlers) {
        const callback = eventHandlers[event]
        subscribeCallback(eventCallbacks, callback, event as EmitEventTypes)
    }
}

export const stopListening = () => {
    unSubscribeCallback(eventCallbacks)
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