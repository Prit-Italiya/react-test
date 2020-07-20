import {START_SPINNER, STOP_SPINNER} from "../actions/actionTypes";

let initialState = {
    isLoading: false
};

const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_SPINNER:
            return {...state, isLoading: true};
        case STOP_SPINNER:
            return {...state, isLoading: false};
        default:
            return state;
    }
};

export default configReducer;