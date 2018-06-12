'use strict';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

class MessageBubble extends React.PureComponent {

    render() {
        return (
            <ImageBackground style={styles.imageBackground}>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
    }
});

export default MessageBubble