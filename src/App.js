import React, {Component} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import _ from "lodash";

import logo from "./rupee-indian.svg";
import "./App.css";
import SalaryInputComponent from "./SalaryInputComponent";
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
        paddingLeft: '5px',
        paddingTop: '20px'
    }
});

class App extends Component {

    constructor() {
        super();
        this.state = {basic: 0, ctc: 0, hra: 0, epf: 0, employerPf: 0, employerEps: 0};
        this._handleInputChange = this._handleInputChange.bind(this);
    }

    _handleInputChange(event) {
        let changedInput = event.target.name;
        let nextState = _.extend({}, this.state, {[changedInput]: event.target.value});
        this.setState(this._calculateSalaryComponents(nextState));
    }

    _calculateSalaryComponents(state) {
        const {basic, ctc, hra} = state;
        const epf = basic * (12 / 100);
        const employerPf = _.ceil(basic * (3.67 / 100), 2);
        const employerEps = _.ceil(basic * (8.33 / 100), 2);
        const newHra = this.state.hra === hra ? basic * (40 / 100) : hra;
        return {basic, ctc, epf, employerPf, employerEps, hra: newHra};
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
                        <SalaryInputComponent label="CTC (Yearly)" name="ctc" value={this.state.ctc}
                                              onChange={this._handleInputChange}/>
                        <SalaryInputComponent label="Basic (Monthly)" name="basic" value={this.state.basic}
                                              onChange={this._handleInputChange}/>
                        <div className={css(s.exemptions)}>
                            <h4>Exemptions</h4>
                            <SalaryInputComponent label="HRA (Monthly)" name="hra" value={this.state.hra}
                                                  onChange={this._handleInputChange}/>
                        </div>
                    </div>
                    <div className={css(s.appCalculated)}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Salary Component</th>
                                <th>Monthly</th>
                                <th>Yearly</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Employee's Contribution to PF (12% of Basic)</td>
                                <td>{this.state.epf}</td>
                                <td>{this.state.epf * 12}</td>
                            </tr>
                            <tr>
                                <td>Employer's Contribution to PF (3.67% of Basic)</td>
                                <td>{this.state.employerPf}</td>
                                <td>{_.ceil(this.state.employerPf * 12)}</td>
                            </tr>
                            <tr>
                                <td>Employer's Contribution to EPS (8.33% of Basic)</td>
                                <td>{this.state.employerEps}</td>
                                <td>{_.ceil(this.state.employerEps * 12)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
