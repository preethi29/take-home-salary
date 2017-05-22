import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import PropTypes from "prop-types";

const s = StyleSheet.create({
    inputGroup: {
        padding: '5px 0px',
        width: '70%',
        '@media (max-width: 700px)': {
            width: '90%'
        }

    },
});

export default class SalaryInputComponent extends React.Component {
    render() {
        const inputGroupClassName = "input-group " + this.props.style;

        return (
            <div className={inputGroupClassName}>
                <span className="input-group-addon">{this.props.label}
                    {this.props.limit && <small> (Limit: {this.props.limit})</small>}
                    </span>
                <input type="number" name={this.props.name} value={this.props.value} className="form-control"
                       step={this.props.step} min="0" max={this.props.max} onChange={this.props.onChange}/>
            </div>

        );
    }

}

SalaryInputComponent.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    max: PropTypes.number,
    limit: PropTypes.string,
    step: PropTypes.number
};

SalaryInputComponent.defaultProps = {
    style: css(s.inputGroup),
    max: 524288,
    step: 1,
};
