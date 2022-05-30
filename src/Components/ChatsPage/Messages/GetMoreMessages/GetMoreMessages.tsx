import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMoreMessages } from "../../../../redux/messagesReducer"
import { AppDispatch } from "../../../../redux/redux"
import messagesSelectors from '../../../../selectors/messages'

const GetMoreMessages: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const isGettingData = useSelector(messagesSelectors.isMoreMessagesReceiving)
    const isAllMessagesReceived = useSelector(messagesSelectors.isAllMessagesReceived)
    const getMore = useCallback(() => {
        dispatch(getMoreMessages())
    }, [dispatch])

    return (
        <div>
            {isAllMessagesReceived &&
                <div>No more messages</div>
            }
            {!isAllMessagesReceived &&
                <button onClick = {getMore}>
                    More messages {isGettingData && '...'}
                </button>
            }
        </div>
    )
}

export default GetMoreMessages