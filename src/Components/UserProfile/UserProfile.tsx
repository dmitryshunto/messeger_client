import React from "react"
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { routes } from "../../config";
import { useGettingData } from "../../hooks/useGettingData";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { getUserProfile } from "../../redux/userProfileReducer";
import userProfileSelectors from '../../selectors/userProfile'
import { UIUserData } from "../../types/users";
import PreloaderPage from "../PreloaderPage/PreloaderPage";
import { actions } from './../../redux/userProfileReducer'

const UserProfile: React.FC = () => {
    const {id} = useParams<{id: string}>()
    const data = useGettingData<UIUserData | null, typeof getUserProfile>(getUserProfile, userProfileSelectors.data, actions.setInitialState, id!)
    const isOnline = useOnlineStatus(+id!)
    if(useSelector(userProfileSelectors.isGettingData)) return <PreloaderPage />
    if(!data) return <div>No user found</div>
    const linkRoute = data.privateChatId ? `${routes['chats']}/${data.privateChatId}` : `${routes['startChat']}/${id}`
    return (
        <div>
            <div>
                {data.login}
                <span>{isOnline ? ' V' : ' X'}</span>
            </div>
            <div>
                <Link to = {linkRoute}>Send message</Link>
            </div>
        </div>
    )
}

export default UserProfile