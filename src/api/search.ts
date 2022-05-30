import { SEARCH_USER_PORTION_SIZE } from "../config"
import { BaseResponse } from "../types/common"
import { UIUserData } from "../types/users"
import axiosInstanse from "./api"

const api = {
    getUsers: async (str?: string, portionSize?: number) => {
        if(!str && portionSize) throw new Error('Set login for users search!')
        let queryString: string = ''
        if(str) {
            queryString = `?str=${str}`
            if(portionSize) queryString += `&portionSize=${portionSize}`
            else queryString += `&portionSize=${SEARCH_USER_PORTION_SIZE}`
        } else {
            queryString = `?portionSize=${SEARCH_USER_PORTION_SIZE}`
        }
        return await axiosInstanse.get<BaseResponse<UIUserData[]>>(`profile/getUsers${queryString}`)
    }
}

export default api