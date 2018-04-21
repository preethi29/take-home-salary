import React from "react";
import {css, StyleSheet} from "aphrodite";
import PFDetails from "./PFDetails";
import HRADetails from "./HRADetails";

const s = StyleSheet.create({
    calcButton: {
        fontSize: '1.1em'
    },
    tabs: {
        padding: '0',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        tableLayout: 'fixed',
        width: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px'
    },
    tab: {
        display: 'inline-block',
        flex: '1 0 0',
        textAlign: 'center',
        padding: '0.8em 0',
        cursor: 'pointer',
    },
    activeBar: {
        position: 'absolute',
        height: '0.25em',
        width: 'calc(100% /3)',
        bottom: '0',
        left: '0',
        listStyleType: 'none',
        flexGrow: '0',
        background: '#00bcd4',
        transition: 'left .3s ease-in-out'
    },
    calcView: {
        paddingTop: '1em'
    }
});
export default class Calculations extends React.Component {

    constructor() {
        super();
        this.calculatedComponents = [
            'HRA',
            'PF',
            'Income Tax'
        ];
        this.state = {
            show: false,
            currentCalculatedComponent: 'HRA'
        };
        this._toggle = this._toggle.bind(this);
        this._switchCurrentComp = this._switchCurrentComp.bind(this);
    }

    render() {
        let currentComp;
        switch (this.state.currentCalculatedComponent) {
            case 'PF':
                currentComp = <PFDetails/>;
                break;
            case 'HRA':
                currentComp = <HRADetails/>;
                break;
            default:
                currentComp = <h3>Coming soon</h3>
                break;
        }

        return <div>
            <label className={"button " + css(s.calcButton)}
                   onClick={this._toggle}>{this.state.show ? 'Hide Calculations' : 'Show Calculations'} </label>
            {this.state.show &&
            <div className={css(s.calcView)}>
                <ul className={css(s.tabs)}>
                    {this.calculatedComponents.map((comp, index) => <li key={index} onClick={()=>{this._switchCurrentComp(comp)}}
                                                                        className={this.state.currentCalculatedComponent === comp ?
                                                                            "active tab "+css(s.tab) : "tab "+css(s.tab)}>{comp}</li>)}
                    <li className={"active-bar "+css(s.activeBar)}/>
                </ul>
                {currentComp}
            </div>
            }
        </div>
    }

    _toggle() {
        this.setState({'show': !this.state.show})
    }

    _switchCurrentComp(comp) {
        this.setState({currentCalculatedComponent: comp});
    }
}