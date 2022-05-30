import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit"
import authorizationReducer from "./authorizationReducer"
import chatsReducer from "./chatsReducer"
import messagesReducer from "./messagesReducer"
import myProfileReducer from "./myProfileReducer"
import usersReducer from "./searchReducer"
import userProfileReducer from "./userProfileReducer"
import onlineUsersReducer from './onlineStatus'
import startChatReducer from "./startChatReducer"

const reducer = {
    authorization: authorizationReducer,
    user: usersReducer,
    myProfile: myProfileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    userProfile: userProfileReducer,
    onlineUsers: onlineUsersReducer,
    startChat: startChatReducer
}

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>

export default store