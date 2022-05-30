import { ChatData } from "./chats"

export type SubscriberType<SubscriberArgsType> = (payload: SubscriberArgsType) => void

export type MessageData = {
    fromUserLogin: string
    body: string
}

export type ReadMessageData = {
    chatId: number, 
    messageId: number,
    userId: number
}
