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
        defaultMessages: PropTypes.array,
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

    sendMessage = (type, currentMsg) => {
        const { messages } = this.state
        const msgTemplate = {
            type: type,
            message_id: Math.random(),
            from_user: {
                id: 1000,
                nick_name: '',
                avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528793132482&di=fc622f2c78594ec077a4fcfc023cb542&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20130330%2F30-074643_295.jpg',
            },
            to_user: {
                id: 5
            },
            content: `${''}`,
            created_at: 12345456,// 
        }
        const newMessage = {
            ...msgTemplate,
            ...currentMsg,
        }
        console.log(newMessage)
        this.setState({ messages: MessagesManager.appendMessages(messages, newMessage) })
    }

    startTimingAnimated = (toValue) => {
        Animated.timing(this._messageContainerHeight, {
            toValue,
            duration: 210,

        }).start()
    }


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
        const { user, onPressSend, onPressAlbum, onPressCommon, onPressResume } = this.props
        const { messages } = this.state
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
                    onPressSend={onPressSend}  // 发送消息
                    onPressAlbum={onPressAlbum} // 打开相册后发送消息
                    onPressCommon={onPressCommon} // 发送常用语 可自定义 不用时去掉即可
                    onPressResume={onPressResume} // 发送简历 可自定义 不用时去掉即可
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