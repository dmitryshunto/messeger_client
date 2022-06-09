import React from "react"
import { routes } from "../../../config"
import { useSelector } from "react-redux";
import authSelectors from '../../../selectors/auth'
import onlineStatusSelectors from '../../../selectors/onlineStatus'
import { Link } from "react-router-dom";
import css from './ProfileButton.module.css'
import OnlineStatus from "../../CommonComponents/OnlineStatus/OnlineStatus";
import ShowAvatar from "../../CommonComponents/ShowAvatar/ShowAvatar";

type Props = {
    collapsed: boolean
}

const ProfileButton: React.FC<Props> = ({ collapsed }) => {
    const data = useSelector(authSelectors.data)
    let login = data?.login
    const isOnline = useSelector(onlineStatusSelectors.myOnlineStatus)
    
    let loginUI = login
    if (loginUI && loginUI.length > 8) {
        login = login?.substring(0, 8) + '...'
    }

    return (
        <div className={css.profileButton}>
            <div>
                <Link to={routes['myProfile']}>
                    <ShowAvatar
                        src={data?.photoUrl}
                    />
                </Link>
            </div>
            {!collapsed &&
                <div className={css.loginRow}>
                    <div>{login}</div>
                    <OnlineStatus 
                        onlineStatus = {isOnline}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileButton