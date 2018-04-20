import React, {Component} from "react";
import {css, StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import SalaryInputComponent from "./SalaryInputComponent";

const s = StyleSheet.create({
    hra: {
        padding: '1% 0',
        width: '76%',
        display: 'table',
        position: 'relative',
        '@media (max-width: 700px)': {
            width: '95%'
        }
    },
    monthlyRent: {
        width: '70%',
        '@media (max-width: 700px)': {
            width: '60%'
        },
        display: 'table-cell',
    },
    metro: {
        position: 'absolute',
        bottom: '14%',
        margin: '0 2%',
        '@media (max-width: 700px)': {
            bottom: '7%'
        },

    }
});
export default class Hra extends Component {

    render() {
        return (
            <div>
                <div className={css(s.hra)}>

                    <SalaryInputComponent label="Monthly Rent" name="monthlyRent" style={s.monthlyRent}
                                          value={this.props.monthlyRent} step="500"
                                          onChange={this.props.onChange}/>
                    <div className={css(s.metro)}>
                        <label className={"button " + (this.props.metro ? ' active' : '')}>
                            <input type="checkbox" name="metro" checked={this.props.metro}
                                   onChange={this.props.onChange}/> Living in Metro
                        </label>
                    </div>
                </div>
                <div className={css(s.hra)}>
                    <SalaryInputComponent label="HRA received from employer" name="hraFromEmployer"
                                          value={this.props.hraFromEmployer}
                                          defaultValue={this.props.defaultHraFromEmployer}
                                          step="10000"
                                          onChange={this.props.onChange}/>
                </div>

            </div>);

    }
}

Hra.propTypes = {
    metro: PropTypes.bool,
    monthlyRent: PropTypes.number,
    hraFromEmployer: PropTypes.number,
    defaultHraFromEmployer: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};