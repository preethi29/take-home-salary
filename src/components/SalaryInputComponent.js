import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import PropTypes from "prop-types";

const s = StyleSheet.create({
    textFieldWrapper: {
        padding: '1% 0',
        width: '76%',
        '@media (max-width: 700px)': {
            width: '95%'
        }
    },
    textFieldLabel: {
        fontSize: '1.4em',
        fontWeight: 'normal',
        color: '#676767',
        width: '100%',
        textAlign: 'left',
    },
    textFieldLabelFocus: {
        color: '#00bcd4',
        webkitTransition: 'all 0.125s ease',
        transition: 'all 0.125s ease',
    },
    textField: {
        fontSize: '1.4em',
        border: 'none',
        borderBottom: '1px solid #ccc',
        width: '100%',
        lineHeight: '1.5',
        transition: 'all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1)',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #00bcd4 4%)',
        backgroundPosition: '-20000px 0',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',

        ':focus': {
            outline: 'none',
            borderBottom: '1px solid #00bcd4',
            backgroundPosition: '0 0',
        }
    },
});

export default class SalaryInputComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            isFocused: false,
        };
        this._focusChange = this._focusChange.bind(this);
    }

    render() {
        const inputGroupClassName = css(s.textFieldWrapper) + this.props.style;
        const labelClassName = this.state.isFocused ? css(s.textFieldLabel, s.textFieldLabelFocus) : css(s.textFieldLabel);

        return (
            <div className={inputGroupClassName}>
                <label className={labelClassName}>{this.props.label}
                    {this.props.limit && <small> (Limit: {this.props.limit})</small>}
                </label>
                <input type="number" name={this.props.name}
                       value={this.props.value} className={css(s.textField)}
                       step={this.props.step} min="0" max={this.props.max} onBlur={this._focusChange}
                       onFocus={this._focusChange} onChange={this.props.onChange}/>
            </div>

        );
    }

    _focusChange() {
        this.setState({isFocused: !this.state.isFocused});
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
