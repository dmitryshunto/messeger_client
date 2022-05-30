import { RootState } from "../redux/redux";
import { createBaseSelectors } from "./functions";

const key: keyof RootState = 'onlineUsers'

const selectors = {
    ...createBaseSelectors(key),
    data: (state: RootState) => state[key].data,
    myOnlineStatus: (state: RootState) => state[key].myOnlineStatus
}

export default selectors