'use strict';
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

class MessageInput extends React.PureComponent {

    static propTypes = {

    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state = { text: '' }
    }

    setText = (text) => {
        this.setState({ text })
    };

    focus = () => {
        if (!this.textInputRef.isFocused()) {
            this.textInputRef.focus()
        }
    };

    blur = () => {
        if (this.textInputRef.isFocused()) {
            this.textInputRef.blur()
        }
    };

    clear = () => {
        this.textInputRef.clear()
    };

    _onChangeText = (text) => {
        const { onChangeText } = this.props
        this.setText(text)
        onChangeText && onChangeText(text)
    }

    _captureRef = (v) => {
        this.textInputRef = v
    };

    render() {
        const { onChangeText, ...others } = this.props
        return (
            <TextInput
                ref={this._captureRef}
                style={styles.textInput}
                placeholder={'请输入信息'}
                underlineColorAndroid={'transparent'}
                value={this.state.text}
                onChangeText={this._onChangeText}
                {...others}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#2883ff',
        height: 40
    }
});

export default MessageInput