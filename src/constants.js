export const CONSTANTS = {
    PROF_TAX: 2400,
    MED_REIMBURSEMENT: 15000,
    CONVEYANCE: 19200,
    EIGHTYC_LIMIT: 150000,
    EDU_CESS_PERCENT: 3,
    PF_PERCENT: {
        TOTAL: 12,
        EMPLOYER: 3.67,
        EMPLOYEE: 8.33
    },
    NON_TAXABLE_INCOME: 250000,
    INCOME_TAX_SLABS: [
        {
            rate: 5,
            amount: 250000
        },
        {
            rate: 20,
            amount: 500000
        }
    ],
    SLAB_RATE_FOR_REMAINING_AMOUNT: 30,
    MIN_GROSS_FOR_80CCG_RGESS: 1200000,
    HRA: {
        BASIC_PERCENT_IF_METRO: 50,
        BASIC_PERCENT_IF_NON_METRO: 40,
    }
};