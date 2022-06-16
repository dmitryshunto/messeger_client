import React from "react"
import { Link } from "react-router-dom"
import { routes } from "../../../config"
import { useOnlineStatus } from "../../../hooks/useOnlineStatus"
import ShowAvatar from "../ShowAvatar/ShowAvatar"
import css from './UserLink.module.css'

type Props = {
    photoUrl: string | null | undefined
    id: number
    avatarSize: number
    login: string
}

const UserLink: React.FC<Props> = (props) => {
    const isOnline = useOnlineStatus(props.id)
    return (
        <Link 
            to={`${routes['profile']}${props.id}`}
            className = {css.userLink}
        >
            <ShowAvatar
                src={props.photoUrl}
                size={props.avatarSize}
                onlineStatus = {isOnline}
            />
            <div className={css.userLogin}>
                {props.login}
            </div>
        </Link>
    )
}

export default UserLink