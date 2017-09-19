import React, {Component} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import _ from "lodash";


import logo from "../rupee-indian.svg";
import "../stylesheets/App.css";
import SalaryInputComponent from "./SalaryInputComponent";
import BasicSalary from "./BasicSalary";
import Hra from "./Hra";
import {CONSTANTS} from "../constants";
import InvestmentsInput from "./InvestmentsInput";
import Calculations from "./Calculations";

const s = StyleSheet.create({
    heading: {
        marginTop: '8px',
        marginBottom: '5px',
    },
    appContent: {
        padding: '1.3889%',
    },
    appInputs: {
        width: '50%',
        display: 'inline-block',
        overflowX: 'auto',
        '@media (max-width: 700px)': {
            width: '100%'
        }
    },
    appCalculated: {
        textAlign: 'left',
        width: '50%',
        verticalAlign: 'top',
        display: 'inline-block',
        fontSize: '1.4em',
        '@media (max-width: 700px)': {
            width: '100%'
        }

    },
    optionalInputs: {
        padding: '2% 0'
    },
    bold: {
        fontWeight: 'bold',
        fontSize: '1.142em',
    },
    tableCell: {
        padding: '0.3em'
    },
    formula: {
        color: 'grey'
    }
});

class App extends Component {

    constructor() {
        super();
        this.tableViewModel = [{label: 'Basic Salary', value: 'basic'},
            {label: 'HRA exempted', value: 'hra'},
            {label: 'Conveyance allowance', value: 'conveyance'},
            {label: 'Medical Reimbursement', value: 'medicalReimbursement'},
            {label: 'Employee PF', value: 'pf', formula: '(12% Basic)'},
            {label: 'Professional Tax', value: 'professionalTax'},
            {label: 'Taxable Income', value: 'taxableIncome', formula: '(Gross- sum of 2 to 6 - Investments)'},
            {label: 'Income Tax', value: 'incomeTax'},
            {label: 'Education Cess', value: 'educationCess'},
            {label: 'Take Home Salary', value: 'takeHomeSalary', className: 'bold', noIndex: true},
        ];
        this.state = {
            basic: 0,
            hra: 0,
            pf: 0,
            employerPf: 0,
            employerEps: 0,
            professionalTax: CONSTANTS.PROF_TAX,
            medicalReimbursement: CONSTANTS.MED_REIMBURSEMENT,
            conveyance: 19200,
            taxableIncome: 0,
            incomeTax: 0,
            educationCess: 0,
            gratuity: 0,
            grossSalary: 0,
            totalEmployerContribution: 0,
            basicPercent: '30',
            monthlyRent: 0,
            metro: false,
            eightyCLimit: 0,
            totalExemptedInvestments: 0,
        };
        this._handleInputChange = this._handleInputChange.bind(this);
        this._updateState = this._updateState.bind(this);
        this._grossSalaryNotEmpty = this._grossSalaryNotEmpty.bind(this);
    }

    _handleInputChange(event) {
        let changedInput = event.target.name;
        let changedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        if (changedInput === 'basicPercent' && changedValue === 'Other') {
            this.setState({[changedInput]: changedValue})
        } else {
            this._updateState(changedInput, changedValue);
        }
    }

    _updateState(changedInput, changedValue) {
        let nextState = _.extend({}, this.state, {[changedInput]: changedValue});
        this.setState(App._calculateSalaryComponents(nextState));
    }

