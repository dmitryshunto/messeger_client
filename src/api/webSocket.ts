import axios from 'axios';
import { io, Socket } from 'socket.io-client'
import { serverUrl } from '../config'
import { BaseMessageData, ChatData, MessageType } from '../types/chats';
import { BaseResponse } from '../types/common';
import { UserDtoType } from '../types/users';
import { ReadMessageData, SubscriberType } from '../types/webSocket'
import { UserSocketsData } from './../types/onlineStatus';

let subscribers = {
    'onlineStatusChanged': [] as SubscriberType<boolean>[],
    'onlineUsers': [] as SubscriberType<UserSocketsData[]>[],
    'userConnected': [] as SubscriberType<UserSocketsData>[],
    'userDisconnected': [] as SubscriberType<number>[],
    'message': [] as SubscriberType<MessageType>[],
    'messageRead': [] as SubscriberType<ReadMessageData>[],
    'chatCreated': [] as SubscriberType<ChatData>[]
}

export type EmitEventTypes = keyof typeof subscribers

let socket: Socket | null = null

const createChannel = (token: string) => {
    socket = io(serverUrl, {
        path: '/socket.io',
        transports: ['websocket'],
        auth: {
            token
        },
        secure: true,
    })
    socket.on('connect', () => {
        subscribers['onlineStatusChanged'].forEach(cb => cb(true))
    })
    socket.on('disconnect', () => {
        subscribers['onlineStatusChanged'].forEach(cb => cb(false))
    })
    socket.on("connect_error", async (err) => {
        if(err.message === 'jwt expired') {
            const response = await axios.get<BaseResponse<UserDtoType>>(`${serverUrl}users/refresh`, { withCredentials: true })
            if (response.data.data) {
                const accessToken = response.data.data.tokens['accessToken']
                localStorage.setItem('token', accessToken)
                createChannel(accessToken)
            }
        }
    })
    socket.on<EmitEventTypes>('onlineUsers', (users: UserSocketsData[]) => {
        subscribers['onlineUsers'].forEach(cb => cb(users))
    })
    socket.on<EmitEventTypes>('userConnected', (user: UserSocketsData) => {
        subscribers['userConnected'].forEach(cb => cb(user))
    })
    socket.on<EmitEventTypes>('userDisconnected', (userId: number) => [
        subscribers['userDisconnected'].forEach(cb => cb(userId))
    ])
    socket.on<EmitEventTypes>('message', (data: MessageType) => {
        subscribers['message'].forEach(cb => cb(data))
    })
    socket.on<EmitEventTypes>('messageRead', (data: ReadMessageData) => {
        subscribers['messageRead'].forEach(cb => cb(data))
    })
    socket.on<EmitEventTypes>('chatCreated', (data: ChatData) => {
        subscribers['chatCreated'].forEach(cb => cb(data))
    })
}

const api = {
    start(token: string) {
        createChannel(token)
    },
    stop() {
        socket?.close()
        subscribers['onlineStatusChanged'].forEach(cb => cb(false))
    },
    subscribe: function(cb: SubscriberType<any>, event: EmitEventTypes) {
        subscribers[event].push(cb)
        // unsubscribe
        return () => {
            //@ts-ignore
            subscribers[event] = subscribers[event].filter(subscriber => subscriber !== cb) 
        }
    },
    sendMessage(data: BaseMessageData) {
        socket?.emit<EmitEventTypes>('message', data)
    },
    messageRead(messageId: number, chatId: number) {
        socket?.emit<EmitEventTypes>('messageRead', messageId, chatId)
    }
}

export default api
