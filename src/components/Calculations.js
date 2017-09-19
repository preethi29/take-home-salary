import React from "react";
import {css, StyleSheet} from "aphrodite";
import PFDetails from "./PFDetails";

const s = StyleSheet.create({
    calcButton: {
        fontSize: '1.1em'
    },
    tabs: {
        padding: '0',
        boxSizing: 'border-box',
        display: 'table',
        tableLayout: 'fixed',
        width: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px'
    },
    tab: {
        display: 'table-cell',
        textAlign: 'center',
        padding: '0.8em 0',
        cursor: 'pointer'
    },
    active: {
        borderBottom: '0.2em solid #00bcd4'
    },
    calcView: {
        paddingTop: '1em'
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
        this._switchCurrentComp = this._switchCurrentComp.bind(this);
    }

    render() {
        let currentComp;
        switch (this.state.currentCalculatedComponent) {
            case 'PF':
                currentComp = <PFDetails/>;
                break;
            default:
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
                                                                            css(s.tab, s.active) : css(s.tab)}>{comp}</li>)}
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