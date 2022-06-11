export interface BaseMessageData {
    body: string
    userId: number
    chatId: number
}

export interface MessageType extends BaseMessageData {
    id: number
    createdAT: string
}

export interface UIMessageData extends MessageType {
    isSending: boolean
    sendingSuccess: null | boolean // null means no sending, true/false means success/unsuccess sending
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
}

export type ChatNewMessageInfo = {
    chatId: number
    newMessages: number
}