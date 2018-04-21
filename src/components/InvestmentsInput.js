import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";
import SalaryInputComponent from "./SalaryInputComponent";
import {CONSTANTS} from "../constants";
import NumberFormat from "react-number-format";
import {setSalaryComponent} from "../redux-store/actions";
import {connect} from "react-redux";

class InvestmentsInput extends React.Component {

    constructor() {
        super();
        this.state = {
            eightyC: 0,
            eightyCCG: 0,
            eightyD: 0,
            eightyE: 0,
            eightyG: 0,
            totalExemptedInvestments: 0,
        };
        this._handleInputChange = this._handleInputChange.bind(this);
    }

    render() {
        return (
            <div>
                <h4>Investments</h4>
                <SalaryInputComponent label="80C, 80CC" name="eightyC"
                                      value={this.state.eightyC}
                                      limit={this.props.eightyCLimit}
                                      onChange={this._handleInputChange}/>
                {this.state.grossSalary <= CONSTANTS.MIN_GROSS_FOR_80CCG_RGESS &&
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
                <h4>Total Exempted Investments: <NumberFormat displayType={"text"} thousandSeparator={true}
                                                              prefix={CONSTANTS.CURRENCY_PREFIX}
                                                              value={this.state.totalExemptedInvestments}/>
                </h4>
            </div>
        )
    }

    _handleInputChange(name, value) {
        const totalExemptedInvestments = +this.state.totalExemptedInvestments - +this.state[name] + +value;
        this.setState({totalExemptedInvestments: totalExemptedInvestments, [name]: value});
        this.props.setSalaryComponent('totalExemptedInvestments', totalExemptedInvestments);
    }
}

InvestmentsInput.propTypes = {
    eightyCLimit: PropTypes.number,
};

const mapDispatchToProps = dispatch => {
    return {
        setSalaryComponent: (name, value) => {
            dispatch(setSalaryComponent(name, value))
        }
    }
};

const mapStateToProps = state => {
    return {
        eightyCLimit: state.eightyCLimit,
        totalExemptedInvestments: state.totalExemptedInvestments
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvestmentsInput);