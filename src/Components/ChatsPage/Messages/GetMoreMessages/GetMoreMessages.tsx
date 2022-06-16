import { LoadingOutlined } from "@ant-design/icons"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useDispatch, useSelector } from "react-redux"
import { getMoreMessages } from "../../../../redux/messagesReducer"
import { AppDispatch } from "../../../../redux/redux"
import messagesSelectors from '../../../../selectors/messages'
import css from './GetMoreMessages.module.css'

const GetMoreMessages: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const isGettingData = useSelector(messagesSelectors.isMoreMessagesReceiving)
    const isAllMessagesReceived = useSelector(messagesSelectors.isAllMessagesReceived)
    const { ref, inView } = useInView()
    
    useEffect(() => {
        if(inView && !isGettingData) dispatch(getMoreMessages())
        // console.log(inView)
    }, [inView, isGettingData])

    if(isGettingData) return (
        <div className={css.moreButton}>
            <LoadingOutlined />
        </div>
    )

    return (
        <div className={css.moreButton}>
            {isAllMessagesReceived &&
                <div className={css.noMoreMess}>
                    No more messages
                </div>
            }
            {!isAllMessagesReceived &&
                <div ref = {ref}>
                    more messages
                </div>
            }
        </div>
    )
}

export default GetMoreMessages