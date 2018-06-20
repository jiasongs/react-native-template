'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MessageTime extends React.PureComponent {

    render() {
        const { style } = this.props
        return (
            <Text style={style}>{Moment().format('YYYY-MM-DD hh:mm')}</Text>
        );
    }
}

const styles = StyleSheet.create({

});

export default MessageTime