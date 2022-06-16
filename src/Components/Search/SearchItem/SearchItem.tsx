import React from 'react'
import css from '../SearchPage.module.css'
import UserLink from '../../CommonComponents/UserLink/UserLink';

type Props = {
    id: number
    login: string
    photoUrl: string | null
}

const SearchItem: React.FC<Props> = (props) => {
    return (
        <div className={css.searchItem}>
            <UserLink 
                avatarSize={64}
                id = {props.id}
                login = {props.login}
                photoUrl = {props.photoUrl}
            />
        </div>
    )
}

export default SearchItem