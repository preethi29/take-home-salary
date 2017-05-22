import React, {Component} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import _ from "lodash";


import logo from "../rupee-indian.svg";
import "../App.css";
import SalaryInputComponent from "./SalaryInputComponent";
import BasicSalary from "./BasicSalary";
const s = StyleSheet.create({
    appContent: {
        padding: '1.3889%',
        height: '80.695%',
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
        padding: '20px 0px'
    },
    bold: {
        fontWeight: 'bold',
        fontSize: '1.142em',
    },
    hra: {
        padding: '10px 0px'
    }
});

class App extends Component {

    constructor() {
        super();
        this.state = {
            basic: 0,
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
            eightyC: 0,
            eightyCCG: 0,
            eightyD: 0,
            eightyE: 0,
            eightyG: 0,
            basicPercent: '30',
            monthlyRent: 0,
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
            medicalReimbursement, monthlyRent, metro,
            conveyance, grossSalary, professionalTax, basicPercent, eightyC, eightyCCG, eightyD, eightyE, eightyG
        } = state;
        let basic = _.floor(grossSalary * basicPercent / 100);
        const pf = _.floor(basic * (12 / 100), 2);
        const employerPf = _.floor(basic * (3.67 / 100), 2);
        const employerEps = _.floor(basic * (8.33 / 100), 2);
        const totalEmployerContribution = employerEps + employerPf;
        const hra = this._calculateHRA(basic, monthlyRent, metro);
        medicalReimbursement = medicalReimbursement > 15000 ? 15000 : medicalReimbursement;
        conveyance = conveyance > 19200 ? 19200 : conveyance;
        const eightyCLimit = 150000 - pf;
        eightyC = (eightyC !== 0 && eightyC > eightyCLimit) ? eightyCLimit : eightyC;
        const taxableIncome = _.floor(grossSalary - pf - conveyance - medicalReimbursement
            - hra - professionalTax - eightyC - eightyCCG - eightyD - eightyE - eightyG, 2);
        const incomeTax = this._calculateIncomeTax(taxableIncome);
        const educationCess = _.floor(incomeTax * 0.03, 2);
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
            eightyC,
            eightyCLimit,
            eightyCCG,
            eightyD,
            eightyE,
            eightyG,
            educationCess
        };
    }

    _grossSalaryNotEmpty() {
        return (this.state.grossSalary !== 0 && this.state.grossSalary !== "");
    }

    _calculateHRA(basic, monthlyRent, metro) {
        if (monthlyRent === 0) {
            return 0;
        }
        const percentFromBasic = _.floor(metro ? (basic * 0.50) : (basic * 0.40), 2);
        const rentPaidMinusTenPercentOfBasic = _.floor((monthlyRent * 12) - (basic * 0.10), 2);
        return rentPaidMinusTenPercentOfBasic < percentFromBasic ? rentPaidMinusTenPercentOfBasic : percentFromBasic;
    }

    _calculateIncomeTax(taxableIncome) {
        let incomeTax = 0;
        const twoAndHalfLakhs = 250000;
        const fiveLakhs = 500000;
        //income above 2.5 lakhs is only taxable
        taxableIncome -= 250000;
        if (taxableIncome <= 0) {
            return 0;
        }
        //apply 5% slab rate
        if (taxableIncome > twoAndHalfLakhs) {
            incomeTax += twoAndHalfLakhs * 0.05;
            //apply 20% slab rate
            taxableIncome -= twoAndHalfLakhs;
            if (taxableIncome > fiveLakhs) {
                incomeTax += fiveLakhs * 0.20;
                taxableIncome -= fiveLakhs;
                //apply 30% slab rate
                incomeTax += taxableIncome * 0.30;
            } else {
                incomeTax += taxableIncome * 0.20
            }
        } else {
            incomeTax += taxableIncome * 0.05;
        }
        return _.floor(incomeTax, 2);
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
                        <h5>Input your gross pay</h5>
                        <SalaryInputComponent label="Gross Pay  (Yearly)" name="grossSalary" step="100000"
                                              value={this.state.grossSalary} onChange={this._handleInputChange}/>

                        <BasicSalary basicPercent={this.state.basicPercent} onChange={this._handleInputChange}/>

                        { this._grossSalaryNotEmpty() &&
                        <div className={css(s.optionalInputs)}>
                            <div className={css(s.hra)}>
                                <label className={"btn btn-primary " + ( this.state.metro ? 'active' : '')}>
                                    <input type="checkbox" name="metro" checked={this.state.metro}
                                           onChange={this._handleInputChange}/> Living in Metro
                                </label>

                                <SalaryInputComponent label="Monthly Rent" name="monthlyRent"
                                                      value={this.state.monthlyRent} step="500"
                                                      onChange={this._handleInputChange}/>
                            </div>
                            <h5>Investments</h5>
                            <SalaryInputComponent label="80C, 80CC" name="eightyC"
                                                  value={this.state.eightyC}
                                                  limit={this.state.eightyCLimit}
                                                  onChange={this._handleInputChange}/>
                            {this.state.grossSalary <= 1200000 &&
                            <SalaryInputComponent label="80CCG - RGESS " name="eightyCCG"
                                                  value={this.state.eightyCCG}
                                                  limit="50000"
                                                  onChange={this._handleInputChange}/>
                            }
                            <SalaryInputComponent label="80CCG - Medical Premimum " name="eightyD"
                                                  value={this.state.eightyD} limit="40000"
                                                  onChange={this._handleInputChange}/>
                            <SalaryInputComponent label="80E - Interest on Edu. loan " name="eightyE"
                                                  value={this.state.eightyE}
                                                  onChange={this._handleInputChange}/>
                            <SalaryInputComponent label="80G - Donations" name="eightyG"
                                                  value={this.state.eightyG}
                                                  onChange={this._handleInputChange}/>
                        </div>
                        }

                    </div>
                    { this._grossSalaryNotEmpty() &&
                    <div className={css(s.appCalculated)}>
                        <table className="table table-responsive">
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
                                <td>Medical Reimbursement
                                </td>
                                <td>{_.floor(this.state.medicalReimbursement / 12, 2)}</td>
                                <td>{this.state.medicalReimbursement}</td>
                            </tr>
                            <tr>
                                <td>Employee PF (12% Basic)</td>
                                <td>{_.floor(this.state.pf / 12, 2)}</td>
                                <td>{this.state.pf}</td>
                            </tr>
                            <tr>
                                <td>Professional Tax</td>
                                <td>{_.floor(this.state.professionalTax / 12, 2)}</td>
                                <td>{this.state.professionalTax}</td>
                            </tr>
                            <tr>
                                <td>Taxable Income</td>
                                <td>{_.floor(this.state.taxableIncome / 12, 2)}</td>
                                <td>{this.state.taxableIncome}</td>
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
                            <tr className={css(s.bold)}>
                                <td>Take Home Salary</td>
                                <td>{_.floor(this.state.takeHomeSalary / 12, 2) }</td>
                                <td>{this.state.takeHomeSalary }</td>
                            </tr>
                            </tbody>
                        </table>

                        {/*<PFDetails pf={this.state.pf} employerPf={this.state.employerPf}*/}
                        {/*employerEps={this.state.employerEps}/>*/}
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default App;
