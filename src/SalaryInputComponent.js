import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";

const s = StyleSheet.create({
    inputGroup: {
        padding: '5px',
        width: '75%'
    },
});

export default class SalaryInputComponent extends React.Component {
    render() {
        const inputGroupClassName = "input-group " + css(s.inputGroup);

        return (
            <div className={inputGroupClassName}>
                <span className="input-group-addon">{this.props.label}</span>
                <input type="number" name={this.props.name} value={this.props.value} className="form-control"
                       onChange={this.props.onChange}/>
            </div>

        );
    }

}

SalaryInputComponent.protoTypes = {

};
