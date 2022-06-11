import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage'
import { DataSelector } from '../types/common'

export function withErrorMessage<Props>(Component: FC<Props>, selector: DataSelector<string | null>, cancelActionCreator?: ActionCreatorWithPayload<any>) {
    const NewComponent: FC<Props> = (props) => {
        const errorMessage = useSelector(selector)
        return (
            <>
                <Component {...props} />
                {
                    errorMessage && 
                    <ErrorMessage
                        actionCreator={cancelActionCreator}
                        message={errorMessage}
                    />
                }
            </>
        )
    }
    return NewComponent
}