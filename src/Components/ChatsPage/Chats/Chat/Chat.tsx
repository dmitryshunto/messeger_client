import React from "react"
import { Link } from "react-router-dom"
import { ChatData } from '../../../../types/chats'

const Chat: React.FC<ChatData> = ({ name, id, newMessages }) => {
    return (
        <div>
            <Link to={`${id}`}>
                {`${name} (${newMessages})`}
            </Link>
        </div>
    )
}

export default Chat