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
        this.state = { text: '', selection: { start: 0, end: 0 } }
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
        const nativeProps = {};
        this._lastNativeSelection = { start: this.state.text.length, end: this.state.text.length }
        // this.textInputRef.setNativeProps({ selection: this._lastNativeSelection })

        // if (
        //     this._lastNativeText !== this.state.text &&
        //     typeof this.state.text === 'string'
        // ) {
        //     nativeProps.text = this.state.text;
        // }

        // Selection is also a controlled prop, if the native value doesn't match
        // // JS, update to the JS value.
        // const { selection } = this.props;
        // if (
        //     this._lastNativeSelection &&
        //     selection &&
        //     (this._lastNativeSelection.start !== selection.start ||
        //         this._lastNativeSelection.end !== selection.end)
        // ) {
        //     nativeProps.selection = this.props.selection;
        // }

        // if (Object.keys(nativeProps).length > 0 && this.textInputRef) {
        //     this.textInputRef.setNativeProps(nativeProps);
        // }
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
        console.log(text)
        this.setText(text)
        onChangeText && onChangeText(text)
    }

    _onChange = (event) => {
        console.log(event.nativeEvent)
    }


    _onSelectionChange = (event) => {
        if (!this.textInputRef) {
            return;
        }
        let nativeProps = {};
        this._lastNativeSelection = event.nativeEvent.selection;
        console.log('selection', this._lastNativeSelection)
        this.setState({ selection: this._lastNativeSelection })
        // if (Object.keys(this._lastNativeSelection).length > 0) {
        //     console.log('z', Object.keys(this._lastNativeSelection), this._lastNativeSelection)
        //     this.textInputRef.setNativeProps({ selection: this._lastNativeSelection });
        // } else {
        //     nativeProps.selection = { start: this.state.text.length, end: this.state.text.length }
        //     console.log('this._lastNativeSelection', nativeProps.selection)
        //     this.textInputRef.setNativeProps(nativeProps);
        // }

        // nativeProps.selection = this._lastNativeSelection
        // this.textInputRef.setNativeProps({ selection: this._lastNativeSelection });
        // console.log('this._lastNativeSelection', this._lastNativeSelection)
        // nativeProps.selection = this._lastNativeSelection


        //   if (this.props.selection || this.props.selectionState) {
        //     this.forceUpdate();
        //   }
    }

    _captureRef = (v) => {
        this.textInputRef = v
    };

    render() {
        const { onChangeText, onSubmitEditing, ...others } = this.props
        return (
            <TextInput
                ref={this._captureRef}
                style={styles.textInput}
                placeholder={'请输入信息'}
                underlineColorAndroid={'transparent'}
                value={this.state.text}
                returnKeyType={'send'}
                onChangeText={this._onChangeText}
                onChange={this._onChange}
                onSubmitEditing={onSubmitEditing}
                multiline={false}
                onSelectionChange={this._onSelectionChange}
                selection={this.state.selection}
                blurOnSubmit={false}
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