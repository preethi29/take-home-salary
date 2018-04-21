/*
 * action types
 */

export const SET_HRA_DETAILS = 'SET_HRA_DETAILS';
export const SET_SALARY_COMPONENT = 'SET_SALARY_COMPONENT';

/*
 * action creators
 */

export function setHRADetails(hraDetails) {
    return {type: SET_HRA_DETAILS, hraDetails}
}
export function setSalaryComponent(name, value) {
    return {type: SET_SALARY_COMPONENT, name, value}
}
