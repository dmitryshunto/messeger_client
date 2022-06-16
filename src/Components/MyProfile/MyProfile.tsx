import React from 'react'
import { useSelector } from 'react-redux';
import { getMyProfile, actions } from './../../redux/myProfileReducer'
import profileSelectors from '../../selectors/myProfile'
import { withErrorMessage } from '../../HOC/withErrorMessage';
import PreloaderPage from '../PreloaderPage/PreloaderPage';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { useGettingData } from '../../hooks/useGettingData';
import Avatar from '../CommonComponents/Avatar/Avatar';
import css from './MyProfile.module.css'
import PageNotFound from './../CommonComponents/PageNotFound/PageNotFound';
import ProfileInfo from '../CommonComponents/ProfileInfo/ProfileInfo';
import OnlineStatus from '../CommonComponents/OnlineStatus/OnlineStatus';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

const MyProfile: React.FC = () => {
    const data = useGettingData(getMyProfile, profileSelectors.data, actions.setInitialState)
    const onlineStatus = useOnlineStatus(data?.id || 0)
    if (useSelector(profileSelectors.isGettingData)) return <PreloaderPage />
    if (!data) return <PageNotFound />
    return (
        <div className={css.myProfile}>
            <div className={css.profileTop}>
                <Avatar
                    photoUrl={data.photoUrl}
                />
                <div
                    className={css.login}
                >
                    <div>
                        {data.login}
                    </div>
                    <OnlineStatus
                        onlineStatus={onlineStatus}
                    />
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

let withErrorMessageComponent = withErrorMessage(MyProfile, profileSelectors.errorMessage)

export default withAuthRedirect(withErrorMessageComponent)