'use strict';
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

class MessageInput extends React.PureComponent {

    static propTypes = {

    };

    static defaultProps = {

    };

    blur = () => {
        if (this.textInputRef.isFocused()) {
            this.textInputRef.blur()
        }
    };

    clear = () => {
        this.textInputRef.clear()
    };

    _captureRef = (v) => {
        this.textInputRef = v
    };

    render() {
        return (
            <TextInput
                ref={this._captureRef}
                style={styles.textInput}
                placeholder={'请输入信息'}
                underlineColorAndroid={'transparent'}
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