import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import NumberFormat from 'react-number-format';
import {CONSTANTS} from "../constants";

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
        marginBottom: '0'
    },
    textFieldLabelFocus: {
        color: '#00bcd4',
        webkitTransition: 'all 0.125s ease',
        transition: 'all 0.2s ease',
    },
    textField: {
        fontSize: '1.4em',
        border: 'none',
        borderBottom: '1px solid #ccc',
        width: '100%',
        lineHeight: '1.5',
        ':focus': {
            outline: 'none',
            borderBottom: '1px solid #00bcd4',
        }
    },
    bar: {
        display: 'block',
        width: '100%',
        position: 'relative',
        ':before': {
            content: "''",
            height: '2px',
            width: '0',
            bottom: '1px',
            position: 'absolute',
            background: '#00bcd4',
            transition: '0.2s ease all',
            left: '50%',
        },
        ':after': {
            content: "''",
            height: '2px',
            width: '0',
            bottom: '1px',
            position: 'absolute',
            background: '#00bcd4',
            transition: '0.2s ease all',
            right: '50%',
        },
    },
    barFocus: {
        ':before': {
            width: '50%'
        },
        ':after': {
            width: '50%'
        }
    }
});

export default class SalaryInputComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isFocused: false,
            value: props.defaultValue ? props.defaultValue : props.value,
            defaultValue: props.defaultValue,
        };
        this._focusChange = this._focusChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    render() {
        const wrapperClassName = this.props.style ? css(s.textFieldWrapper, this.props.style) : css(s.textFieldWrapper);
        const labelClassName = this.state.isFocused ? css(s.textFieldLabel, s.textFieldLabelFocus) : css(s.textFieldLabel);
        const barClassName = this.state.isFocused ? css(s.bar, s.barFocus) : css(s.bar);
        return (
            <div className={wrapperClassName}>
                <label className={labelClassName}>{this.props.label}
                    {this.props.limit && <small>
                        (Limit: <NumberFormat displayType={"text"} thousandSeparator={true}
                                              prefix={CONSTANTS.CURRENCY_PREFIX}
                                              value={this.props.limit}/>)</small>}
                </label>
                <NumberFormat name={this.props.name} value={this.state.value} className={css(s.textField)}
                              isNumericString={true} allowNegative={false} prefix={CONSTANTS.CURRENCY_PREFIX}
                              thousandSeparator={true} onBlur={this._focusChange}
                              onFocus={this._focusChange} onValueChange={this._onChange}/>
                <span className={barClassName}/>
            </div>

        );
    }

    _getNewValue(newDefaultValue) {
        if (this.state.value === this.props.defaultValue && newDefaultValue) {
            return newDefaultValue;
        }
        return this.state.value;
    }

    _onChange(values, event) {
        if (event.type === 'change') {
            let {floatValue, value} = values;
            if (value === "") {
                floatValue = 0;
            }

            if (this.props.limit && Number(floatValue) > Number(this.props.limit)) {
                floatValue = this.props.limit
            }
            this.setState({value: floatValue});
            this.props.onChange(this.props.name, floatValue);
        }
    }

    _focusChange(event) {
        this.setState({isFocused: !this.state.isFocused});
        if (this.state.isFocused && this.state.value === 0) {
            event.target.value = ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            let newValue = this._getNewValue(nextProps.defaultValue);
            this.setState({
                defaultValue: nextProps.defaultValue,
                value: newValue
            });
            this.props.onChange(this.props.name, newValue)
        }
    }
}

SalaryInputComponent.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
    limit: PropTypes.string,
};
