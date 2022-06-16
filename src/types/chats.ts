export interface BaseMessageData {
    body: string
    userId: number
    chatId: number
}

export interface MessageType extends BaseMessageData {
    id: number
    createdAt: number
}

export interface UIMessageData extends MessageType {
    isOwn: boolean
}

export interface StartingPrivateChatInfo {
    companionLogin: string
    chatId: number | null
}

export interface ChatData {
    id: number
    name: string
    newMessages: number | null
    chatPhotoUrl: string | null
    companionId: number | null
}

export interface MembersData {
    id: number
    login: string
    photoUrl: string | null
    lastReadMessageId: number | null
}

export type GetMessagesResponse = {
    messages: MessageType[]
    membersData: MembersData[]
    isAllMessages: boolean
}

export type ChatNewMessageInfo = {
    chatId: number
    newMessages: number
}