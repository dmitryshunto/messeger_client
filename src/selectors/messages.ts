import { RootState } from "../redux/redux"
import { createBaseSelectors } from "./functions"

const key: keyof RootState = 'messages'

const selectors = {
    ...createBaseSelectors(key),
    data: (state: RootState) => state[key].data,
    unsentMessages: (state: RootState) => state[key].unsentMessages,
    isMoreMessagesReceiving: (state: RootState) => state[key].isMoreMessagesReceiving,
    isAllMessagesReceived: (state: RootState) => state[key].data?.isAllMessages,
    readMessages: (state: RootState) => state[key].readMessages,
    unreadMessages: (state: RootState) => state[key].unreadMessages,
    chatMembersData: (state: RootState) => state[key].data?.membersData
}

export default selectors