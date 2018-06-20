'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types'
import SoundManager from '../../config/SoundManager';

class MessageVoice extends React.PureComponent {

    static propTypes = {
        uri: PropTypes.string,
        duration: PropTypes.number
    }

    static defaultProps = {

    }

    componentWillUnmount() {
        SoundManager.releaseSound()
    }

    _onPress = () => {
        const { uri, duration } = this.props
        SoundManager.startSound((error) => {
            console.log('startSound', error)
        })
    };

    render() {
        const { uri, duration } = this.props

        return (
            <TouchableWithoutFeedback onPress={this._onPress}>
                <View style={[styles.container, { width: 10 * duration }]}>
                    <Text style={styles.voiceText}>{`${parseInt(duration)}"`}</Text>
                    <Image style={styles.voiceImage} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        maxWidth: 220,
        minWidth: 80,
        backgroundColor: '#d8d3fe',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    voiceImage: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        marginRight: 10,
    },
    voiceText: {
        marginLeft: 10,
        color: '#fff'
    }
});

export default MessageVoice