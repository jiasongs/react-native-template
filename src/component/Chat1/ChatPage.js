'use strict';
import React from 'react';
import { View, Text, StyleSheet, Keyboard, Animated, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MessagesManager from './MessagesManager'
import MessageContainer from './MessageContainer'
import ToolContainer from './ToolContainer';

const ToolBarHeight = 53   // bar的高度
const ContentHeight = 200 // 内容的高度，暂时设置为同样的高度
const Status = {
    KeyboardUp: 'KeyboardUp',
    KeyboardDown: 'KeyboardDown',
}
class ChatPage extends React.PureComponent {

    static propTypes = {
        messages: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        defaultMessages: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        user: PropTypes.shape({ id: PropTypes.number, nick_name: PropTypes.string, avatar: PropTypes.string, }).isRequired,
        onPressSend: PropTypes.func,
        onPressAlbum: PropTypes.func,
    };

    static defaultProps = {
        defaultMessages: []
    };

    constructor(props) {
        super(props);
        const { defaultMessages } = props
        this.state = { messages: defaultMessages }
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

    // 发送文本消息
    sendTextMessage = (currentMsg) => {
        this.sendMessage(1, currentMsg) // 消息类型 文本消息
    }

    // 发送图片消息
    sendImageMessage = (currentMsg) => {
        this.sendMessage(2, currentMsg) // 消息类型 图片消息
    }

    // 发送语音消息
    sendVoiceMessage = (currentMsg) => {
        this.sendMessage(3, currentMsg) // 消息类型 语音消息
    }

    sendMessage = (type, currentMsg) => {
        const { messages } = this.state
        const { user } = this.props
        const msgTemplate = {
            type: type,
            message_id: Math.random(),
            from_user: user,
            to_user: {
                id: 5
            },
            content: `${''}`,
            create_at: 12345456,// 
        }
        const newMessage = {
            ...msgTemplate,
            ...currentMsg,
        }
        this.setState({ messages: MessagesManager.appendMessages(messages, newMessage) })
    }

    startTimingAnimated = (toValue) => {
        Animated.timing(this._messageContainerHeight, {
            toValue,
            duration: 210,

        }).start()
    };

    _onToolbarWillShow = (info) => {
        if (this._contaierLayout) {
            let value
            if (__IOS__) {
                value = this._contaierLayout.height - info.endCoordinates.height - ToolBarHeight
            } else {
                value = this._contaierLayout.height - info.endCoordinates.height - ToolBarHeight
            }
            console.log(this._contaierLayout.height, info.endCoordinates.height, value)
            this.startTimingAnimated(value)
            this.messageRef.scrollToTop()
        }
    };

    _onToolbarWillHide = (info) => {
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
        console.log('_contaierLayout', this._contaierLayout)
        this._messageContainerHeight.setValue(this._contaierLayout.height - ToolBarHeight)
    };

    _captureToolbarRef = (v) => {
        this.toolbarRef = v
    };

    _captureRef = (v) => {
        this.messageRef = v
    };

    render() {
        const { messages, user, onPressSend, onPressAlbum, onPressCommon, onPressResume, onRecording } = this.props
        const data = messages ? messages : this.state.messages
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <Animated.View style={{ height: this._messageContainerHeight }}>
                    <MessageContainer
                        ref={this._captureRef}
                        messages={data}
                        user={user}
                        onScrollBeginDrag={this._onScrollBeginDrag}
                    />
                </Animated.View>
                <ToolContainer
                    ref={this._captureToolbarRef}
                    barHeight={ToolBarHeight}
                    contentHeight={ContentHeight}
                    onPressSend={onPressSend}  // 发送消息
                    onPressAlbum={onPressAlbum} // 打开相册后发送消息
                    onPressCommon={onPressCommon} // 发送常用语 可自定义 不用时去掉即可
                    onPressResume={onPressResume} // 发送简历 可自定义 不用时去掉即可
                    onRecording={onRecording}
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