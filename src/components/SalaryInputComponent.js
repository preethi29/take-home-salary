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
            value: props.value
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
                    {this.props.limit && <small> (Limit: {this.props.limit})</small>}
                </label>
                <input type="number" name={this.props.name} ref={input => this.inputField = input}
                       value={this.state.value} className={css(s.textField)}
                       step={this.props.step} min="0" max={this.props.limit} onBlur={this._focusChange}
                       onFocus={this._focusChange} onChange={this._onChange}/>
                <span className={barClassName}/>
            </div>

        );
    }

    _onChange(event) {
        if (this.props.limit && Number(event.target.value) > Number(this.props.limit)) {
            event.target.value = this.props.limit;
        }
        this.setState({value: event.target.value});
        this.props.onChange(event);
    }

    _focusChange() {
        this.setState({isFocused: !this.state.isFocused});
        this.setState({value: !this.state.isFocused && this.props.value === 0 ? "" : this.props.value});
    }
}

SalaryInputComponent.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    limit: PropTypes.string,
    step: PropTypes.number
};

SalaryInputComponent.defaultProps = {
    step: 1,
};
