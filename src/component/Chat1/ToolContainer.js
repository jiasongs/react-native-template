'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import ToolAnimated from './ToolAnimated';
import CommonLg from './CommonLg'
import EmojiContent from './EmojiContent';
import AddContent from './AddContent';
import ToolBar from './ToolBar';

const Status = {
    ToolBarUp: 'ToolbarUp',
    ToolBarDown: 'ToolbarDown',
    CommonLgUp: 'CommonLgUp',
    CommonLgDown: 'CommonLgDown',
    EmojiUp: 'EmojiUp',
    EmojiDown: 'EmojiDown',
    AddUp: 'AddUp',
    AddDown: 'AddDown',
}
const ContentType = {
    ToolBar: 'ToolBar',
    CommonLg: 'CommonLg',
    Emoji: 'Emoji',
    Add: 'Add',
}
class ToolContainer extends React.PureComponent {

    static propTypes = {
        barHeight: PropTypes.number,
        contentHeight: PropTypes.number,
        onToolbarWillShow: PropTypes.func,
        onToolbarWillHide: PropTypes.func,
        onPressAlbum: PropTypes.func,
        onPressSend: PropTypes.func,
    };

    static defaultProps = {
        barHeight: 53,
        contentHeight: 200
    };

    constructor(props) {
        super(props);
        this.state = { inputText: '' }
        this.translateY = new Animated.Value(props.contentHeight)
        this.toolBarStatus = Status.ToolBarDown
        this.commonLgStatus = Status.CommonLgDown
        this.emojiStatus = Status.EmojiDown
        this.addStatus = Status.AddDown
        console.log('zzzz')
    };

    componentDidMount() {
        let eventNameShow = 'keyboardWillShow'
        let eventNameHide = 'keyboardWillHide'
        if (__ANDROID__) {
            eventNameShow = 'keyboardDidShow'
            eventNameHide = 'keyboardDidHide'
        }
        this.keyboardShowListener = Keyboard.addListener(eventNameShow, this._onKeyboardShow);
        this.keyboardHideListener = Keyboard.addListener(eventNameHide, this._onKeyboardHide);
    };

    componentWillUnmount() {
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }

    runMainComponentDown = () => {
        const { contentHeight, barHeight, onToolbarWillHide } = this.props
        if (this.toolBarStatus === Status.ToolBarUp) {
            this.toolAnimatedRef.startAnimatedSpring(contentHeight)
            this.toolBarStatus = Status.ToolBarDown
            onToolbarWillHide && onToolbarWillHide()
        }
        console.log('runMainComponentDown')
    };

    runOtherComponentDown = () => {
        const { contentHeight, barHeight, onToolbarWillHide } = this.props
        if (this.commonLgStatus === Status.CommonLgUp) {
            // 如果常用语组件开启，那么就需要将常用语组件关闭
            this.commonLgRef.startAnimatedSpring(contentHeight)
            this.commonLgStatus = Status.CommonLgDown
            onToolbarWillHide && onToolbarWillHide()
        }
        if (this.emojiStatus === Status.EmojiUp) {
            // 如果表情组件开启，那么就需要将表情组件关闭
            this.emojiContentRef.startAnimatedSpring(contentHeight)
            this.emojiStatus = Status.EmojiDown
            onToolbarWillHide && onToolbarWillHide()
        }
        if (this.addStatus === Status.AddUp) {
            // 如果加号组件开启，那么就需要将表情组件关闭
            this.addContentRef.startAnimatedSpring(contentHeight)
            this.addStatus = Status.AddDown
            onToolbarWillHide && onToolbarWillHide()
        }
        console.log('runOtherComponentDown')
    };

    _onEmojiSelected = (info) => {
        if (info != undefined) {
            this.barRef.setInputText(info)
        } else {
            this.barRef.backInputText()
        }
    }

    _onPressSend = (text) => {
        const { onPressSend } = this.props
        onPressSend && onPressSend(text)
        // console.log(text)
    };

