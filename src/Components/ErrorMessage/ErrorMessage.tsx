import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Button, Modal } from 'antd';
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/redux'

type Props = {
    message: string | null
    actionCreator?: ActionCreatorWithPayload<any>
}

const ErrorMessage: React.FC<Props> = ({ message, actionCreator }) => {
    const dispatch: AppDispatch = useDispatch()

    const closeModal = useCallback(() => {
        if (actionCreator) dispatch(actionCreator(null))
    }, [dispatch])

    if (!message) return null
    return (
        <Modal
            closable={false}
            visible={!!message}
            footer={
                [
                    <Button key="back" onClick={closeModal}>
                        Ok
                    </Button>
                ]
            }
        >
            {message}
        </Modal>
    )
}

export default ErrorMessage