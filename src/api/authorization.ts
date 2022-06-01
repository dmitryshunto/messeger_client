import { BaseResponse } from "../types/common"
import { UserAuthorizationData, UserDtoType, UserRegistrationFormData } from "../types/users"
import axiosInstanse from "./api"
import axios from "axios"
import { serverUrl } from "../config"
import { getFileFromDataUrl } from "../functions/common"

const api = {
    create: async (data: UserRegistrationFormData) => {
        const formData = new FormData()
        for (let key in data) {
            //@ts-ignore
            formData.append(key, data[key])
        }

        if (data.avatarUrl) formData.append('avatar', await getFileFromDataUrl(data.avatarUrl))

        return await axiosInstanse.post<BaseResponse<UserDtoType>>('users/create', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
    },
    authorize: async (authorizationData: UserAuthorizationData) => {
        return await axiosInstanse.post<BaseResponse<UserDtoType>>('users/authorize', authorizationData)
    },
    logout: async () => {
        return await axiosInstanse.get<BaseResponse<undefined>>('users/logout')
    },
    checkAuth: async () => {
        return await axios.get<BaseResponse<UserDtoType>>(`${serverUrl}users/refresh`, { withCredentials: true })
    },
    test: async () => {
        return await axiosInstanse.get<string>('users/test')
    }
}

export default api