import { RootState } from "../redux/redux"
import { createBaseSelectors } from "./functions"

const key: keyof RootState = 'messages'

const selectors = {
    ...createBaseSelectors(key),
    data: (state: RootState) => state[key].data,
    unsentMessages: (state: RootState) => state[key].unsentMessages,
    isMoreMessagesReceiving: (state: RootState) => state[key].isMoreMessagesReceiving,
    isAllMessagesReceived: (state: RootState) => state[key].isAllMesagesReceived,
    readMessages: (state: RootState) => state[key].readMessages,
    unreadMessages: (state: RootState) => state[key].unreadMessages
}

export default selectors