import React from "react"
import { routes } from "../../../config"
import { useSelector } from "react-redux";
import authSelectors from '../../../selectors/auth'
import onlineStatusSelectors from '../../../selectors/onlineStatus'
import { Link } from "react-router-dom";
import { Avatar } from "antd"
import css from './ProfileButton.module.css'
import cn from 'classnames'

type Props = {
    collapsed: boolean
}

const ProfileButton: React.FC<Props> = ({ collapsed }) => {
    const data = useSelector(authSelectors.data)
    let login = data?.login
    const isOnline = useSelector(onlineStatusSelectors.myOnlineStatus)
    const onlineStatus = isOnline ? 'online' : 'offline'

    let loginUI = login
    if (loginUI && loginUI.length > 8) {
        login = login?.substring(0, 8) + '...'
    }

    return (
        <div className={css.profileButton}>
            <div>
                <Link to={routes['myProfile']}>
                    <Avatar
                        size={'large'}
                        src={data?.photoUrl}
                    />
                </Link>
            </div>
            {!collapsed &&
                <div className={css.loginRow}>
                    <div>{login}</div>
                    <div className={
                        cn(css.onlineStatus, { [css.online]: onlineStatus, [css.offline]: !onlineStatus })}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileButton