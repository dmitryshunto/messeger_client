export const serverUrl = `http://localhost:3002/`

export const routes = {
    login: '/login',
    myProfile: '/myProfile',
    profile: '/userProfile/',
    registration: '/registartion',
    search: '/search',
    chats: '/chats',
    startChat: '/startChat'
} as const

export const SEARCH_USER_PORTION_SIZE = 5

export const APP_NAME = 'Thomas Messenger'
export const notAuthMsg = 'You are not authorized!'
export const dataReceivingErrMsg = 'Data receiving error!'