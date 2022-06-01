import React from 'react'
import { useSelector } from 'react-redux';
import { getMyProfile, actions } from './../../redux/myProfileReducer'
import profileSelectors from '../../selectors/myProfile'
import { withErrorMessage } from '../../HOC/withErrorMessage';
import PreloaderPage from '../PreloaderPage/PreloaderPage';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { useGettingData } from '../../hooks/useGettingData';
import defaultAvatar from '../../Images/defaultAvatar.png'

const MyProfile: React.FC = () => {
    const data = useGettingData(getMyProfile, profileSelectors.data, actions.setInitialState)
    const avatarSource = data?.photoUrl ? data.photoUrl : defaultAvatar
    if(useSelector(profileSelectors.isGettingData)) return <PreloaderPage />

    return (
        <div>
            <div>
                <img 
                    src = {avatarSource}
                    alt = {'avatar'}
                />
            </div>
            <div>
                {data?.login}
            </div>
            <div>
                {`${data?.firstName} ${data?.lastName}`}
            </div>
        </div>
    )
}

let withErrorMessageComponent = withErrorMessage(MyProfile, profileSelectors.errorMessage)

export default withAuthRedirect(withErrorMessageComponent)