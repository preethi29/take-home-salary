import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import _ from "lodash";
import {connect} from "react-redux";
import {CONSTANTS} from "../constants";
import NumberFormat from "react-number-format";
import {css, StyleSheet} from "aphrodite";

const s = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    },

});

class HRADetails extends React.Component {
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>HRA Candidates</th>
                        <th>Monthly</th>
                        <th>Yearly</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={this.props.hraFromEmployer === this.props.hraExempted ? css(s.bold) : ""}>
                        <td>HRA received from Employer</td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"} value={_.floor(this.props.hraFromEmployer / 12, 2)}/>
                        </td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"} value={this.props.hraFromEmployer}/></td>
                    </tr>
                    <tr className={this.props.percentFromBasic === this.props.hraExempted ? css(s.bold) : ""}>
                        <td>{this.props.metro ? CONSTANTS.HRA.BASIC_PERCENT_IF_METRO : CONSTANTS.HRA.BASIC_PERCENT_IF_NON_METRO}%
                            from basic
                        </td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"} value={_.floor(this.props.percentFromBasic / 12, 2)}/>
                        </td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"} value={this.props.percentFromBasic}/></td>
                    </tr>
                    <tr className={this.props.rentOverTenPercentBasic === this.props.hraExempted ? css(s.bold) : ""}>
                        <td>Rent paid over 10% basic</td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"}
                                          value={_.floor(this.props.rentOverTenPercentBasic / 12, 2)}/></td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"} value={this.props.rentOverTenPercentBasic}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hraFromEmployer: state.hraDetails.hraFromEmployer,
        percentFromBasic: state.hraDetails.percentFromBasic,
        metro: state.hraDetails.metro,
        rentOverTenPercentBasic: state.hraDetails.rentOverTenPercentBasic,
        hraExempted: state.hraDetails.hraExempted
    }
};


export default connect(
    mapStateToProps,
)(HRADetails);