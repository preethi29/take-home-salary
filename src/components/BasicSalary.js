import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { setSalaryComponent} from "../redux-store/actions";

const s = StyleSheet.create({
    basicSalary: {
        padding: '5px 0px',
        width: '80%',
        '@media (max-width: 700px)': {
            width: '90%'
        }
    },
    otherBasicPercent: {
        borderRadius: '4px',
        color: 'black',
        height: '20px',
    },
});
class BasicSalary extends React.Component {

    constructor(){
        super();
        this._handleChange = this._handleChange.bind(this);
    }

    render() {
        return (
            <div className={"btn-group input-group " + css(s.basicSalary)}>
                <span className="input-group-addon">Basic is </span>
                <label className={"btn btn-primary " + (this.props.basicPercent === 30 ? 'active' : '')}>
                    <input type="radio" value="30" name="basicPercent" onChange={this._handleChange}
                           checked={this.props.basicPercent === 30}/> 30% of Gross
                </label>
                <label className={"btn btn-primary " + ( this.props.basicPercent === 40 ? 'active' : '')}>
                    <input type="radio" value="40" name="basicPercent" onChange={this._handleChange}
                           checked={this.props.basicPercent === 40}/> 40% of Gross
                </label>
                <label
                    className={"btn btn-primary " +
                    (this.props.basicPercent !== 30 && this.props.basicPercent !== 40 ? 'active' : '')}>
                    <input type="radio" value="0" name="basicPercent" onChange={this._handleChange}
                           checked={this.props.basicPercent !== 30 && this.props.basicPercent !== 40}/>
                    <span>Other %</span>
                    {this.props.basicPercent !== 30 && this.props.basicPercent !== 40 &&
                    <input type="number" name="basicPercent" value={this.props.basicPercent} placeholder="In percentage"
                           className={css(s.otherBasicPercent)}
                           onChange={this._handleChange}/>

                    }
                </label>
            </div>
        )
    }

    _handleChange(event){
        this.props.setBasicPercent(Number(event.target.value));
    }

}

BasicSalary.propTypes = {
    basicPercent: PropTypes.number
};

const mapStateToProps = state => {
    return {
        basicPercent: state.basicPercent
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setBasicPercent: basicPercent => {
            dispatch(setSalaryComponent('basicPercent',basicPercent))
        },
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BasicSalary);