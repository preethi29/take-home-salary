import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import PropTypes from 'prop-types';

const s = StyleSheet.create({
    inputGroup: {
        padding: '5px 0px',
        width: '60%'
    },
});

export default class SalaryInputComponent extends React.Component {
    render() {
        const inputGroupClassName = "input-group " + this.props.style;

        return (
            <div className={inputGroupClassName}>
                <span className="input-group-addon">{this.props.label}</span>
                <input type="number" name={this.props.name} value={this.props.value} className="form-control"
                       min="0" onChange={this.props.onChange}/>
            </div>

        );
    }

}

SalaryInputComponent.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
};

SalaryInputComponent.defaultProps = {
    style: css(s.inputGroup)
};
