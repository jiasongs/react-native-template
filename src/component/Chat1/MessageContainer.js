'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import FlatListView from '../FlatListView';
import Message from './Message'

class MessageContainer extends React.PureComponent {

    static propTypes = {
        messages: PropTypes.array,
        user: PropTypes.shape({ id: PropTypes.number, nick_name: PropTypes.string, avatar: PropTypes.string, }).isRequired,
    };

    static defaultProps = {
        messages: []
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

    _onRefresh = (stopRefresh) => {

    };

    _onEndReached = (stopEndReached) => {

    };

    _renderItem = (info) => {
        const { user } = this.props
        return (
            <Message info={info} user={user} />
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
                keyboardShouldPersistTaps={'always'}
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

    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    }
});

export default MessageContainer