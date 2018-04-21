/*
 * action types
 */

export const SET_PF_DETAILS = 'SET_PF_DETAILS';
export const SET_HRA_DETAILS = 'SET_HRA_DETAILS';

/*
 * action creators
 */

export function setPFDetails(pfDetails) {
    return {type: SET_PF_DETAILS, pfDetails}
}

export function setHRADetails(hraDetails) {
    return {type: SET_HRA_DETAILS, hraDetails}
}
