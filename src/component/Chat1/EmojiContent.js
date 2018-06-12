'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ToolAnimated from './ToolAnimated';

class EmojiContent extends React.PureComponent {

    static propTypes = {
        barHeight: PropTypes.number,
        contentHeight: PropTypes.number,
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
        const { contentHeight, barHeight } = this.props
        return (
            <ToolAnimated ref={this._captureRef} initTranslateY={contentHeight} style={[styles.container, { height: contentHeight, top: barHeight }]}>
                <Text>我是表情组件，谢谢</Text>
            </ToolAnimated>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
    }
});

export default EmojiContent