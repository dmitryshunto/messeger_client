import { RootState } from "../redux/redux";
import { createBaseSelectors } from "./functions";

const selectors = {
    ...createBaseSelectors('myProfile'),
    data: (state: RootState) => state.myProfile.data
}

export default selectors