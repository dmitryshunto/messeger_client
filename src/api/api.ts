import axios from 'axios'
import { serverUrl } from '../config'
import { BaseResponse } from '../types/common'
import { UserDtoType } from '../types/users'

const axiosInstanse = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})
//adding access token into Authorization header in any server request
axiosInstanse.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

//checking validative of access token
axiosInstanse.interceptors.response.use(config => {
    return config
},
    async error => {
        // if wy are getting 401 error we make another request to refreshing our access token using our refresh token located in cookie
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            try {
                const response = await axios.get<BaseResponse<UserDtoType>>(`${serverUrl}users/refresh`, { withCredentials: true })
                if (response.data.data) {
                    // If refresh token is alive server returns new access and refresh token. Refresh token will be attached in cookie.                
                    localStorage.setItem('token', response.data.data?.tokens['accessToken'])
                    // After updating the tokens we make original request in second time, but now we use new tokens all is gonna be ok. 
                    const originalRequest = error.config
                    originalRequest._isRetry = true
                    return axiosInstanse.request(originalRequest)
                }
            } catch (e) {
                console.log(e)
                throw error
            }
        } throw error
    })

export default axiosInstanse