import {SET_PF_DETAILS} from "./actions";

const initialState = {
    pfDetails: {},
};

export function takeHomeSalaryApp(state = initialState, action) {
    switch (action.type) {
        case SET_PF_DETAILS:
            return Object.assign({}, state, {
                pfDetails: action.pfDetails
            });
        default:
            return state
    }
}