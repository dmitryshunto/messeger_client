import { createReducer } from "@reduxjs/toolkit"
import { BaseThunkActionType, PropertiesType } from "../types/redux"
import { UIUserData } from "../types/users"
import { addBaseCasesToBuilder, apiRequestHandler, createBaseActions, createBaseInitialsState } from "./functions"
import profileApi from '../api/profile'

const initialState = {
    ...createBaseInitialsState<UIUserData>(true)
}

const reducerKey = 'MY_PROFILE'

export const actions = createBaseActions<UIUserData>(reducerKey)

type ActionType = ReturnType<PropertiesType<typeof actions>>

export const getMyProfile = (): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    apiRequestHandler(profileApi.getMyProfile, dispatch, actions)
}

export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder(builder, actions, initialState)
})
