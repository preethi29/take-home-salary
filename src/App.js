import React, {Component} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import _ from "lodash";

import logo from "./rupee-indian.svg";
import "./App.css";
import SalaryInputComponent from "./SalaryInputComponent";
import PFDetails from "./PFDetails";
const s = StyleSheet.create({
    appContent: {
        padding: '20px',
    },
    appInputs: {
        width: '50%',
        display: 'inline-block'
    },
    appCalculated: {
        textAlign: 'left',
        width: '50%',
        verticalAlign: 'top',
        display: 'inline-block'
    },
    optionalInputs: {
        padding: '20px 0px'
    },
    bold: {
        fontWeight: 'bold',
        fontSize: '15px',
    },
    hra: {}

});

class App extends Component {

    constructor() {
        super();
        this.state = {
            basic: 0,
            ctc: 0,
            hra: 0,
            pf: 0,
            employerPf: 0,
            employerEps: 0,
            professionalTax: 2400,
            medicalReimbursement: 15000,
            conveyance: 19200,
            taxableIncome: 0,
            incomeTax: 0,
            educationCess: 0,
            gratuity: 0,
            grossSalary: 0,
            totalEmployerContribution: 0,
            taxSavingInvestments: 0,
            basicPercent: '30',
            metro: false
        };
        this._handleInputChange = this._handleInputChange.bind(this);
        this._grossSalaryNotEmpty = this._grossSalaryNotEmpty.bind(this);
    }

    _handleInputChange(event) {
        let changedInput = event.target.name;
        let changedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        if (changedInput === 'basicPercent' && changedValue === 'Other') {
            this.setState({[changedInput]: changedValue})
        } else {
            let nextState = _.extend({}, this.state, {[changedInput]: changedValue});
            this.setState(this._calculateSalaryComponents(nextState));
        }
    }

    _calculateSalaryComponents(state) {
        let {
            ctc, medicalReimbursement, monthlyRent, metro,
            conveyance, grossSalary, professionalTax, basicPercent
        } = state;
        let basic = grossSalary * basicPercent / 100;
        const pf = basic * (12 / 100);
        const employerPf = _.floor(basic * (3.67 / 100), 2);
        const employerEps = _.floor(basic * (8.33 / 100), 2);
        const totalEmployerContribution = employerEps + employerPf;
        const hra = this._calculateHRA(basic, monthlyRent, metro);
        medicalReimbursement = medicalReimbursement > 15000 ? 15000 : medicalReimbursement;
        conveyance = conveyance > 19200 ? 19200 : conveyance;
        const taxableIncome = grossSalary - pf - conveyance - medicalReimbursement - hra - professionalTax;
        const incomeTax = this._calculateIncomeTax(taxableIncome);
        return {
            basic, ctc, metro, pf, totalEmployerContribution, grossSalary, basicPercent, conveyance, monthlyRent,
            employerPf, employerEps, medicalReimbursement, hra, incomeTax
        };
    }

    _grossSalaryNotEmpty() {
        return (this.state.grossSalary !== 0 && this.state.grossSalary !== "");
    }

    _calculateHRA(basic, monthlyRent, metro) {
        const percentFromBasic = metro ? (basic * 0.50) : (basic * 0.40);
        if (monthlyRent === 0) {
            return percentFromBasic;
        }
        const rentPaidMinusTenPercentOfBasic = (monthlyRent * 12) - (basic * 0.10)
        return rentPaidMinusTenPercentOfBasic < percentFromBasic ? rentPaidMinusTenPercentOfBasic : percentFromBasic;
    }

