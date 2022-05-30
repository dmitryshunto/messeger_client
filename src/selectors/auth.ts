import { RootState } from "../redux/redux";
import { createBaseSelectors } from "./functions";

const key: keyof RootState = 'authorization' 

const selectors = {
    ...createBaseSelectors(key),
    data: (state: RootState) => state[key].data,
    creatingUserSuccessMessage: (state: RootState) => state[key].creatingUserSuccessMessage,
    validationErrors: (state: RootState) => state[key].validationErrors,
} 

export default selectors