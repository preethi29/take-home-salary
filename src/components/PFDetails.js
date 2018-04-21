import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import _ from "lodash";
import {connect} from "react-redux";
import NumberFormat from "react-number-format";
import {CONSTANTS} from "../constants";


class PFDetails extends React.Component {
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
                        <td>Employee's Contribution to PF (12% of Basic)</td>
                        <td><NumberFormat displayType={"text"} prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          value={_.floor(this.props.pf / 12, 2)}/></td>
                        <td><NumberFormat displayType={"text"} prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          value={this.props.pf}/></td>
                    </tr>
                    <tr>
                        <td>Employer's Contribution to PF (3.67% of Basic)</td>
                        <td><NumberFormat displayType={"text"} prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          value={_.floor(this.props.employerPf / 12, 2)}/></td>
                        <td><NumberFormat displayType={"text"} prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          value={this.props.employerPf}/></td>
                    </tr>
                    <tr>
                        <td>Employer's Contribution to EPS (8.33% of Basic)</td>
                        <td><NumberFormat displayType={"text"} prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          value={_.floor(this.props.employerEps / 12, 2)}/></td>
                        <td><NumberFormat displayType={"text"} prefix={CONSTANTS.CURRENCY_PREFIX} thousandSeparator={true}
                                          value={this.props.employerEps}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pf: state.pfDetails.pf,
        employerPf: state.pfDetails.employerPf,
        employerEps: state.pfDetails.employerEps
    }
};


export default connect(
    mapStateToProps,
)(PFDetails);