import React, {Component} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";


import logo from "../rupee-indian.svg";
import "../stylesheets/App.css";
import AppContent from "./AppContent";

const s = StyleSheet.create({
    heading: {
        marginTop: '8px',
        marginBottom: '5px',
    },
    appContent: {
        padding: '1.3889%',
    },
    appInputs: {
        width: '50%',
        display: 'inline-block',
        overflowX: 'auto',
        '@media (max-width: 700px)': {
            width: '100%'
        }
    },
    appCalculated: {
        textAlign: 'left',
        width: '50%',
        verticalAlign: 'top',
        display: 'inline-block',
        fontSize: '1.4em',
        '@media (max-width: 700px)': {
            width: '100%'
        }

    },
    bold: {
        fontWeight: 'bold',
        fontSize: '1.142em',
    },
    tableCell: {
        padding: '0.3em'
    },
    formula: {
        color: 'grey'
    }
});

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 className={css(s.heading)}>Know your Take home salary </h2>
                </div>
                <AppContent/>
            </div>
        );
    }
}

export default App;
