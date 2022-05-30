import { createReducer } from "@reduxjs/toolkit"
import { BaseThunkActionType, PropertiesType } from "../types/redux"
import { UIUserData } from "../types/users"
import { addBaseCasesToBuilder, createBaseActions, createBaseInitialsState } from "./functions"
import usersApi from '../api/search'

const initialState = {
    ...createBaseInitialsState<UIUserData[]>()
}

const reducerKey = 'USERS'

export const actions = createBaseActions<UIUserData[]>(reducerKey)

type ActionType = ReturnType<PropertiesType<typeof actions>>

export const findUsers = (login: string): BaseThunkActionType<ActionType> => async (dispatch) => {
    if(login) {
        dispatch(actions.setIsGettingData(true))
        usersApi.getUsers(login).then(response => {
            if(response.data.data) {
                dispatch(actions.setData(response.data.data))
                dispatch(actions.setErrorMessage(null))
            } else {
                dispatch(actions.setErrorMessage('No data'))
            }
        }).catch(error => {
            const errorMessage = error.response?.data?.message || 'Unexpected error'
            dispatch(actions.setErrorMessage(errorMessage))
        }).finally(() => {
            dispatch(actions.setIsGettingData(false))
        })
    } else {
        dispatch(actions.setData(null))
    }
    
}

export default createReducer(initialState, (builder) => {
    const builderWithBaseCases = addBaseCasesToBuilder(builder, actions, initialState)
})