    _calculateIncomeTax(taxableIncome) {
        let incomeTax = 0;
        const fiveLakhs = 500000;
        //income above five lakhs is only taxable
        taxableIncome = taxableIncome - fiveLakhs;
        if (taxableIncome <= 0) {
            return 0;
        }
        //apply 20% slab rate
        if (taxableIncome > fiveLakhs) {
            incomeTax += fiveLakhs * 0.20;
            //apply 30% slab rate
            taxableIncome = taxableIncome - fiveLakhs;
            incomeTax += taxableIncome * 0.30;
        } else {
            incomeTax += taxableIncome * 0.20;
        }
        return incomeTax;
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Know your Take home salary </h2>
                </div>
                <div className={css(s.appContent)}>
                    <div className={css(s.appInputs)}>
                        Input your gross pay
                        <SalaryInputComponent label="Gross Pay  (Yearly)" name="grossSalary"
                                              value={this.state.grossSalary} onChange={this._handleInputChange}/>

                        <div className="btn-group input-group">
                            <span className="input-group-addon">Basic is </span>
                            <label className={"btn btn-primary " + (this.state.basicPercent === '30' ? 'active' : '')}>
                                <input type="radio" value="30" name="basicPercent" onChange={this._handleInputChange}
                                       checked={this.state.basicPercent === '30'}/> 30% of Gross
                            </label>
                            <label className={"btn btn-primary " + ( this.state.basicPercent === '40' ? 'active' : '')}>
                                <input type="radio" value="40" name="basicPercent" onChange={this._handleInputChange}
                                       checked={this.state.basicPercent === '40'}/> 40% of Gross
                            </label>
                            <label
                                className={"btn btn-primary " + (this.state.basicPercent !== '30' && this.state.basicPercent !== '40' ? 'active' : '')}>
                                <input type="radio" value="0" name="basicPercent" onChange={this._handleInputChange}
                                       checked={this.state.basicPercent !== '30' && this.state.basicPercent !== '40'}/>
                                Other
                                {this.state.basicPercent !== '30' && this.state.basicPercent !== '40' &&
                                <input type="number" name="basicPercent" value={this.state.basicPercent}
                                       className="form-control"
                                       onChange={this._handleInputChange}/>

                                }
                            </label>
                        </div>
                        { this._grossSalaryNotEmpty() &&
                        <div className={css(s.optionalInputs)}>
                            <div className={css(s.hra)}>
                                <label className={"btn btn-primary " + ( this.state.metro ? 'active' : '')}>
                                    <input type="checkbox" name="metro" checked={this.state.metro}
                                           onChange={this._handleInputChange}/> Living in Metro
                                </label>

                                <SalaryInputComponent label="Monthly Rent" name="monthlyRent"
                                                      value={this.state.monthlyRent}
                                                      onChange={this._handleInputChange}/>
                            </div>
                            {/*<SalaryInputComponent label="Medical Reimbursement (Yearly)" name="medicalReimbursement"*/}
                            {/*value={this.state.medicalReimbursement}*/}
                            {/*onChange={this._handleInputChange}/>*/}
                            {/*<SalaryInputComponent label="Conveyance (Yearly)" name="conveyance"*/}
                            {/*value={this.state.conveyance}*/}
                            {/*onChange={this._handleInputChange}/>*/}
                            {/*<SalaryInputComponent label="Tax Saving Investments" name="taxSavingInvestments"*/}
                            {/*value={this.state.taxSavingInvestments}*/}
                            {/*onChange={this._handleInputChange}/>*/}
                        </div>
                        }

                    </div>
                    { this._grossSalaryNotEmpty() &&
                    <div className={css(s.appCalculated)}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Component</th>
                                <th>Monthly</th>
                                <th>Yearly</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Basic Salary</td>
                                <td>{_.floor(this.state.basic / 12, 2)}</td>
                                <td>{this.state.basic}</td>
                            </tr>
                            <tr>
                                <td>HRA</td>
                                <td>{_.floor(this.state.hra / 12, 2)}</td>
                                <td>{this.state.hra}</td>
                            </tr>
                            <tr>
                                <td>Conveyance Allowance</td>
                                <td>{_.floor(this.state.conveyance / 12, 2)}</td>
                                <td>{this.state.conveyance}</td>
                            </tr>
                            <tr>
                                <td>Medical Reimbursement</td>
                                <td>{_.floor(this.state.medicalReimbursement / 12, 2)}</td>
                                <td>{this.state.medicalReimbursement}</td>
                            </tr>
                            <tr>
                                <td>Employee PF</td>
                                <td>{_.floor(this.state.pf / 12, 2)}</td>
                                <td>{this.state.pf}</td>
                            </tr>
                            <tr>
                                <td>Professional Tax</td>
                                <td>{_.floor(this.state.professionalTax / 12, 2)}</td>
                                <td>{this.state.professionalTax}</td>
                            </tr>
                            <tr>
                                <td>Income Tax</td>
                                <td>{_.floor(this.state.incomeTax / 12, 2)}</td>
                                <td>{this.state.incomeTax}</td>
                            </tr>
                            <tr>
                                <td>Education Cess</td>
                                <td>{_.floor(this.state.educationCess / 12, 2) }</td>
                                <td>{this.state.educationCess }</td>
                            </tr>
                            </tbody>
                        </table>

                        <PFDetails pf={this.state.pf} employerPf={this.state.employerPf}
                                   employerEps={this.state.employerEps}/>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default App;
