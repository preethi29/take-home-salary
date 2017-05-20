import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {StyleSheet, css} from 'aphrodite';
import PropTypes from 'prop-types';

const s = StyleSheet.create({
    otherBasicPercent: {
        borderRadius: '4px',
        color: 'black'
    },
});
export default class BasicSalary extends React.Component {
    render() {
        return (
            <div className="btn-group input-group">
                <span className="input-group-addon">Basic is </span>
                <label className={"btn btn-primary " + (this.props.basicPercent === '30' ? 'active' : '')}>
                    <input type="radio" value="30" name="basicPercent" onChange={this.props.onChange}
                           checked={this.props.basicPercent === '30'}/> 30% of Gross
                </label>
                <label className={"btn btn-primary " + ( this.props.basicPercent === '40' ? 'active' : '')}>
                    <input type="radio" value="40" name="basicPercent" onChange={this.props.onChange}
                           checked={this.props.basicPercent === '40'}/> 40% of Gross
                </label>
                <label
                    className={"btn btn-primary " + (this.props.basicPercent !== '30' && this.props.basicPercent !== '40' ? 'active' : '')}>
                    <input type="radio" value="0" name="basicPercent" onChange={this.props.onChange}
                           checked={this.props.basicPercent !== '30' && this.props.basicPercent !== '40'}/>
                    <span>Other</span>
                    {this.props.basicPercent !== '30' && this.props.basicPercent !== '40' &&
                    <input type="number" name="basicPercent" value={this.props.basicPercent}
                           className={css(s.otherBasicPercent)}
                           onChange={this.props.onChange}/>

                    }
                </label>
            </div>
        )
    }
}

BasicSalary.propTypes = {
    onChange: PropTypes.func,
    basicPercent: PropTypes.string
}