import React, {Component} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import _ from "lodash";
import "../stylesheets/App.css";
import SalaryInputComponent from "./SalaryInputComponent";
import BasicSalary from "./BasicSalary";
import Hra from "./Hra";
import {CONSTANTS} from "../constants";
import InvestmentsInput from "./InvestmentsInput";
import Calculations from "./Calculations";
import Calculator from "../utils/Calculator";

const s = StyleSheet.create({
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

export default class AppContent extends Component {

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
        this.setState(Calculator.calculateSalaryComponents(nextState));
    }


    _grossSalaryNotEmpty() {
        return (this.state.grossSalary !== 0 && this.state.grossSalary !== "");
    }

    render() {
        return (
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
        );
    }
}