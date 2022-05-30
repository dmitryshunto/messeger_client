import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/redux'
import { AnyFunction } from '../types/common'
import { BaseThunkActionType } from '../types/redux'

type ThunkCreator<F extends AnyFunction> = (...args: Parameters<F>) => BaseThunkActionType<any>

export function useGettingData<D, F extends AnyFunction>(thunkCreator: ThunkCreator<F>, dataSelecor: (state: RootState) => D,
                                  clearData:  null | ActionCreatorWithoutPayload, ...args: Parameters<typeof thunkCreator>) {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkCreator(...args))
        if(clearData) return () => {
            dispatch(clearData())
        }
    }, [dispatch, clearData, thunkCreator, ...args])
    
    const data = useSelector(dataSelecor)
    return data
}