import {SET_HRA_DETAILS, SET_PF_DETAILS} from "./actions";

const initialState = {
    pfDetails: {},
    hraDetails: { hraExempted: 0}
};

export function takeHomeSalaryApp(state = initialState, action) {
    switch (action.type) {
        case SET_PF_DETAILS:
            return Object.assign({}, state, {
                pfDetails: action.pfDetails
            });
        case SET_HRA_DETAILS:
            return Object.assign({}, state, {
                hraDetails: action.hraDetails
            });
        default:
            return state
    }
}