    static _calculateSalaryComponents(state) {
        let {
            medicalReimbursement, monthlyRent, metro,
            conveyance, grossSalary, professionalTax, basicPercent, totalExemptedInvestments
        } = state;

        const basic = _.floor(grossSalary * basicPercent / 100);
        const {pf, employerPf, employerEps, totalEmployerContribution} = App.calculatePFComponents(basic);
        const hra = App._calculateHRA(basic, monthlyRent, metro);
        const eightyCLimit = _.floor(CONSTANTS.EIGHTYC_LIMIT - pf, 2);
        const taxableIncome = _.floor(grossSalary - pf - conveyance - medicalReimbursement
            - hra - professionalTax - totalExemptedInvestments, 2);
        const incomeTax = App._calculateIncomeTax(taxableIncome);
        const educationCess = _.floor(incomeTax * (CONSTANTS.EDU_CESS_PERCENT / 100), 2);
        const takeHomeSalary = _.floor(grossSalary - incomeTax - educationCess - professionalTax - pf - medicalReimbursement, 2);
        return {
            basic,
            metro,
            pf,
            totalEmployerContribution,
            grossSalary,
            basicPercent,
            conveyance,
            monthlyRent,
            employerPf,
            employerEps,
            medicalReimbursement,
            hra,
            incomeTax,
            taxableIncome,
            takeHomeSalary,
            educationCess,
            eightyCLimit,
            totalExemptedInvestments
        };
    }

    static calculatePFComponents(basic) {
        const pf = _.floor(basic * (CONSTANTS.PF_PERCENT.TOTAL / 100), 2);
        const employerPf = _.floor(basic * (CONSTANTS.PF_PERCENT.EMPLOYER / 100), 2);
        const employerEps = _.floor(basic * (CONSTANTS.PF_PERCENT.EMPLOYEE / 100), 2);
        const totalEmployerContribution = employerEps + employerPf;
        return {pf, employerPf, employerEps, totalEmployerContribution};
    }

    _grossSalaryNotEmpty() {
        return (this.state.grossSalary !== 0 && this.state.grossSalary !== "");
    }

    static _calculateHRA(basic, monthlyRent, metro) {
        if (monthlyRent === 0) {
            return 0;
        }
        const percentFromBasic = _.floor(metro ? (basic * CONSTANTS.HRA.BASIC_PERCENT_IF_METRO)
            : (basic * CONSTANTS.HRA.BASIC_PERCENT_IF_NON_METRO), 2);
        const rentPaidMinusTenPercentOfBasic = _.floor((monthlyRent * 12) - (basic * 0.10), 2);
        return rentPaidMinusTenPercentOfBasic < percentFromBasic ? rentPaidMinusTenPercentOfBasic : percentFromBasic;
    }

    static _calculateIncomeTax(taxableIncome) {
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

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 className={css(s.heading)}>Know your Take home salary </h2>
                </div>
                <div className={css(s.appContent)}>
                    <div className={css(s.appInputs)}>
                        <SalaryInputComponent label="Gross Pay  (Yearly)" name="grossSalary" step="100000"
                                              value={this.state.grossSalary} onChange={this._handleInputChange}/>
                        <BasicSalary basicPercent={this.state.basicPercent} onChange={this._handleInputChange}/>

                        {this._grossSalaryNotEmpty() &&
                        <div className={css(s.optionalInputs)}>
                            <Hra onChange={this._handleInputChange} monthlyRent={this.state.monthlyRent}
                                 metro={this.state.metro}/>
                            <InvestmentsInput eightyCLimit={this.state.eightyCLimit} onChange={this._updateState}/>
                        </div>
                        }

                    </div>
                    {this._grossSalaryNotEmpty() &&
                    <div className={css(s.appCalculated)}>
                        <table className="table table-responsive">
                            <thead>
                            <tr>
                                <th/>
                                <th>Component</th>
                                <th>Monthly</th>
                                <th>Yearly</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.tableViewModel.map((row, index) => {
                                return <tr key={index} className={css(s[row.className])}>
                                    <td className={css(s.tableCell)}>{row.noIndex ? "" : index + 1}</td>
                                    <td className={css(s.tableCell)}>
                                        {row.label} {row.formula &&
                                    <small className={css(s.formula)}> {row.formula}</small>}
                                    </td>
                                    <td className={css(s.tableCell)}>{_.floor(this.state[row.value] / 12, 2)}</td>
                                    <td className={css(s.tableCell)}>{this.state[row.value]}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>

                        <Calculations pf={this.state.pf} employerPf={this.state.employerPf}
                                      employerEps={this.state.employerEps}/>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default App;
