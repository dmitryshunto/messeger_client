import { RootState } from "../redux/redux";

export function createBaseSelectors(stateKey: keyof RootState){
    return {
        isGettingData: (state: RootState) => state[stateKey].isGettingData,
        errorMessage: (state: RootState) => state[stateKey].errorMessage,
    }
}