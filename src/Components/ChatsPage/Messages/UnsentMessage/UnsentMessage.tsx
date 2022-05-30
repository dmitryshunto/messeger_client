import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../redux/redux"
import { BaseMessageData } from "../../../../types/chats"
import { actions, resendUnsentMesage } from './../../../../redux/messagesReducer';

interface Props extends BaseMessageData {
    index: number
}

const UnsentMessage: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()

    const deleteMessage = useCallback(() => {
        dispatch(actions.deleteUnsentMessage(props.index))
    }, [dispatch, props.index])

    const resendMessage = useCallback(() => {
        dispatch(resendUnsentMesage(props.chatId, props.body, props.index))
    }, [dispatch, props.chatId, props.body, props.index])

    return (
        <div>
            <button onClick={deleteMessage}>X</button>
            <button onClick={resendMessage}>Resend</button>
            {props.body}
        </div>
    )
}

export default UnsentMessage