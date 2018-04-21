import React, {Component} from "react";
import {css, StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import SalaryInputComponent from "./SalaryInputComponent";
import {connect} from "react-redux";
import {setHRADetails} from "../redux-store/actions";

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
class Hra extends Component {

    constructor(){
        super();
        this._handleCheckBox = this._handleCheckBox.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    render() {
        return (
            <div>
                <div className={css(s.hra)}>

                    <SalaryInputComponent label="Monthly Rent" name="monthlyRent" style={s.monthlyRent}
                                          value={this.props.monthlyRent}
                                          onChange={this._handleChange}/>
                    <div className={css(s.metro)}>
                        <label className={"button " + (this.props.metro ? ' active' : '')}>
                            <input type="checkbox" name="metro" checked={this.props.metro}
                                   onChange={this._handleCheckBox}/> Living in Metro
                        </label>
                    </div>
                </div>
                <div className={css(s.hra)}>
                    <SalaryInputComponent label="HRA received from employer" name="hraFromEmployer"
                                          value={this.props.hraFromEmployer}
                                          defaultValue={this.props.defaultHraFromEmployer}
                                          onChange={this._handleChange}/>
                </div>

            </div>);

    }

    _handleCheckBox(event){
        this.props.setHRADetails({[event.target.name]: event.target.checked});
    }

    _handleChange(name, value){
        this.props.setHRADetails({[name]: value})
    }
}

Hra.propTypes = {
    metro: PropTypes.bool,
    monthlyRent: PropTypes.number,
    hraFromEmployer: PropTypes.number,
    defaultHraFromEmployer: PropTypes.number,
};

const mapStateToProps = state => {
    return {
        hraFromEmployer: state.hraDetails.hraFromEmployer,
        defaultHraFromEmployer: state.hraDetails.defaultHraFromEmployer,
        metro: state.hraDetails.metro,
        monthlyRent: state.hraDetails.monthlyRent,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setHRADetails: hraDetails => {
            dispatch(setHRADetails(hraDetails))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hra);