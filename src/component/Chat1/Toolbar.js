'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import ToolAnimated from './ToolAnimated';
import MessageInput from './MessageInput'
import CommonLg from './CommonLg'
import EmojiContent from './EmojiContent';
import AddContent from './AddContent';

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

class Toolbar extends React.PureComponent {

    static propTypes = {
        barHeight: PropTypes.number,
        contentHeight: PropTypes.number,
        onToolbarWillShow: PropTypes.func,
        onToolbarWillHide: PropTypes.func,
        onToolbarDidShow: PropTypes.func,
        onToolbarDidHide: PropTypes.func,
    };

    static defaultProps = {
        barHeight: 53,
        contentHeight: 250
    };

    constructor(props) {
        super(props);
        this.translateY = new Animated.Value(props.contentHeight)
        this.toolBarStatus = Status.ToolBarDown
        this.commonLgStatus = Status.CommonLgDown
        this.emojiStatus = Status.EmojiDown
        this.addStatus = Status.AddDown
    };

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._onKeyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._onKeyboardWillHide);
    };

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    runMainComponentDown = () => {
        const { contentHeight, barHeight, onToolbarWillHide } = this.props
        if (this.toolBarStatus === Status.ToolBarUp) {
            this.toolAnimatedRef.startAnimatedSpring(contentHeight)
            this.toolBarStatus = Status.ToolBarDown
            onToolbarWillHide && onToolbarWillHide()
        }
    }

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
    }

    _onPressLeft = () => {
        const { contentHeight, barHeight, onToolbarWillHide, onToolbarWillShow } = this.props
        if (this.commonLgStatus === Status.CommonLgDown) {
            // 常用语组件开启
            this.commonLgRef.startAnimatedSpring(0)
            this.toolAnimatedRef.startAnimatedSpring(0)
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
            this.commonLgStatus = Status.CommonLgUp
            this.toolBarStatus = Status.ToolBarUp
        } else {
            this.toolAnimatedRef.startAnimatedSpring(contentHeight)
            this.commonLgRef.startAnimatedSpring(contentHeight)
            onToolbarWillHide && onToolbarWillHide()
            this.commonLgStatus = Status.CommonLgDown
            this.toolBarStatus = Status.ToolBarDown
        }
        this.inputRef.blur()
    };

    _onPressEmoji = () => {
        const { contentHeight, barHeight, onToolbarWillHide, onToolbarWillShow } = this.props
        if (this.emojiStatus === Status.EmojiDown) {
            this.emojiContentRef.startAnimatedSpring(0)
            this.toolAnimatedRef.startAnimatedSpring(0)
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
            this.emojiStatus = Status.EmojiUp
            this.toolBarStatus = Status.ToolBarUp
        } else {
            this.emojiContentRef.startAnimatedSpring(contentHeight)
            this.toolAnimatedRef.startAnimatedSpring(contentHeight)
            onToolbarWillHide && onToolbarWillHide()
            this.emojiStatus = Status.EmojiDown
            this.toolBarStatus = Status.ToolBarDown
        }
        this.inputRef.blur()
    };

    _onPressAdd = () => {
        const { contentHeight, barHeight, onToolbarWillHide, onToolbarWillShow } = this.props
        if (this.addStatus === Status.AddDown) {
            this.addContentRef.startAnimatedSpring(0)
            this.toolAnimatedRef.startAnimatedSpring(0)
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
            this.addStatus = Status.AddUp
            this.toolBarStatus = Status.ToolBarUp
        } else {
            this.addContentRef.startAnimatedSpring(contentHeight)
            this.toolAnimatedRef.startAnimatedSpring(contentHeight)
            onToolbarWillHide && onToolbarWillHide()
            this.addStatus = Status.AddDown
            this.toolBarStatus = Status.ToolBarDown
        }
        this.inputRef.blur()
    };

    _onKeyboardWillShow = (info) => {
        const { contentHeight, onToolbarWillShow } = this.props
        if (info.duration != 0) {
            console.log('_onKeyboardWillShow', info)
            const endCoordinates = info.endCoordinates
            const toValue = contentHeight - endCoordinates.height
            this.toolAnimatedRef.startAnimatedTiming(toValue)
            this.runOtherComponentDown()
            onToolbarWillShow && onToolbarWillShow({ endCoordinates: { height: endCoordinates.height } })
        }
    };

    _onKeyboardWillHide = (info) => {
        console.log('_onKeyboardWillHide', info)
        const { contentHeight, onToolbarWillHide } = this.props
        if (this.commonLgStatus === Status.CommonLgDown &&
            this.emojiStatus === Status.EmojiDown &&
            this.addStatus === Status.AddDown) {
            this.toolAnimatedRef.startAnimatedTiming(contentHeight)
            onToolbarWillHide && onToolbarWillHide()
        }
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
    _captureInputRef = (v) => {
        this.inputRef = v
    };

    render() {
        const { barHeight, contentHeight } = this.props
        console.log('Toolbar')
        return (
            <ToolAnimated ref={this._captureRef} initTranslateY={contentHeight} style={[styles.container, {
                height: contentHeight + barHeight,
            }]}>
                <View style={[styles.barContainer, { height: barHeight }]}>
                    <TouchableOpacity style={styles.leftContainer} onPress={this._onPressLeft}>
                        <Text style={styles.leftText}>常用语</Text>
                    </TouchableOpacity>
                    <MessageInput ref={this._captureInputRef} />
                    <TouchableOpacity style={styles.leftContainer} onPress={this._onPressEmoji}>
                        <Text style={styles.leftText}>表情</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.leftContainer} onPress={this._onPressAdd}>
                        <Text style={styles.leftText}>加号</Text>
                    </TouchableOpacity>
                </View>
                <CommonLg ref={this._captureCommonLgRef} {...this.props} />
                <EmojiContent ref={this._captureEmojiContentRef}  {...this.props} />
                <AddContent ref={this._captureAddContentRef}  {...this.props} />
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

export default Toolbar