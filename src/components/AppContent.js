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
import {setPFDetails} from "../redux-store/actions";
import {connect} from "react-redux";

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

class AppContent extends Component {

    constructor() {
        super();
        this.tableViewModel = [{label: 'Basic Salary', get: (() => this.state.basic)},
            {label: 'Bonus', get: (() => this.state.bonus)},
            {label: 'HRA exempted', get: (() => this.state.hra)},
            {label: 'Conveyance allowance', get: (() => this.state.conveyance)},
            {label: 'Medical Reimbursement', get: (() => this.state.medicalReimbursement)},
            {label: 'Employee PF', formula: '(12% Basic)', get: (() => this.props.pfDetails.pf)},
            {label: 'Professional Tax', get: (() => this.state.professionalTax)},
            {
                label: 'Taxable Income',
                get: (() => this.state.taxableIncome),
                formula: '(Gross + 2 - sum of 3 to 7 - Investments)'
            },
            {label: 'Income Tax', get: (() => this.state.incomeTax)},
            {label: 'Education Cess', get: (() => this.state.educationCess)},
            {label: 'Take Home Salary', get: (() => this.state.takeHomeSalary), className: 'bold', noIndex: true},
        ];
        this.state = {
            basic: 0,
            hra: 0,
            bonus: 0,
            hraFromEmployer: 0,
            defaultHraFromEmployer: 0,
            professionalTax: CONSTANTS.PROF_TAX,
            medicalReimbursement: CONSTANTS.MED_REIMBURSEMENT,
            conveyance: 19200,
            taxableIncome: 0,
            incomeTax: 0,
            educationCess: 0,
            gratuity: 0,
            grossSalary: 0,
            basicPercent: 30,
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
        let changedValue = event.target.type === 'checkbox' ? event.target.checked : (event.target.value === "" ? 0 : parseInt(event.target.value));
        this._updateState(changedInput, changedValue);
    }

    _updateState(changedInput, changedValue) {
        let nextState = _.extend({}, this.state, {[changedInput]: changedValue});
        let salaryComponents = Calculator.calculateSalaryComponents(nextState);
        this.props.setPFDetails(salaryComponents.pfDetails);
        this.setState(salaryComponents);
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
                             hraFromEmployer={this.state.hraFromEmployer}
                             defaultHraFromEmployer={this.state.defaultHraFromEmployer}
                             metro={this.state.metro}/>
                        <SalaryInputComponent label="Bonus" name="bonus" step="100000"
                                              value={this.state.bonus} onChange={this._handleInputChange}/>

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
                                <td className={css(s.tableCell)}>{_.floor(row.get() / 12, 2)}</td>
                                <td className={css(s.tableCell)}>{row.get()}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>

                    <Calculations/>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pfDetails: state.pfDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setPFDetails: pfDetails => {
            dispatch(setPFDetails(pfDetails))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContent);