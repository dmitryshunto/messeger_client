import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { AppDispatch } from '../../redux/redux'
import { actions, findUsers } from '../../redux/searchReducer';
import usersSelectors from '../../selectors/users'
import SearchItem from './SearchItem/SearchItem';
import SearchInput from './SearchInput/SearchInput';
import { withErrorMessage } from '../../HOC/withErrorMessage';
import PageNotFound from '../CommonComponents/PageNotFound/PageNotFound';

const SearchPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    
    useEffect(() => {
        return () => {
            dispatch(actions.setInitialState())
        } 
    }, [dispatch])

    const foundUsers = useSelector(usersSelectors.data)?.map(user => {        
        return <SearchItem  key = {user.id}
                            id = {user.id}
                            photoUrl = {user.photoUrl}
                            login = {user.login}
                />
    })

    const onInputChange = useCallback((searchLogin: string) => {
        if(searchLogin && searchLogin.length > 2) dispatch(findUsers(searchLogin))
    }, [dispatch])  

    return (
        <div>
            <SearchInput 
                callback={onInputChange}
            />
            {
                foundUsers && !foundUsers.length && 
                    <PageNotFound 
                        errMessage='No found users'
                    />
            }
            {
                foundUsers              
            }
        </div>
    )
}

export default withAuthRedirect(withErrorMessage(SearchPage, usersSelectors.errorMessage, actions.setErrorMessage))