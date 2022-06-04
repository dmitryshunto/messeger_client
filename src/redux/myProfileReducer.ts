import { createAction, createReducer } from "@reduxjs/toolkit"
import { BaseThunkActionType, PropertiesType } from "../types/redux"
import { UIUserData } from "../types/users"
import { addBaseCasesToBuilder, apiRequestHandler, createBaseActions, createBaseInitialsState } from "./functions"
import profileApi from '../api/profile'
import { PhotoUrl } from "../types/myProfile"

const initialState = {
    ...createBaseInitialsState<UIUserData>(true)
}

const reducerKey = 'MY_PROFILE'

export const actions = {
    ...createBaseActions<UIUserData>(reducerKey),
    updatePhoto: createAction<PhotoUrl>(`${reducerKey}/updatePhoto`)
}

type ActionType = ReturnType<PropertiesType<typeof actions>>

export const getMyProfile = (): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    apiRequestHandler(profileApi.getMyProfile, dispatch, actions)
}

export const updatePhoto = (base64PhotoUrl: string): BaseThunkActionType<ActionType> => async (dispatch) => {
    dispatch(actions.setIsGettingData(true))
    profileApi.updatePhoto(base64PhotoUrl).then(response => {
        if(response.data.data) {
            dispatch(actions.updatePhoto(response.data.data))
            dispatch(actions.setErrorMessage(null))
        }
    }).catch(error => {
        dispatch(actions.setErrorMessage(error.response?.data?.message))
    }).finally(() => {
        dispatch(actions.setIsGettingData(false))
    })
}
export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder(builder, actions, initialState)
    builderWithBaseCases
        .addCase(actions.updatePhoto, (state, action) => {
            if(state.data) state.data.photoUrl = action.payload.photoUrl
        })

})
