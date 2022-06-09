import React from "react"
import { Link } from "react-router-dom"
import { ChatData } from '../../../../types/chats'
import ShowAvatar from "../../../CommonComponents/ShowAvatar/ShowAvatar"

const Chat: React.FC<ChatData> = ({ name, id, newMessages, chatPhotoUrl }) => {
    return (
        <div>
            <Link to={`${id}`}>
                <ShowAvatar 
                    src={chatPhotoUrl}
                />
                {`${name} (${newMessages})`}
            </Link>
        </div>
    )
}

export default Chat