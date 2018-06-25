'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MessageAvatar from './MessageAvatar'; // 头像
import MessageText from './MessageText'; // 
import MessageBubble from './MessageBubble';
import MessageImage from './MessageImage';
import MessageVoice from './MessageVoice';
import MessageTime from './MessageTime';
import MessageSystem from './MessageSystem';

class Message extends React.Component {

    static propTypes = {
        user: PropTypes.shape({ id: PropTypes.number, nick_name: PropTypes.string, avatar: PropTypes.string, }).isRequired,

    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        const from_user_id = props.info.item.from_user.id
        this.position = from_user_id === props.user.id ? 'right' : 'left' // 头像的位置
        console.log(props.info.item)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const info = nextProps.info
        const preInfo = this.props.info
        if (info.item.message_id != preInfo.item.message_id) {
            console.log('shouldComponentUpdate')
            return true
        } else {
            return false
        }
    }

    renderTypeMessage = () => {
        const { info } = this.props
        const { content, voice_duration, from_user, type, img_width, img_height } = info.item
        if (type === 1) { // 消息
            return (
                <MessageText content={content} />
            )
        } else if (type === 2) { // 图片
            return (
                <MessageImage uri={content} imageWidth={img_width} imageHeight={img_height} />
            )
        } else if (type === 3) { // 语音
            return (
                <MessageVoice uri={content} duration={voice_duration} />
            )
        } else {
            return null
        }
    }

    renderMessageSystem = () => {
        return (
            <MessageSystem />
        )
    };

    renderPositionLeft = () => {
        const { info } = this.props
        const { from_user } = info.item
        return (
            <View style={styles.containerLeft}>
                <MessageAvatar source={{ uri: from_user.avatar }} />
                <View style={styles.messageContentLeft}>
                    <MessageBubble />
                    {this.renderTypeMessage()}
                </View>
            </View>
        )
    };

    renderPositionRight = () => {
        const { info, user } = this.props
        const { content, from_user, type } = info.item
        console.log('renderPositionRight-------')
        return (
            <View style={styles.containerRight}>
                <View style={styles.messageContentRight}>
                    <MessageBubble />
                    {this.renderTypeMessage()}
                </View>
                <MessageAvatar source={{ uri: user.avatar }} />
            </View>
        )
    };



    render() {
        const { info, user, showMessageTime } = this.props
        const { content, from_user, type, create_at } = info.item
        console.log('Message-------')
        return (
            type === 5 ? <this.renderMessageSystem /> : (
                <View style={styles.container}>
                    {showMessageTime ? <MessageTime style={styles.messageTime} time={create_at} /> : null}
                    {this.position === 'left' ? <this.renderPositionLeft /> : <this.renderPositionRight />}
                </View>
            )
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
    },
    containerLeft: {
        marginVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    containerRight: {
        marginVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    messageContentLeft: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    messageContentRight: {
        marginRight: 10,
        justifyContent: 'center',
    },
    messageTime: {
        alignSelf: 'center',
        fontSize: FontSize(13),
        lineHeight: 26,
        color: "#a3a4a6"
    }
});

export default Message