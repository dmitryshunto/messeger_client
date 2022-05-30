import React, { useState, useCallback, useEffect } from "react"
import { useParams } from "react-router-dom"
import { withAuthRedirect } from "../../../HOC/withAuthRedirect"
import { withErrorMessage } from "../../../HOC/withErrorMessage"
import { getMessages, sendMessage as sendMessageThunk, stopListening } from "../../../redux/messagesReducer"
import messagesSelectors from '../../../selectors/messages'
import Message from "./Message/Message"
import { actions } from './../../../redux/messagesReducer';
import { useGettingData } from "../../../hooks/useGettingData"
import { MessageType } from '../../../types/chats'
import { useDispatch, useSelector } from "react-redux"
import PreloaderPage from "../../PreloaderPage/PreloaderPage"
import TextInput from "../../CommonComponents/TextInput/TextInput"
import { AppDispatch } from "../../../redux/redux"
import UnsentMessage from "./UnsentMessage/UnsentMessage"
import GetMoreMessages from "./GetMoreMessages/GetMoreMessages"

const MessagesPage: React.FC = () => {
    let { chatId } = useParams<{ chatId: string }>()
    let [messageText, setMessageText] = useState('')
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        return () => {
            stopListening()
        }
    }, [])

    const readMessagesData = useGettingData<MessageType[], typeof getMessages>(getMessages, messagesSelectors.readMessages, actions.setInitialState, chatId!)
    const unreadMessagesData = useSelector(messagesSelectors.unreadMessages)
    
    const sendMessage = useCallback(() => {
        dispatch(sendMessageThunk(+chatId!, messageText))
        setMessageText('')
    }, [dispatch, chatId, messageText, setMessageText])

    const unsentMessages = useSelector(messagesSelectors.unsentMessages)

    if (useSelector(messagesSelectors.isGettingData)) return <PreloaderPage />

    if (!readMessagesData.length && !unreadMessagesData.length) return <div>No messages</div>

    const readMessagesElements = readMessagesData.map(message => <Message key = {message.id} {...message}/>)
    const unreadMessagesElements = unreadMessagesData.map(message => <Message key = {message.id} {...message}/>)

    const unsentMessagesElements = unsentMessages.map((mes, i) => <UnsentMessage key={`${mes.body}_${i}`}
        index={i}
        {...mes}
    />)

    return (
        <div>
            <GetMoreMessages />
            {readMessagesElements}
            {!!unreadMessagesElements.length && `NEW MESSAGES`}
            {unreadMessagesElements}
            {unsentMessagesElements}
            <TextInput
                buttonText="Send"
                setValue={setMessageText}
                value={messageText}
                onClick={sendMessage}
            />
        </div>
    )
}

let withErrorMessageComponent = withErrorMessage(MessagesPage, messagesSelectors.errorMessage)

export default withAuthRedirect(withErrorMessageComponent)