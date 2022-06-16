import React, { useState, useCallback, useEffect, useRef, MutableRefObject } from "react"
import { useParams } from "react-router-dom"
import { withAuthRedirect } from "../../../HOC/withAuthRedirect"
import { withErrorMessage } from "../../../HOC/withErrorMessage"
import { getMessages, sendMessage as sendMessageThunk, stopListening } from "../../../redux/messagesReducer"
import messagesSelectors from '../../../selectors/messages'
import Message from "./Message/Message"
import { actions } from './../../../redux/messagesReducer';
import { useGettingData } from "../../../hooks/useGettingData"
import { MembersData, MessageType } from '../../../types/chats'
import { useDispatch, useSelector } from "react-redux"
import PreloaderPage from "../../PreloaderPage/PreloaderPage"
import TextInput from "../../CommonComponents/TextInput/TextInput"
import { AppDispatch } from "../../../redux/redux"
import UnsentMessage from "./UnsentMessage/UnsentMessage"
import GetMoreMessages from "./GetMoreMessages/GetMoreMessages"
import css from './Messages.module.css'
import authSelectors from '../../../selectors/auth'
import CompanionBar from "./CompanionBar/CompanionBar"
import PageNotFound from './../../CommonComponents/PageNotFound/PageNotFound';
import { Divider } from "antd"

const MessagesPage: React.FC = () => {
    let { chatId } = useParams<{ chatId: string }>()
    let [messageText, setMessageText] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const userId = useSelector(authSelectors.data)?.id
    const scrollRef = useRef<null | HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)

    const sendMessage = useCallback(() => {
        dispatch(sendMessageThunk(+chatId!, messageText))
        setMessageText('')
    }, [dispatch, chatId, messageText, setMessageText])

    useEffect(() => {
        const onKeyPressCallBack = (ev: KeyboardEvent) => {
            if (ev.code === 'Enter') {
                ev.preventDefault()
                sendMessage()
            }
        }
        window.addEventListener('keypress', onKeyPressCallBack)
        return () => window.removeEventListener('keypress', onKeyPressCallBack)
    }, [sendMessage])

    useEffect(() => {
        return () => {
            stopListening()
        }
    }, [])

    const readMessagesData = useGettingData<MessageType[], typeof getMessages>(getMessages, messagesSelectors.readMessages, actions.setInitialState, chatId!)
    const unreadMessagesData = useSelector(messagesSelectors.unreadMessages)
    const membersData = useSelector(messagesSelectors.chatMembersData)

    const readMessagesElements = readMessagesData.map(message => createMessageNode(message, userId, membersData, scrollRef))
    const unreadMessagesElements = unreadMessagesData.map(message => createMessageNode(message, userId, membersData, scrollRef))

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth", inline: 'end' });
    }, [unreadMessagesElements.length, readMessagesElements.length])

    const unsentMessages = useSelector(messagesSelectors.unsentMessages)

    const errorMessage = useSelector(messagesSelectors.errorMessage)

    if (useSelector(messagesSelectors.isGettingData)) return <PreloaderPage />

    if (errorMessage) return <PageNotFound errMessage = {errorMessage}/>

    const companionData = membersData?.find(member => member.id !== userId)

    const unsentMessagesElements = unsentMessages.map((mes, i) => <UnsentMessage key={`${mes.body}_${i}`}
        index={i}
        {...mes}
    />)

    return (
        <div
            className={css.messagesPage}
        >
            {companionData &&
                <CompanionBar
                    {...companionData}
                />
            }

            {   
                <>
                    <div
                        className={css.messagesContainer}
                        onScroll={() => {
                            setIsScrolled(true)
                        }}
                    >
                        {isScrolled && <GetMoreMessages />}
                        {readMessagesElements}
                        {!!unreadMessagesElements.length && 
                            <Divider>New Messages</Divider> 
                        }
                        {unreadMessagesElements}
                        {unsentMessagesElements}
                    </div>
                    <TextInput
                        buttonText="Send"
                        setValue={setMessageText}
                        value={messageText}
                        onClick={sendMessage}
                    />
                </>
            }
        </div>
    )
}

const createMessageNode = (message: MessageType, userId: number | undefined, membersData: MembersData[] | undefined, ref: MutableRefObject<any>) => {
    const companionData = membersData?.find(member => member.id !== message.userId)
    const companionLastReadMessageId = companionData?.lastReadMessageId
    return (
        <Message
            companionLastReadMessageId={companionLastReadMessageId}
            scrollRef={ref}
            key={message.id}
            isOwn={userId === message.userId}
            {...message}
        />
    )
}

export default withAuthRedirect(MessagesPage)