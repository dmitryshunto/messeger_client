import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { routes } from "../../config"
import { useGettingData } from "../../hooks/useGettingData"
import { AppDispatch } from "../../redux/redux"
import { createChat, getStartingChatInfo } from "../../redux/startChatReducer"
import startChatSelectors from '../../selectors/startChat'
import TextInput from "../CommonComponents/TextInput/TextInput"
import PreloaderPage from "../PreloaderPage/PreloaderPage"
import { actions } from './../../redux/startChatReducer';


const StartChat: React.FC = () => {
    const {companionId} = useParams<{companionId: string}>()
    let [body, setBody] = useState('')
    const dispatch: AppDispatch = useDispatch()
    
    const startChat = useCallback(() => {
        dispatch(createChat(+companionId!, body))
    }, [body, companionId, dispatch])

    const data = useGettingData(getStartingChatInfo, startChatSelectors.data, actions.setInitialState, companionId)

    if(useSelector(startChatSelectors.isGettingData)) return <PreloaderPage />

    if(data?.chatId) return <Navigate to = {`${routes['chats']}/${data.chatId}`} />

    return (
        <div>
            <h1>Start chat with {data?.companionLogin}</h1>
            <TextInput
                buttonText="Start chat" 
                onClick={startChat}
                setValue = {setBody}
                value = {body}
            />
        </div>
    )
}

export default StartChat