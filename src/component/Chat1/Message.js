'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MessageAvatar from './MessageAvatar'; // 头像
import MessageText from './MessageText'; // 
import MessageBubble from './MessageBubble';

class Message extends React.PureComponent {

    static propTypes = {
        info: PropTypes.object,
        user: PropTypes.shape({ id: PropTypes.number, nick_name: PropTypes.string, avatar: PropTypes.string, }).isRequired,
    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        const from_user_id = props.info.item.from_user.id
        this.position = from_user_id === props.user.id ? 'right' : 'left' // 头像的位置
    }

    renderPositionLeft = () => {
        const { info, user } = this.props
        const { content, from_user } = info.item
        return (
            <View style={styles.containerLeft}>
                <MessageAvatar source={{ uri: from_user.avatar }} />
                <View style={styles.messageContentLeft}>
                    <MessageBubble />
                    <MessageText content={content} />
                </View>
            </View>
        )
    };

    renderPositionRight = () => {
        const { info, user } = this.props
        const { content, from_user } = info.item
        return (
            <View style={styles.containerRight}>
                <View style={styles.messageContentRight}>
                    <MessageBubble />
                    <MessageText content={content} />
                </View>
                <MessageAvatar source={{ uri: user.avatar }} />
            </View>
        )
    };

    render() {

        return (
            this.position === 'left' ? this.renderPositionLeft() : this.renderPositionRight()
        )
    }
}

const styles = StyleSheet.create({
    containerLeft: {
        marginVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    containerRight: {
        marginVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    messageContentLeft: {
        padding: 10,
        marginLeft: 10,
        justifyContent: 'center',
    },
    messageContentRight: {
        padding: 10,
        marginRight: 10,
        justifyContent: 'center',
    },
});

export default Message