import { RootState } from "../redux/redux";
import { createBaseSelectors } from "./functions";

const selectors = {
    ...createBaseSelectors('userProfile'),
    data: (state: RootState) => state.userProfile.data
}

export default selectors