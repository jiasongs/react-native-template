'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MessageText extends React.PureComponent {

    render() {
        const { content } = this.props
        return (
            <Text style={styles.messageText}>{content}</Text>
        );
    }
}

const styles = StyleSheet.create({
    messageText: {
        maxWidth: 230,
        fontSize: FontSize(13),
        lineHeight: 26,
        color: "#3d434c"
    }
});

export default MessageText