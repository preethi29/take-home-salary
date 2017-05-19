import React, {Component} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import _ from "lodash";

import logo from "./rupee-indian.svg";
import "./App.css";
import SalaryInputComponent from "./SalaryInputComponent";
import PFDetails from "./PFDetails";
import ReadableComponent from "./ReadableComponent";
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
    exemptions: {
        padding: '20px 0px'
    },
    appReadableItem: {
        padding: '5px 0px',
        fontSize: '14px',
        width: '60%',
    },
    appReadableItemLabel: {
        width: '60%',
        display: 'inline-block',
    },
    small: {
        color: '#777'
    },
    appReadableItemValue: {
        width: '40%',
        display: 'inline-block',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: '15px',
    }

});

class App extends Component {

    constructor() {
        super();
        this.state = {
            basic: 0,
            ctc: 0,
            hra: 0,
            epf: 0,
            employerPf: 0,
            employerEps: 0,
            professionalTax: 200,
            medicalReimbursement: 15000,
            conveyance: 19200,
            taxableIncome: 0,
            incomeTax: 0,
            educationCess: 0,
            gratuity: 0,
            grossSalary: 0,
            totalEmployerContribution: 0
        };
        this._handleInputChange = this._handleInputChange.bind(this);
    }

    _handleInputChange(event) {
        let changedInput = event.target.name;
        let nextState = _.extend({}, this.state, {[changedInput]: event.target.value});
        this.setState(this._calculateSalaryComponents(nextState));
    }

    _calculateSalaryComponents(state) {
        let {basic, ctc, hra, medicalReimbursement, conveyance} = state;
        const epf = basic * (12 / 100);
        const employerPf = _.floor(basic * (3.67 / 100), 2);
        const employerEps = _.floor(basic * (8.33 / 100), 2);
        const totalEmployerContribution = employerEps + employerPf;
        const grossSalary = _.floor(ctc - (basic * 12 + employerPf + employerEps), 2);
        hra = this.state.hra === hra ? basic * 12 * (40 / 100) : hra;
        medicalReimbursement = medicalReimbursement > 15000 ? 15000 : medicalReimbursement;
        conveyance = conveyance > 19200 ? 19200 : conveyance;
        const taxableIncome = _.floor((ctc - ((epf + employerEps + employerPf ) * 12 + hra + conveyance
        + medicalReimbursement)), 2);
        return {
            basic, ctc, epf, totalEmployerContribution, grossSalary,
            employerPf, employerEps, medicalReimbursement, hra, taxableIncome
        };
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
                        <SalaryInputComponent label="Basic (Monthly) *" name="basic" value={this.state.basic}
                                              onChange={this._handleInputChange}/>
                        <SalaryInputComponent label="CTC (Yearly) *" name="ctc" value={this.state.ctc}
                                              onChange={this._handleInputChange}/>

                        <ReadableComponent label="Employer Cont. to PF, EPS and Gratuity"
                                           value={this.state.totalEmployerContribution}/>
                        <ReadableComponent label="Gross Salary" value={this.state.grossSalary} parentStyle={s.bold}
                                           helpText="(CTC - Employer cont to PF, EPS and Gratuity) "/>

                        <div className={css(s.exemptions)}>
                            <h4>Exemptions</h4>
                            <SalaryInputComponent label="HRA (Yearly)" name="hra" value={this.state.hra}
                                                  onChange={this._handleInputChange}/>
                            <SalaryInputComponent label="Medical Reimbursement (Yearly)" name="medicalReimbursement"
                                                  value={this.state.medicalReimbursement}
                                                  onChange={this._handleInputChange}/>
                            <SalaryInputComponent label="Conveyance (Yearly)" name="conveyance"
                                                  value={this.state.conveyance}
                                                  onChange={this._handleInputChange}/>

                        </div>
                        <ReadableComponent label="Taxable Income" value={this.state.taxableIncome} parentStyle={s.bold}
                                           helpText="(Gross salary - Total Exemption)"/>

                    </div>
                    <div className={css(s.appCalculated)}>
                        <h4>Deductions from Gross Salary </h4>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Deduction</th>
                                <th>Monthly</th>
                                <th>Yearly</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Employee PF</td>
                                <td>{this.state.epf}</td>
                                <td>{_.floor(this.state.epf * 12, 2)}</td>
                            </tr>
                            <tr>
                                <td>Income Tax</td>
                                <td>{this.state.incomeTax}</td>
                                <td>{_.floor(this.state.incomeTax * 12, 2)}</td>
                            </tr>
                            <tr>
                                <td>Professional Tax</td>
                                <td>{this.state.professionalTax}</td>
                                <td>{_.floor(this.state.professionalTax * 12, 2)}</td>
                            </tr>
                            <tr>
                                <td>Education Cess</td>
                                <td>{_.floor(this.state.educationCess / 12, 2) }</td>
                                <td>{this.state.educationCess }</td>
                            </tr>
                            </tbody>
                        </table>

                        <PFDetails epf={this.state.epf} employerPf={this.state.employerPf}
                                   employerEps={this.state.employerEps}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
