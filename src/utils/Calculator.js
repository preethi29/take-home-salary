import _ from "lodash";
import {CONSTANTS} from "../constants";

export default class Calculator {
    static calculateSalaryComponents(state) {
        let {
            medicalReimbursement, monthlyRent, metro, hraFromEmployer, defaultHraFromEmployer,
            conveyance, grossSalary, professionalTax, basicPercent, totalExemptedInvestments, bonus
        } = state;

        const basic = _.floor(grossSalary * basicPercent / 100);
        defaultHraFromEmployer = _.floor(grossSalary * 0.25, 2);
        const pfDetails = Calculator.calculatePFComponents(basic);
        const hra = Calculator.calculateHRA(basic, monthlyRent, metro, hraFromEmployer);
        const eightyCLimit = _.floor(CONSTANTS.EIGHTYC_LIMIT - pfDetails.pf, 2);
        const taxableIncome = _.floor((grossSalary + bonus) - pfDetails.pf - conveyance - medicalReimbursement
            - hra - professionalTax - totalExemptedInvestments, 2);
        const incomeTax = Calculator.calculateIncomeTax(taxableIncome);
        const educationCess = _.floor(incomeTax * (CONSTANTS.EDU_CESS_PERCENT / 100), 2);
        const takeHomeSalary = _.floor((grossSalary + bonus) - incomeTax - educationCess - professionalTax
            - pfDetails.pf - medicalReimbursement, 2);
        return {
            basic,
            metro,
            pfDetails,
            grossSalary,
            basicPercent,
            conveyance,
            monthlyRent,
            medicalReimbursement,
            hra,
            incomeTax,
            taxableIncome,
            takeHomeSalary,
            educationCess,
            eightyCLimit,
            totalExemptedInvestments,
            hraFromEmployer,
            defaultHraFromEmployer,
            bonus
        };
    }

    static calculatePFComponents(basic) {
        const pf = _.floor(basic * (CONSTANTS.PF_PERCENT.TOTAL / 100), 2);
        const employerPf = _.floor(basic * (CONSTANTS.PF_PERCENT.EMPLOYER / 100), 2);
        const employerEps = _.floor(basic * (CONSTANTS.PF_PERCENT.EMPLOYEE / 100), 2);
        const totalEmployerContribution = employerEps + employerPf;
        return {pf, employerPf, employerEps, totalEmployerContribution};
    }

    static calculateHRA(basic, monthlyRent, metro, hraFromEmployer) {
        if (monthlyRent === 0) {
            return 0;
        }
        const percentFromBasic = _.floor(metro ? (basic * CONSTANTS.HRA.BASIC_PERCENT_IF_METRO / 100)
            : (basic * CONSTANTS.HRA.BASIC_PERCENT_IF_NON_METRO / 100), 2);
        const rentPaidMinusTenPercentOfBasic = _.floor((monthlyRent * 12) - (basic * 0.10), 2);
        return _.min([hraFromEmployer, percentFromBasic, rentPaidMinusTenPercentOfBasic]);
    }

    static calculateIncomeTax(taxableIncome) {
        let incomeTax = 0;
        taxableIncome -= CONSTANTS.NON_TAXABLE_INCOME;  //income above 2.5 lakhs is only taxable
        if (taxableIncome <= 0) {
            return 0;
        }
        incomeTax = CONSTANTS.INCOME_TAX_SLABS.reduce((incomeTax, slab) => {
            const amount = taxableIncome > slab.amount ? slab.amount : taxableIncome;
            taxableIncome -= amount;
            return +incomeTax + +(amount * slab.rate / 100);
        }, incomeTax);

        incomeTax += taxableIncome * CONSTANTS.SLAB_RATE_FOR_REMAINING_AMOUNT / 100;
        return _.floor(incomeTax, 2);
    }
}
