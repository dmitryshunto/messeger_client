import { BaseResponse } from "../types/common"
import axiosInstanse from "./api"
import { UIUserData } from "../types/users"
import { PhotoUrl } from "../types/myProfile"
import { getFileFromDataUrl } from "../functions/common"
import { avatarFormFieldName } from "../config"

const api = {
    getMyProfile: async () => {
        return await axiosInstanse.get<BaseResponse<UIUserData>>('/profile/myProfile')
    },
    getUserProfile: async (id: string) => {
        return await axiosInstanse.get<BaseResponse<UIUserData>>(`/profile/getProfile/${id}`)
    },
    updatePhoto: async (base64PhotoUrl: string) => {
        const formData = new FormData()
        formData.append(avatarFormFieldName, await getFileFromDataUrl(base64PhotoUrl))
        return await axiosInstanse.put<BaseResponse<PhotoUrl>>(`/profile/updatePhoto`, formData)
    }
}

export default api