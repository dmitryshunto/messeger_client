import React, { useCallback } from "react"
import { routes } from "../../../config"
import HeaderItem from "../HeaderItem/HeaderItem"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/redux";
import { logout as logoutThunk } from "../../../redux/authorizationReducer";
import authSelectors from '../../../selectors/auth'
import onlineStatusSelectors from '../../../selectors/onlineStatus'
import Avatar from "../../CommonComponents/Avatar/Avatar";

const ProfileButton: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const data = useSelector(authSelectors.data)

    const login = data?.login

    const logout = useCallback(() => {
        dispatch(logoutThunk())
    }, [dispatch])

    const isOnline = useSelector(onlineStatusSelectors.myOnlineStatus)

    const onlineStatus = isOnline ? 'online' : 'offline'
    return (
        <div>
            <HeaderItem route={routes['myProfile']}>
                {login}
                {/* <Avatar 
                    photoUrl={data?.photoUrl}
                /> */}
                <button onClick={logout}>Logout</button>
            </HeaderItem>
            {` ${onlineStatus}`}
        </div>
    )
}

export default ProfileButton