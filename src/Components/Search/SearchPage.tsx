import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { AppDispatch } from '../../redux/redux'
import { actions, findUsers } from '../../redux/searchReducer';
import usersSelectors from '../../selectors/users'
import SearchItem from './SearchItem/SearchItem';
import Input from './Input/Input';
import { withErrorMessage } from '../../HOC/withErrorMessage';
import onlineStatusSelectors from '../../selectors/onlineStatus'

const SearchPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
   
    useEffect(() => {
        return () => {
            dispatch(actions.setInitialState())
        } 
    }, [dispatch])

    const onlineUsers = useSelector(onlineStatusSelectors.data)

    const foundUsers = useSelector(usersSelectors.data)?.map(user => {        
        const isOnline = onlineUsers?.some((onlineUser) => onlineUser.userId === user.id)
        return <SearchItem  key = {user.id}
                            id = {user.id}
                            isOnline = {!!isOnline}
                            login = {user.login}
                />
    })

    const onInputChange = useCallback((searchLogin: string) => {
        dispatch(findUsers(searchLogin))
    }, [dispatch])  

    return (
        <div>
            <Input 
                callback={onInputChange}
            />
            {
                foundUsers && !foundUsers.length && <div>No found users</div>
            }
            {
                foundUsers              
            }
        </div>
    )
}

export default withAuthRedirect(withErrorMessage(SearchPage, usersSelectors.errorMessage))