import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import _ from "lodash";
import PropTypes from 'prop-types';
import {connect} from "react-redux";


class PFDetails extends React.Component {
    render() {
        return (
            <div>
                <h4>PF Details</h4>
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
                        <td>{this.props.pf}</td>
                        <td>{this.props.pf * 12}</td>
                    </tr>
                    <tr>
                        <td>Employer's Contribution to PF (3.67% of Basic)</td>
                        <td>{this.props.employerPf}</td>
                        <td>{_.floor(this.props.employerPf * 12, 2)}</td>
                    </tr>
                    <tr>
                        <td>Employer's Contribution to EPS (8.33% of Basic)</td>
                        <td>{this.props.employerEps}</td>
                        <td>{_.floor(this.props.employerEps * 12, 2)}</td>
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