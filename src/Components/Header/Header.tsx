import React from 'react'
import { useSelector } from 'react-redux'
import { routes } from '../../config'
import authSelectors from '../../selectors/auth'
import HeaderItem from './HeaderItem/HeaderItem'
import ProfileButton from './ProfileButton/ProfileButton'

const Header: React.FC = () => {
    const data = useSelector(authSelectors.data)
    const login = data?.login
    const newMessagesNumber = data?.newMessages.length
    
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
                    <ProfileButton />
                </>
            }
        </div>
    )
}

export default Header