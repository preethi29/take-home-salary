import React from "react";
import {css, StyleSheet} from "aphrodite";
import PFDetails from "./PFDetails";

const s = StyleSheet.create({
    calcButton: {
        fontSize: '1.1em'
    }
});
export default class Calculations extends React.Component {

    constructor() {
        super();
        this.calculatedComponents = [
            'PF',
            'HRA',
            'Income Tax'
        ];
        this.state = {
            show: false,
            currentCalculatedComponent: 'PF'
        };
        this._toggle = this._toggle.bind(this);
    }

    render() {
        let currentComp;
        switch (this.state.currentCalculatedComponent) {
            case 'PF':
                currentComp = <PFDetails pf={this.props.pf} employerPf={this.props.employerPf}
                                         employerEps={this.props.employerEps}/>;
                break;
            default:
                break;
        }

        return <div>
            <label className={"button " + css(s.calcButton)}
                   onClick={this._toggle}>{this.state.show ? 'Hide Calculations' : 'Show Calculations'} </label>
            {this.state.show && currentComp}
        </div>
    }

    _toggle() {
        this.setState({'show': !this.state.show})
    }
}