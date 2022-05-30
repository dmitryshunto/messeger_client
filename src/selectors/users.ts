import { RootState } from "../redux/redux"
import { createBaseSelectors } from "./functions"

const selectors = {
    ...createBaseSelectors('user'),
    data: (state: RootState) => state.user.data
}

export default selectors