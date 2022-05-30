import { BaseResponse } from "../types/common"
import { UIUserData, UserAuthorizationData, UserDtoType, UserRegistrationData } from "../types/users"
import axiosInstanse from "./api"
import axios from "axios"
import { serverUrl } from "../config"

const api = {
    create: async (registrationData: UserRegistrationData) => {
        return await axiosInstanse.post<BaseResponse<UserDtoType>>('users/create', registrationData)
    },
    authorize: async (authorizationData: UserAuthorizationData) => {
        return await axiosInstanse.post<BaseResponse<UserDtoType>>('users/authorize', authorizationData)
    },
    logout: async () => {
        return await axiosInstanse.get<BaseResponse<undefined>>('users/logout')
    },
    checkAuth: async () => {
        return await axios.get<BaseResponse<UserDtoType>>(`${serverUrl}users/refresh`, {withCredentials: true})
    },
    test: async () => {
        return await axiosInstanse.get<string>('users/test')
    }
}

export default api