export interface UserAuthorizationData {
    login: string
    password: string
}

interface BaseUserData {
    login: string
    firstName: string
    lastName: string
    email: string
}

export interface UserRegistrationData extends BaseUserData {
    password: string
    confirmPassword?: string
}

export interface UIUserData extends BaseUserData {
    id: number
    isActivated: boolean
    photoUrl: string | null
    privateChatId: string | null
}

export interface MyProfileData extends UIUserData {
    newMessages: number[]
}

export type TokensType = {
    accessToken: string
    refreshToken: string
}

export type UserDtoType = {
    user: MyProfileData
    tokens: TokensType
}

export type ValidationError = {
    param: string
    msg: string
} 