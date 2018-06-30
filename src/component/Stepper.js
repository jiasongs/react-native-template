// Stepper.js

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, ViewPropTypes, TextInput } from 'react-native';
import { Theme } from 'teaset';
import { isNumber } from '../util/Tool';

class Stepper extends React.PureComponent {

    static propTypes = {
        ...ViewPropTypes,
        defaultValue: PropTypes.number,
        value: PropTypes.number,
        step: PropTypes.number,
        max: PropTypes.number,
        min: PropTypes.number,
        valueStyle: Text.propTypes.style,
        valueFormat: PropTypes.func, //(value)
        subButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        addButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        showSeparator: PropTypes.bool,
        disabled: PropTypes.bool,
        editable: PropTypes.bool,
        editableInput: PropTypes.bool,
        onChange: PropTypes.func, //(value)
    };

    static defaultProps = {
        ...View.defaultProps,
        defaultValue: 0,
        step: 1,
        subButton: '－',
        addButton: '＋',
        showSeparator: true,
        disabled: false,
        editable: true,
        editableInput: true
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value ? props.value : (props.defaultValue ? props.defaultValue : 0),
            height: null,
        };
    }

    buildProps() {
        let { style, valueStyle, subButton, addButton, disabled, editable, pointerEvents, opacity, ...others } = this.props;

        style = [{
            backgroundColor: Theme.stepperColor,
            borderColor: Theme.stepperBorderColor,
            borderWidth: Theme.stepperBorderWidth,
            borderRadius: Theme.stepperBorderRadius,
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
        }].concat(style);
        valueStyle = [{
            color: Theme.stepperTextColor,
            fontSize: Theme.stepperFontSize,
            textAlign: 'center',
            minWidth: Theme.stepperValueMinWidth,
            minHeight: 40,
            paddingHorizontal: Theme.stepperValuePaddingHorizontal,
            // backgroundColor: 'red',
        }].concat(valueStyle);

        let btnStyle = {
            width: Theme.stepperButtonWidth,
            height: Theme.stepperButtonHeight,
            alignItems: 'center',
            justifyContent: 'center',
        };
        let btnTextStyle = {
            color: Theme.stepperBtnTextColor,
            fontSize: Theme.stepperBtnFontSize,
        };
        if (!React.isValidElement(subButton)) {
            subButton = (
                <View style={btnStyle}>
                    <Text style={btnTextStyle}>{subButton}</Text>
                </View>
            );
        }
        if (!React.isValidElement(addButton)) {
            addButton = (
                <View style={btnStyle}>
                    <Text style={btnTextStyle}>{addButton}</Text>
                </View>
            );
        }

        if (disabled) {
            pointerEvents = 'none';
            opacity = Theme.stepperDisabledOpacity;
        }

        this.props = { style, valueStyle, subButton, addButton, disabled, editable, pointerEvents, opacity, ...others };
    }

    onLayout(e) {
        if (this.state.height === null) {
            this.setState({
                height: e.nativeEvent.layout.height,
            });
        }
        this.props.onLayout && this.props.onLayout(e);
    }

    _onChangeText = (text) => {
        const { value, onChange } = this.props
        if (isNumber(text)) {
            if (value === undefined) {
                this.setState({ value: Number(text) });
            } else {
                onChange && onChange(Number(text));
            }
        }
    }

    onSubButtonPress() {
        if (this.textInput.isFocused()) {
            this.textInput.blur()
        }
        let { value, step, min, onChange } = this.props;
        if (value === undefined) value = this.state.value;
        value -= step;
        if (value < min) value = min;
        if (value === undefined) {
            this.setState({ value });
        }
        onChange && onChange(value);
    }

    onAddButtonPress() {
        if (this.textInput.isFocused()) {
            this.textInput.blur()
        }
        let { value, step, max, onChange } = this.props;
        if (value === undefined) value = this.state.value;
        value += step;
        if (value > max) value = max;
        if (value === undefined) {
            this.setState({ value });
        }
        onChange && onChange(value);
    }

    render() {
        this.buildProps();

        let { style, subButton, addButton, value, valueStyle, valueFormat, max, min, showSeparator, disabled, editable, onLayout, onChange, editableInput, ...others } = this.props; //disable View.onChange

        if (value === undefined) value = this.state.value;

        let separator;
        if (showSeparator) {
            let fs = StyleSheet.flatten(style);
            separator = <View style={{ backgroundColor: fs.borderColor, width: fs.borderWidth, height: this.state.height }} />;
        }

        let subDisabled = !editable || value <= min;
        let addDisabled = !editable || value >= max;
        let subOpacity = !disabled && subDisabled ? Theme.stepperDisabledOpacity : 1;
        let addOpacity = !disabled && addDisabled ? Theme.stepperDisabledOpacity : 1;

        return (
            <View style={style} onLayout={e => this.onLayout(e)} {...others}>
                <TouchableOpacity disabled={subDisabled} onPress={() => this.onSubButtonPress()}>
                    <View style={{ opacity: subOpacity }}>
                        {subButton}
                    </View>
                </TouchableOpacity>
                {separator}
                <TextInput
                    ref={v => this.textInput = v}
                    style={valueStyle}
                    keyboardType={'numeric'}
                    value={`${valueFormat ? valueFormat(value) : value}`}
                    onChangeText={this._onChangeText}
                    underlineColorAndroid={'transparent'}
                    editable={editableInput}
                />
                {/* <Text style={valueStyle} numberOfLines={1}>{valueFormat ? valueFormat(value) : value}</Text> */}
                {separator}
                <TouchableOpacity disabled={addDisabled} onPress={() => this.onAddButtonPress()}>
                    <View style={{ opacity: addOpacity }}>
                        {addButton}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}
export default Stepper
