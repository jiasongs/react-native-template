'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import FlatListView from '../FlatListView';
import Message from './Message'

class MessageContainer extends React.PureComponent {

    static propTypes = {
        messages: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        user: PropTypes.shape({ id: PropTypes.number, nick_name: PropTypes.string, avatar: PropTypes.string, }).isRequired,
        millisecTime: PropTypes.number // 间隔多少秒显示时间
    };

    static defaultProps = {
        messages: [],
        millisecTime: 10
    };

    constructor(props) {
        super(props);
        this._lastMessageTime = 0
    };

    setNativeProps(props) {
        console.log(props)
        if (this._flatListRef) {
            this._flatListRef.setNativeProps(props);
        }
    };

    scrollToTop = () => {
        if (this._flatListRef) {
            this._flatListRef.scrollToOffset({ offset: 0, animated: true })
        }
    };

    minuteOffset = (created_at) => {
        const { millisecTime } = this.props
        const difference = created_at - this._lastMessageTime
        // console.log('difference', created_at, this._lastMessageTime, difference)
        if (difference >= millisecTime) {
            this._lastMessageTime = created_at
            return true
        } else {
            return false
        }
    }

    _onRefresh = (stopRefresh) => {

    };

    _onEndReached = (stopEndReached) => {

    };

    _renderItem = (info) => {
        const { user } = this.props
        const { create_at } = info.item
        const showMessageTime = this.minuteOffset(create_at)
        return (
            <Message
                info={info}
                user={user}
                showMessageTime={showMessageTime}
            />
        )
    };

    _keyExtractor = (item, index) => {
        return `chat_${item.message_id}`
    };

    _captureRef = (v) => {
        this._flatListRef = v
    };

    render() {
        const { messages, onScrollBeginDrag } = this.props
        console.log('MessageContainer')
        return (
            <FlatListView
                ref={this._captureRef}
                style={styles.flatListView}
                contentContainerStyle={styles.contentContainerStyle}
                keyboardDismissMode={'on-drag'}
                keyboardShouldPersistTaps={__IOS__ ? 'always' : 'handled'}
                inverted={true}
                initialRefresh={false}
                enableLoadMore={false}
                enableRefresh={false}
                data={messages}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onRefresh={this._onRefresh}
                onEndReached={this._onEndReached}
                onScrollBeginDrag={onScrollBeginDrag}
            />
        );
    }
}

const styles = StyleSheet.create({
    flatListView: {
        // flex: 1,
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    }
});

export default MessageContainer