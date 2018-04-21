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
import {setHRADetails, setSalaryComponent} from "../redux-store/actions";
import {connect} from "react-redux";
import NumberFormat from 'react-number-format';


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
        this.tableViewModel = [{label: 'Basic Salary', get: (() => this.props.basic)},
            {label: 'Bonus', get: (() => this.props.bonus)},
            {label: 'HRA exempted', get: (() => this.props.hraDetails.hraExempted)},
            {label: 'Conveyance allowance', get: (() => this.props.conveyance)},
            {label: 'Medical Reimbursement', get: (() => this.props.medicalReimbursement)},
            {label: 'Employee PF', formula: '(12% Basic)', get: (() => this.props.pfDetails.pf)},
            {label: 'Professional Tax', get: (() => this.props.professionalTax)},
            {
                label: 'Taxable Income',
                get: (() => this.props.taxableIncome),
                formula: '(Gross + 2 - sum of 3 to 7 - Investments)'
            },
            {label: 'Income Tax', get: (() => this.props.incomeTax)},
            {label: 'Education Cess', get: (() => this.props.educationCess)},
            {label: 'Take Home Salary', get: (() => this.props.takeHomeSalary), className: 'bold', noIndex: true},
        ];
        this._handleInputChange = this._handleInputChange.bind(this);
        this._grossSalaryNotEmpty = this._grossSalaryNotEmpty.bind(this);
    }

    _handleInputChange(name, value) {
        this.props.setSalaryComponent(name, value)
    }

    _grossSalaryNotEmpty() {
        return (this.props.grossSalary !== 0 && this.props.grossSalary !== "");
    }

    render() {
        return (
            <div className={css(s.appContent)}>
                <div className={css(s.appInputs)}>
                    <SalaryInputComponent label="Gross Pay  (Yearly)" name="grossSalary"
                                          value={this.props.grossSalary} onChange={this._handleInputChange}/>
                    <BasicSalary/>

                    {this._grossSalaryNotEmpty() &&
                    <div className={css(s.optionalInputs)}>
                        <Hra/>
                        <SalaryInputComponent label="Bonus" name="bonus"
                                              value={this.props.bonus} onChange={this._handleInputChange}/>

                        <InvestmentsInput/>
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
                                <td className={css(s.tableCell)}>
                                    <NumberFormat displayType={"text"} thousandSeparator={true}
                                                  prefix={CONSTANTS.CURRENCY_PREFIX}
                                                  value={_.floor(row.get() / 12, 2)}/>
                                </td>
                                <td className={css(s.tableCell)}>
                                    <NumberFormat displayType={"text"} thousandSeparator={true}
                                                  prefix={CONSTANTS.CURRENCY_PREFIX} value={row.get()}/>
                                </td>
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
    const {
        pfDetails,
        hraDetails,
        grossSalary,
        bonus,
        basic,
        professionalTax,
        medicalReimbursement,
        conveyance,
        taxableIncome,
        incomeTax,
        educationCess,
        gratuity,
        basicPercent,
        eightyCLimit,
        totalExemptedInvestments,
        takeHomeSalary
    } = state;
    return {
        pfDetails,
        hraDetails,
        grossSalary,
        bonus,
        basic,
        professionalTax,
        medicalReimbursement,
        conveyance,
        taxableIncome,
        incomeTax,
        educationCess,
        gratuity,
        basicPercent,
        eightyCLimit,
        totalExemptedInvestments,
        takeHomeSalary
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setHRADetails: hraDetails => {
            dispatch(setHRADetails(hraDetails))
        },
        setSalaryComponent: (name, value) => {
            dispatch(setSalaryComponent(name, value))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContent);