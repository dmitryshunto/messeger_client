import { ChatNewMessageInfo, ChatData, GetMessagesResponse, StartingPrivateChatInfo } from "../types/chats"
import { BaseResponse } from "../types/common"
import axiosInstanse from "./api"

const api = {
    getChats: async () => {
        return await axiosInstanse.get<BaseResponse<ChatData[]>>('chats/getChats')
    },
    getMessages: async (chatId: string, oldestMessageId?: number) => {
        return await axiosInstanse.post<BaseResponse<GetMessagesResponse>>(`chats/getMessages/${chatId}`, {oldestMessageId})
    },
    createChat: async (membersIds: number[], body: string, userId: number, chatName?: string) => {
        return await axiosInstanse.post<BaseResponse<ChatData>>('chats/create', {membersIds, chatName, body, userId})
    },
    getStartingChatInfo: async (companionId: number) => {
        return await axiosInstanse.post<BaseResponse<StartingPrivateChatInfo>>('chats/createPrivateChatPage', {companionId})
    },
    getNewMessagesInfo: async () => {
        return await axiosInstanse.get<BaseResponse<ChatNewMessageInfo[]>>(`chats/getNewMessagesInfo`)
    }
}

export default api