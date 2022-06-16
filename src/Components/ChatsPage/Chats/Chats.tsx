import React from 'react'
import { useSelector } from 'react-redux'
import { withAuthRedirect } from '../../../HOC/withAuthRedirect'
import { withErrorMessage } from '../../../HOC/withErrorMessage'
import { actions, getChats } from '../../../redux/chatsReducer'
import PreloaderPage from '../../PreloaderPage/PreloaderPage'
import Chat from './Chat/Chat'
import chatsSelectors from '../../../selectors/chats'
import { useGettingData } from '../../../hooks/useGettingData'
import css from './Chats.module.css'

const Chats: React.FC = () => {
    
    const data = useGettingData(getChats, chatsSelectors.data, actions.setInitialState)

    if (useSelector(chatsSelectors.isGettingData)) return <PreloaderPage />
    
    let content 
    if(data && data.length) {
        content = data.map(chat => <Chat key = {chat.id}
                                         {...chat} />)
    } else {
        content = <div className={css.noChats}>No chats</div>
    }
    return (
        <div>
            {content}
        </div>
    )
}

let withErrorMessageComponent = withErrorMessage(Chats, chatsSelectors.errorMessage, actions.setErrorMessage)

export default withAuthRedirect(withErrorMessageComponent)