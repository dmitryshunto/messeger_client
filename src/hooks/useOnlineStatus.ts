import { useSelector } from "react-redux"
import onlineStatus from '../selectors/onlineStatus'

export const useOnlineStatus = (userId: number) => {
    const onlineUsers = useSelector(onlineStatus.data)
    if(onlineUsers?.some((onlineUser) => onlineUser.userId === userId)) return true
    return false
}