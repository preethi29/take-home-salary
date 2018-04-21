import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import _ from "lodash";
import {connect} from "react-redux";
import {CONSTANTS} from "../constants";
import NumberFormat from "react-number-format";


class HRADetails extends React.Component {
    render() {
        return (
            <div>
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
                        <td>HRA received from Employer</td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"} value={_.floor(this.props.hraFromEmployer / 12, 2)}/>
                        </td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"} value={this.props.hraFromEmployer}/></td>
                    </tr>
                    <tr>
                        <td>{this.props.metro ? CONSTANTS.HRA.BASIC_PERCENT_IF_METRO : CONSTANTS.HRA.BASIC_PERCENT_IF_NON_METRO}%
                            from basic
                        </td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"} value={_.floor(this.props.percentFromBasic / 12, 2)}/>
                        </td>
                        <td><NumberFormat prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          displayType={"text"} value={this.props.percentFromBasic}/></td>
                    </tr>
                    <tr>
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
        hraExempted: state.hraDetails.hra
    }
};


export default connect(
    mapStateToProps,
)(HRADetails);