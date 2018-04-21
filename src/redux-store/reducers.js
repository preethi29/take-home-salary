import {SET_HRA_DETAILS, SET_SALARY_COMPONENT} from "./actions";
import Calculator from "../utils/Calculator";
import {CONSTANTS} from "../constants";

const initialState = {
    pfDetails: {},
    hraDetails: {hraExempted: 0, monthlyRent: 0, metro: false, hraFromEmployer: 0, defaultHraFromEmployer: 0},
    basic: 0,
    bonus: 0,
    professionalTax: CONSTANTS.PROF_TAX,
    medicalReimbursement: CONSTANTS.MED_REIMBURSEMENT,
    conveyance: 19200,
    taxableIncome: 0,
    incomeTax: 0,
    educationCess: 0,
    gratuity: 0,
    grossSalary: 0,
    basicPercent: 30,
    eightyCLimit: 0,
    totalExemptedInvestments: 0,
};

export function takeHomeSalaryApp(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_HRA_DETAILS:
            let newHraDetails = Object.assign({}, state.hraDetails, action.hraDetails);
            newState = Object.assign({}, state, {hraDetails: newHraDetails});
            return Calculator.calculateSalaryComponents(newState);
        case SET_SALARY_COMPONENT:
            newState = Object.assign({}, state, {[action.name]: action.value});
            return Calculator.calculateSalaryComponents(newState);
        default:
            return state
    }
}