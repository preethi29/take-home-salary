import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {css, StyleSheet} from "aphrodite";
import PropTypes from 'prop-types';

const s = StyleSheet.create({
    appReadableItem: {
        padding: '5px 0px',
        fontSize: '14px',
        width: '60%',
    },
    appReadableItemLabel: {
        width: '60%',
        display: 'inline-block',
    },
    small: {
        color: '#777'
    },
    appReadableItemValue: {
        width: '40%',
        display: 'inline-block',
    },
});

export default class ReadableComponent extends React.Component{

    render(){
        return(
            <div className={css(s.appReadableItem)}>
                            <span className={css(s.appReadableItemLabel, this.props.parentStyle)}>{this.props.label}<small
                                className={css(s.small)}>{this.props.helpText} </small></span>
                <span className={css(s.appReadableItemValue, this.props.parentStyle)}>: {this.props.value}</span>
            </div>

        );
    }
}
ReadableComponent.PropTypes = {
    parentStyle: PropTypes.object,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    helpText: PropTypes.string,
};