'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ToolAnimated from './ToolAnimated';
import EmotionsView from './EmojiText/EmotionsView'


class EmojiContent extends React.PureComponent {

    static propTypes = {
        barHeight: PropTypes.number,
        contentHeight: PropTypes.number,
        onEmojiSelected: PropTypes.func
    };

    static defaultProps = {

    };

    startAnimatedSpring = (toValue) => {
        this.toolAnimatedRef.startAnimatedSpring(toValue)
    }

    _captureRef = (v) => {
        this.toolAnimatedRef = v
    };

    render() {
        const { contentHeight, barHeight, onEmojiSelected } = this.props
        return (
            <ToolAnimated
                ref={this._captureRef}
                initTranslateY={contentHeight}
                barHeight={barHeight}
                style={[styles.container, { height: contentHeight, top: barHeight }]}
            >
                <EmotionsView style={styles.emotionsView} onSelected={onEmojiSelected} />
            </ToolAnimated>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 10,
    },
    emotionsView: {
        width: SCREEN_WIDTH - 10 * 2
    }
});

export default EmojiContent