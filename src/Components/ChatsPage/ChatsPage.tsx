import React from 'react'
import { Outlet } from 'react-router-dom'

const ChatsPage: React.FC = () => {
    return (
        <div>
            <h1>Chats</h1>
            <Outlet />
        </div>
    )
}

export default ChatsPage