'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FlatListView from '../FlatListView';

class ChatGroup extends React.PureComponent {

    static propTypes = {

    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);

    }

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
        const { create_at } = info.item
        return (
            <Message
                info={info}
                user={user}
            />
        )
    };

    _keyExtractor = (item, index) => {
        return `chat_${index}`
    };

    _captureRef = (v) => {
        this._flatListRef = v
    };

    render() {
        const { messages } = this.props
        return (
            <FlatListView
                ref={this._captureRef}
                style={styles.flatListView}
                contentContainerStyle={styles.contentContainerStyle}
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
            />
        );
    }
}

class Message extends React.Component {

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     const info = nextProps.info
    //     const preInfo = this.props.info
    //     if (info.item.message_id != preInfo.item.message_id) {
    //         console.log('shouldComponentUpdate')
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    render() {
        return (
            <View style={styles.messageContainer}>
                <Image style={styles.messageImage1} />
                <Image style={styles.messageImage2} />
                <Text style={styles.messageName}>路人甲：</Text>
                <Text style={styles.messageContent}>主播有点皮了</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    flatListView: {
        // flex: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        padding: 5,
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageName: {
        color: '#2E77E5',
        fontSize: FontSize(14),
    },
    messageImage1: {

    },
    messageImage2: {

    },
    messageContent: {
        color: '#151515',
        fontSize: FontSize(14),
    }
});

export default ChatGroup