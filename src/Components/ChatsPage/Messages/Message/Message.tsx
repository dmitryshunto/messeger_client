import React from "react"
import { MessageType } from './../../../../types/chats';

const Message: React.FC<MessageType> = (props) => {
    return (
        <div>
            {props.body}
        </div>
    )
}

export default Message