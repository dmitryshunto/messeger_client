import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config'
import css from '../SearchPage.module.css'
import OnlineStatus from '../../CommonComponents/OnlineStatus/OnlineStatus';
import ShowAvatar from '../../CommonComponents/ShowAvatar/ShowAvatar';

type Props = {
    isOnline: boolean
    id: number
    login: string
    photoUrl: string | null
}

const SearchItem: React.FC<Props> = (props) => {
    return (
        <div className={css.searchItem}>
            <Link to={`${routes['profile']}${props.id}`}>
                <ShowAvatar
                    src={props.photoUrl}
                    size = {64}
                />
                <div className = {css.userLogin}>
                    <div className = {css.test}>
                        {props.login}
                    </div>
                    <OnlineStatus
                        onlineStatus={props.isOnline}
                    />
                </div>
            </Link>

        </div>
    )
}

export default SearchItem