    _onPressLeft = () => {
        const { contentHeight, barHeight, onToolbarWillHide, onToolbarWillShow } = this.props
        if (this.commonLgStatus === Status.CommonLgDown) {
            // 常用语组件开启
            this.commonLgRef.startAnimatedSpring(0)
            this.toolAnimatedRef.startAnimatedSpring(0)
            this.commonLgStatus = Status.CommonLgUp
            this.toolBarStatus = Status.ToolBarUp
            if (this.emojiStatus === Status.EmojiUp) {
                // 如果表情组件开启，那么就需要将表情组件关闭
                this.emojiContentRef.startAnimatedSpring(contentHeight)
                this.emojiStatus = Status.EmojiDown
            }
            if (this.addStatus === Status.AddUp) {
                // 如果加号组件开启，那么就需要将表情组件关闭
                this.addContentRef.startAnimatedSpring(contentHeight)
                this.addStatus = Status.AddDown
            }
            onToolbarWillShow && onToolbarWillShow({ endCoordinates: { height: contentHeight } })
        } else {
            this.toolAnimatedRef.startAnimatedSpring(contentHeight)
            this.commonLgRef.startAnimatedSpring(contentHeight)
            this.commonLgStatus = Status.CommonLgDown
            this.toolBarStatus = Status.ToolBarDown
            onToolbarWillHide && onToolbarWillHide()
        }
        this.barRef.changeSendVisible(false)
        this.barRef.inputBlur()
        console.log('_onPressLeft')
    };

    _onPressEmoji = () => {
        const { contentHeight, barHeight, onToolbarWillHide, onToolbarWillShow } = this.props
        if (this.emojiStatus === Status.EmojiDown) {
            this.toolAnimatedRef.startAnimatedSpring(0)
            this.emojiContentRef.startAnimatedSpring(0)
            this.emojiStatus = Status.EmojiUp
            this.toolBarStatus = Status.ToolBarUp
            if (this.commonLgStatus === Status.CommonLgUp) {
                // 如果常用语组件开启，那么就需要将常用语组件关闭
                this.commonLgRef.startAnimatedSpring(contentHeight)
                this.commonLgStatus = Status.CommonLgDown
            }
            if (this.addStatus === Status.AddUp) {
                // 如果加号组件开启，那么就需要将表情组件关闭
                this.addContentRef.startAnimatedSpring(contentHeight)
                this.addStatus = Status.AddDown
            }
            onToolbarWillShow && onToolbarWillShow({ endCoordinates: { height: contentHeight } })
        } else {
            this.toolAnimatedRef.startAnimatedSpring(contentHeight)
            this.emojiContentRef.startAnimatedSpring(contentHeight)
            this.emojiStatus = Status.EmojiDown
            this.toolBarStatus = Status.ToolBarDown
            onToolbarWillHide && onToolbarWillHide()
        }
        this.barRef.changeSendVisible(true)
        this.barRef.inputBlur()
        console.log('_onPressEmoji');

    };

    _onPressAdd = () => {
        const { contentHeight, barHeight, onToolbarWillHide, onToolbarWillShow } = this.props
        if (this.addStatus === Status.AddDown) {
            this.toolAnimatedRef.startAnimatedSpring(0)
            this.addContentRef.startAnimatedSpring(0)
            this.addStatus = Status.AddUp
            this.toolBarStatus = Status.ToolBarUp
            if (this.commonLgStatus === Status.CommonLgUp) {
                // 如果常用语组件开启，那么就需要将常用语组件关闭
                this.commonLgRef.startAnimatedSpring(contentHeight)
                this.commonLgStatus = Status.CommonLgDown
            }
            if (this.emojiStatus === Status.EmojiUp) {
                // 如果表情组件开启，那么就需要将表情组件关闭
                this.emojiContentRef.startAnimatedSpring(contentHeight)
                this.emojiStatus = Status.EmojiDown
            }
            onToolbarWillShow && onToolbarWillShow({ endCoordinates: { height: contentHeight } })
        } else {
            this.toolAnimatedRef.startAnimatedSpring(contentHeight)
            this.addContentRef.startAnimatedSpring(contentHeight)
            this.addStatus = Status.AddDown
            this.toolBarStatus = Status.ToolBarDown
            onToolbarWillHide && onToolbarWillHide()
        }
        this.barRef.changeSendVisible(false)
        this.barRef.inputBlur()
        console.log('_onPressAdd');
    };

