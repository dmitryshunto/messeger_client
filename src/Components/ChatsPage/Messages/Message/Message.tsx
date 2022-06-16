import React, { MutableRefObject } from "react"
import ShowAvatar from "../../../CommonComponents/ShowAvatar/ShowAvatar";
import { UIMessageData } from './../../../../types/chats';
import css from './Message.module.css'
import { format } from 'timeago.js'
import cn from 'classnames'

interface Props extends UIMessageData {
    scrollRef: MutableRefObject<null | HTMLDivElement>
    companionLastReadMessageId: number | null | undefined
}

const Message: React.FC<Props> = React.memo((props) => {
    let isReadByCompanion = false
    if(props.companionLastReadMessageId && props.companionLastReadMessageId >= props.id) isReadByCompanion = true
    return (
        <div className={cn(
            css.message,
            { [css.own]: props.isOwn }
        )}
            ref={props.scrollRef}
        >
            <div className={css.messageText}>
                {props.body}
            </div>
            <div className={css.messageBottom}>
                <div>{format(props.createdAt)}</div>
                <div>{isReadByCompanion && props.isOwn && 'v'}</div>
            </div>
        </div>
    )
})

export default Message