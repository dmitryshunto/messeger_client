import React from "react"
import { routes } from "../../../config"
import { useSelector } from "react-redux";
import authSelectors from '../../../selectors/auth'
import onlineStatusSelectors from '../../../selectors/onlineStatus'
import { Link } from "react-router-dom";
import { Avatar } from "antd";

const ProfileButton: React.FC = () => {
    const data = useSelector(authSelectors.data)
    const login = data?.login
    const isOnline = useSelector(onlineStatusSelectors.myOnlineStatus)
    const onlineStatus = isOnline ? 'online' : 'offline'

    return (
        <div>
            <Link to={routes['myProfile']}>
                <Avatar
                    src={data?.photoUrl}
                />
            </Link>
            <div>
                <div>{login}</div>
                <div>{onlineStatus}</div>
            </div>
        </div>
    )
}

export default ProfileButton