import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { createBaseActions, createBaseInitialsState } from "../redux/functions";
import { RootState } from "../redux/redux";

export type BaseThunkActionType<A extends Action> = ThunkAction<Promise<void>, RootState, unknown, A>

export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type BaseActionsType = ReturnType<typeof createBaseActions>

export interface ReducerState<D> {
    isGettingData: boolean
    data: null | D
    errorMessage: string | null
}

export type ThunkType = ThunkDispatch<RootState, unknown, any>
