'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MessageInput from './MessageInput';
import ToolBarSend from './ToolBarSend';

import PropTypes from 'prop-types';

class ToolBar extends React.PureComponent {

    static propTypes = {
        barHeight: PropTypes.number,

    };

    static defaultProps = {


    };

    constructor(props) {
        super(props);
        this.inputText = ''
    }



    changeSendVisible = (isVisible) => {
        this.sendRef.changeVisible(isVisible)
    }

    inputBlur = () => {
        this.inputRef.blur()
    }

    setInputText = (text) => {
        this.inputText = this.inputText + text
        this.inputRef.setText(this.inputText)
    }
    // 后退一个字符
    backInputText = () => {
        this.inputText = this.inputText.substr(0, this.inputText.length - 1)
        this.inputRef.setText(this.inputText)
    }

    _onChangeText = (text) => {
        this.inputText = text
        console.log('_onChangeText')
    }

    _onSubmitEditing = (text) => {
        this._onPressSend()
    }

    _onPressSend = () => {
        const { onPressSend } = this.props
        onPressSend && onPressSend(this.inputText)
        // 清楚输入框
        this.inputRef.clear()
        this.inputText = ''
    }

    _captureSendRef = (v) => {
        this.sendRef = v
    }

    _captureInputRef = (v) => {
        this.inputRef = v
    }

    render() {
        const { barHeight, onPressLeft, onPressEmoji, onPressAdd } = this.props
        return (
            <View style={[styles.barContainer, { height: barHeight }]}>
                <TouchableOpacity style={styles.leftContainer} onPress={onPressLeft}>
                    <Text style={styles.leftText}>常用语</Text>
                </TouchableOpacity>
                <MessageInput
                    ref={this._captureInputRef}
                    onChangeText={this._onChangeText}
                    onSubmitEditing={this._onSubmitEditing}
                />
                <TouchableOpacity style={styles.leftContainer} onPress={onPressEmoji}>
                    <Text style={styles.leftText}>表情</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.leftContainer} onPress={onPressAdd}>
                    <Text style={styles.leftText}>加号</Text>
                </TouchableOpacity>
                <ToolBarSend ref={this._captureSendRef} onPress={this._onPressSend} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    leftContainer: {
        marginRight: 10,
        borderRadius: 3,
        backgroundColor: "#43a4fe",
        paddingHorizontal: 5,
    },
    leftText: {
        fontSize: FontSize(13),
        lineHeight: 26,
        color: "#ffffff"
    }
});

export default ToolBar