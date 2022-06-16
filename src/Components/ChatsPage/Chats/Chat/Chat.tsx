import React from "react"
import { Link } from "react-router-dom"
import { useOnlineStatus } from "../../../../hooks/useOnlineStatus"
import { ChatData } from '../../../../types/chats'
import OnlineStatus from "../../../CommonComponents/OnlineStatus/OnlineStatus"
import ShowAvatar from "../../../CommonComponents/ShowAvatar/ShowAvatar"
import css from './Chat.module.css'
import cn from 'classnames'
import NewMessage from './NewMessage/NewMessage';

const Chat: React.FC<ChatData> = ({ name, id, newMessages, chatPhotoUrl, companionId }) => {
    const onlineStatus = useOnlineStatus(companionId || 0)
    return (
        <div className={cn(css.chat, {[css.newMessageChat]: newMessages})}>
            <Link to={`${id}`}>
                    <ShowAvatar
                        src={chatPhotoUrl}
                        size={64}
                        onlineStatus = {onlineStatus}
                    />
                
                <div className={css.login}>
                    <div>{name}</div>
                    <NewMessage 
                        newMessages={newMessages}
                    />
                </div>
            </Link>
        </div>
    )
}

export default Chat