import { RootState } from "../redux/redux"
import { createBaseSelectors } from "./functions"

const key: keyof RootState = 'chats'

const selectors = {
    ...createBaseSelectors('chats'),
    data: (state: RootState) => state[key].data
}

export default selectors