import { RootState } from "../redux/redux"
import { ValidationError } from "./users"

export type BaseResponse<D, E = ValidationError[]> = {
    message: string
    data?: D
    errors?: E
}


export type DataSelector<D> = (state: RootState) => D

export type AnyFunction = (...args: any) => any