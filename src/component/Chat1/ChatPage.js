'use strict';
import React from 'react';
import { View, Text, StyleSheet, Keyboard, Animated } from 'react-native';
import PropTypes from 'prop-types';
import MessagesManager from './MessagesManager'
import MessageContainer from './MessageContainer'
import ToolContainer from './ToolContainer';


const ToolBarHeight = 53
const ContentHeight = 200
const Status = {
    KeyboardUp: 'KeyboardUp',
    KeyboardDown: 'KeyboardDown',
}
class ChatPage extends React.PureComponent {

    static propTypes = {
        messages: PropTypes.array,
        user: PropTypes.shape({ id: PropTypes.number, nick_name: PropTypes.string, avatar: PropTypes.string, }).isRequired,
        onPressSend: PropTypes.func
    };

    static defaultProps = {

    };

    static appendMessages(currentMessages, messages, inverted) {
        return MessagesManager.appendMessages(currentMessages, messages, inverted)
    }

    constructor(props) {
        super(props);
        this._contaierLayout = null
        this._messageContainerHeight = new Animated.Value(0)
        this._keyboardStatus = Status.KeyboardDown
    }


    componentDidMount() {
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._onKeyboardWillShow);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._onKeyboardWillHide);
    };

    componentWillUnmount() {
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
    }

    startTimingAnimated = (toValue) => {
        Animated.timing(this._messageContainerHeight, {
            toValue,
            duration: 210,

        }).start()
    }

    _onEmojiSelected = (info) => {
        alert(info)
    }

    _onToolbarWillShow = (info) => {
        // if (info.duration != 0) {
        //     console.log('_onKeyboardWillShow', info)
        //     const endCoordinates = info.endCoordinates
        //     if (this._keyboardStatus === Status.KeyboardDown) {

        //         this._keyboardStatus = Status.KeyboardUp
        //     }
        // }
        if (this._contaierLayout) {
            this.startTimingAnimated(this._contaierLayout.height - info.endCoordinates.height - ToolBarHeight)
            this.messageRef.scrollToTop()
        }
    };

    _onToolbarWillHide = (info) => {
        // if (this._keyboardStatus === Status.KeyboardUp) {

        //     this._keyboardStatus = Status.KeyboardDown
        // }
        if (this._contaierLayout) {
            this.startTimingAnimated(this._contaierLayout.height - ToolBarHeight)
        }
    };


    _onScrollBeginDrag = () => {
        this.toolbarRef.runMainComponentDown()
        this.toolbarRef.runOtherComponentDown()
    };

    _onLayout = (event) => {
        this._contaierLayout = event.nativeEvent.layout
        this._messageContainerHeight.setValue(this._contaierLayout.height - ToolBarHeight)
    };

    _captureToolbarRef = (v) => {
        this.toolbarRef = v
    };

    _captureRef = (v) => {
        this.messageRef = v
    };

    render() {
        const { messages, user, onPressSend } = this.props
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <Animated.View style={{ height: this._messageContainerHeight }}>
                    <MessageContainer
                        ref={this._captureRef}
                        messages={messages}
                        user={user}
                        onScrollBeginDrag={this._onScrollBeginDrag}
                    />
                </Animated.View>
                <ToolContainer
                    ref={this._captureToolbarRef}
                    barHeight={ToolBarHeight}
                    contentHeight={ContentHeight}
                    onPressSend={onPressSend}
                    onToolbarWillShow={this._onToolbarWillShow}
                    onToolbarWillHide={this._onToolbarWillHide}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default ChatPage