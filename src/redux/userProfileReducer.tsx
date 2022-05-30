import { createReducer } from "@reduxjs/toolkit"
import { BaseThunkActionType, PropertiesType } from "../types/redux"
import { addBaseCasesToBuilder, apiRequestHandler, createBaseActions, createBaseInitialsState } from "./functions"
import profileApi from '../api/profile'
import { UIUserData } from "../types/users"

const baseInitialState = createBaseInitialsState<UIUserData>(true)

const initialState = {
    ...baseInitialState
}

const reducerKey = 'USER_PROFILE'

const baseActions = createBaseActions<UIUserData>(reducerKey)

export const actions = {
    ...baseActions
}

type ActionType = ReturnType<PropertiesType<typeof actions>>

export const getUserProfile = (id: string): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    apiRequestHandler<UIUserData, typeof profileApi.getUserProfile>(profileApi.getUserProfile, dispatch, actions, id)
}

export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder(builder, baseActions, initialState)
})