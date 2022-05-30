import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { routes } from '../../config';
import { AppDispatch } from '../../redux/redux';
import authSelectors from '../../selectors/auth'
import { logout as logoutThunk } from './../../redux/authorizationReducer';
import HeaderItem from './HeaderItem/HeaderItem';
import onlineStatusSelector from '../../selectors/onlineStatus'

const Header: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const data = useSelector(authSelectors.data)
    
    const login = data?.login
    const newMessagesNumber = data?.newMessages.length
    const isOnline = useSelector(onlineStatusSelector.myOnlineStatus)

    const logout = () => {
        dispatch(logoutThunk())
    }

    const onlineStatus = isOnline ? 'online' : 'offline'

    return (
        <div>
            {!login &&
                <>
                    <HeaderItem route={routes['login']}>
                        Login
                    </HeaderItem>
                    <HeaderItem route={routes['registration']}>
                        Registration
                    </HeaderItem>
                </>
            }

            {login &&
                <>
                    <HeaderItem route={routes['chats']}>
                        {`Chats (${newMessagesNumber})`}
                    </HeaderItem>
                    <HeaderItem route={routes['search']}>
                        Search
                    </HeaderItem>
                    <HeaderItem route={routes['myProfile']}>
                        {login}
                        <button onClick={logout}>Logout</button>
                        {` ${onlineStatus}`}
                    </HeaderItem>
                </>
            }
        </div>
    )
}

export default Header