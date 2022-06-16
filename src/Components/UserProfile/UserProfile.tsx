import React from "react"
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { routes } from "../../config";
import { useGettingData } from "../../hooks/useGettingData";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { getUserProfile } from "../../redux/userProfileReducer";
import userProfileSelectors from '../../selectors/userProfile'
import { UIUserData } from "../../types/users";
import PageNotFound from "../CommonComponents/PageNotFound/PageNotFound";
import ProfileInfo from "../CommonComponents/ProfileInfo/ProfileInfo";
import ShowAvatar from "../CommonComponents/ShowAvatar/ShowAvatar";
import PreloaderPage from "../PreloaderPage/PreloaderPage";
import { actions } from './../../redux/userProfileReducer'
import css from './UserProfile.module.css'

const UserProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const data = useGettingData<UIUserData | null, typeof getUserProfile>(getUserProfile, userProfileSelectors.data, actions.setInitialState, id!)
    const isOnline = useOnlineStatus(+id!)
    if (useSelector(userProfileSelectors.isGettingData)) return <PreloaderPage />
    if (!data) return <PageNotFound errMessage="No user found" />
    const linkRoute = data.privateChatId ? `${routes['chats']}/${data.privateChatId}` : `${routes['startChat']}/${id}`
    return (
        <div
            className={css.userProfile}
        >
            <div
                className={css.profileTop}
            >
                <div
                    className = {css.avatarBlock}
                >
                    <ShowAvatar
                        size={100}
                        src = {data.photoUrl}
                        onlineStatus={isOnline}
                    />
                    <Link to={linkRoute}>
                        Send message
                    </Link>
                </div>
                <div>
                    {data.login}
                </div>
            </div>
            <ProfileInfo
                email={data.email}
                firstName={data.firstName}
                lastName={data.lastName}
            />
        </div>
    )
}

export default UserProfile