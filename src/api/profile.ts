import { BaseResponse } from "../types/common"
import axiosInstanse from "./api"
import { UIUserData } from "../types/users"

const api = {
    getMyProfile: async () => {
        return await axiosInstanse.get<BaseResponse<UIUserData>>('/profile/myProfile')
    },
    getUserProfile: async (id: string) => {
        return await axiosInstanse.get<BaseResponse<UIUserData>>(`/profile/getProfile/${id}`)
    }
}

export default api