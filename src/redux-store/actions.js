/*
 * action types
 */

export const SET_PF_DETAILS = 'SET_PF_DETAILS'

/*
 * action creators
 */

export function setPFDetails(pfDetails) {
    return {type: SET_PF_DETAILS, pfDetails}
}
