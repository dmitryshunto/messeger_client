import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../redux/redux"
import { BaseMessageData } from "../../../../types/chats"
import { actions, resendUnsentMesage } from './../../../../redux/messagesReducer';
import css from '../Message/Message.module.css'
import { CloseOutlined, RedoOutlined } from "@ant-design/icons";
import cn from 'classnames';
import styles from './UnsentMessage.module.css'

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
        <div
            className={cn(css.message, css.own)}
        >
            <CloseOutlined 
                onClick={deleteMessage}
            />
            <RedoOutlined 
                onClick={resendMessage}
            />
            <div
                className = {css.messageText}
            >
                {props.body}
            </div>
            <div 
                className={styles.redPoint}
            />
        </div>
    )
}

export default UnsentMessage