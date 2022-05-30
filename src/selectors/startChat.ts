import { RootState } from "../redux/redux"
import { createBaseSelectors } from "./functions"

const key: keyof RootState = 'startChat'

const selectors = {
    ...createBaseSelectors(key),
    data: (state: RootState) => state[key].data
}

export default selectors