    _onKeyboardShow = (info) => {
        const { contentHeight, onToolbarWillShow } = this.props
        if (info.duration != 0) {
            const endCoordinates = info.endCoordinates
            let toValue, endCoordinatesHeight
            if (__IOS__) {
                toValue = contentHeight - endCoordinates.height
                endCoordinatesHeight = endCoordinates.height
            } else {
                toValue = this.toolBarStatus === Status.ToolBarUp ? 0 : contentHeight - endCoordinates.height
                endCoordinatesHeight = this.toolBarStatus === Status.ToolBarUp ? endCoordinates.height - 100 : endCoordinates.height
            }
            if (__ANDROID__) {
                this.runMainComponentDown()
            } else {
                this.toolAnimatedRef.startAnimatedTiming(toValue)
            }

            this.barRef.changeSendVisible(true)
            this.toolBarStatus = Status.ToolBarUp
            this.runOtherComponentDown()
            onToolbarWillShow && onToolbarWillShow({ endCoordinates: { height: endCoordinatesHeight } })
        }
        console.log('_onKeyboardShow')
    };

    _onKeyboardHide = (info) => {
        const { contentHeight, onToolbarWillHide } = this.props
        if (this.commonLgStatus === Status.CommonLgDown &&
            this.emojiStatus === Status.EmojiDown &&
            this.addStatus === Status.AddDown) {
            if (__ANDROID__) {

            } else {
                this.toolAnimatedRef.startAnimatedTiming(contentHeight)
            }
            this.barRef.changeSendVisible(false)
            this.toolBarStatus = Status.ToolBarDown
            onToolbarWillHide && onToolbarWillHide()
        }
        console.log('_onKeyboardHide')
    };

    _captureRef = (v) => {
        this.toolAnimatedRef = v
    };

    _captureCommonLgRef = (v) => {
        this.commonLgRef = v
    };

    _captureEmojiContentRef = (v) => {
        this.emojiContentRef = v
    };

    _captureAddContentRef = (v) => {
        this.addContentRef = v
    };
    _captureBarRef = (v) => {
        this.barRef = v
    };
    _captureSendRef = (v) => {
        this.sendRef = v
    };
    render() {
        const { barHeight, contentHeight, onPressAlbum, onPressCommon, onPressResume, onRecording } = this.props
        console.log('Tolllll')
        return (
            <ToolAnimated ref={this._captureRef} style={styles.container} initTranslateY={contentHeight} barHeight={barHeight} >
                <ToolBar
                    ref={this._captureBarRef}
                    barHeight={barHeight}
                    onPressLeft={this._onPressLeft}
                    onPressEmoji={this._onPressEmoji}
                    onPressAdd={this._onPressAdd}
                    onPressSend={this._onPressSend}
                />
                <CommonLg
                    ref={this._captureCommonLgRef}
                    onPressCommon={onPressCommon}  // 发送常用语 可自定义 不用时去掉即可
                    {...this.props}
                />
                <EmojiContent
                    ref={this._captureEmojiContentRef}
                    onEmojiSelected={this._onEmojiSelected}
                    {...this.props}
                />
                <AddContent
                    ref={this._captureAddContentRef}
                    onPressAlbum={onPressAlbum}
                    onPressResume={onPressResume} // 发送简历 可自定义 不用时去掉即可
                    onRecording={onRecording}
                    {...this.props}
                />
            </ToolAnimated>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
    },
});

export default ToolContainer