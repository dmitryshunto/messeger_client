import { ActionReducerMapBuilder, createAction } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios";
import { dataReceivingErrMsg } from "../config";
import { MessageType, UIMessageData } from "../types/chats";
import { AnyFunction, BaseResponse } from "../types/common";
import { ReducerState, ThunkType } from './../types/redux'

export function createBaseInitialsState<D>(isGettingData?: boolean): ReducerState<D> {
    if (isGettingData === undefined) isGettingData = false
    return {
        data: null as null | D,
        isGettingData,
        errorMessage: null as string | null
    }
}

export function createBaseActions<D>(reducerKey: string) {
    return {
        setData: createAction<D | null>(`${reducerKey}/SET_DATA`),
        setIsGettingData: createAction<boolean>(`${reducerKey}/SET_IS_GETTING_DATA`),
        setErrorMessage: createAction<string | null>(`${reducerKey}/SET_ERROR_MESSAGE`),
        setInitialState: createAction(`${reducerKey}/SET_INITIAL_STATE`)
    }
}

// class for getting return type from generic functions

class Wrapper<D> {
    // wrapped has no explicit return type so we can infer it
    baseActions(reducerKey: string) {
        return createBaseActions<D>(reducerKey)
    }
}

type BaseActions<D> = ReturnType<Wrapper<D>['baseActions']>

export function addBaseCasesToBuilder<D, S extends ReducerState<D>>(builder: ActionReducerMapBuilder<S>, actions: BaseActions<D>, initialState?: any, stopListening?: () => void) {
    // const actions = createBaseActions<D, S>(reducerKey)
    builder
        .addCase(actions.setData, (state, action) => {
            state.data = action.payload
        })
        .addCase(actions.setIsGettingData, (state, action) => {
            state.isGettingData = action.payload
        })
        .addCase(actions.setErrorMessage, (state, action) => {
            state.errorMessage = action.payload
        })
    if (initialState) {
        const callback = () => {
            if(stopListening) stopListening()
            return initialState
        }
        builder.addCase(actions.setInitialState, callback)
    } 
    return builder
}

type AxiosRes<D, F extends AnyFunction> = (...args: Parameters<F>) => Promise<AxiosResponse<BaseResponse<D>>>

export function apiRequestHandler<D, F extends AnyFunction>(apiRequest: AxiosRes<D, F>, dispatch: ThunkType, actions: BaseActions<D>, ...args: Parameters<typeof apiRequest>) {
    return new Promise((resolve) => {
        const handler = apiRequest.call(null, ...args).then(response => {
            if (response.data.data) {
                dispatch(actions.setData(response.data.data))
                dispatch(actions.setErrorMessage(null))
            } else (
                dispatch(actions.setErrorMessage(dataReceivingErrMsg))
            )
        }).catch(error => {
            dispatch(actions.setErrorMessage(error.response?.data?.message))
        }).finally(() => {
            dispatch(actions.setIsGettingData(false))
        })
        resolve(handler)
    })
}

export const addUIDataToMessage = (message: MessageType): UIMessageData => {
    return {
        ...message,
        isSending: false,
        sendingSuccess: null
    }
}