'use strict';
import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';


class ToolAnimated extends React.PureComponent {

    static propTypes = {
        initTranslateY: PropTypes.number,
        barHeight: PropTypes.number
    };

    static defaultProps = {
        initTranslateY: 0
    };

    constructor(props) {
        super(props);
        this.translateY = new Animated.Value(props.initTranslateY)
        this.currentValue = -1
    }

    startAnimatedSpring = (toValue) => {
        if (this.currentValue != toValue) {
            Animated.spring(this.translateY, {
                toValue,
                friction: 9,
                useNativeDriver: true
            }).start(() => {

            })
            this.currentValue = toValue
        }
        console.log('startAnimatedSpring')
    };

    startAnimatedTiming = (toValue, duration = 195) => {
        if (this.currentValue != toValue) {
            Animated.timing(this.translateY, {
                toValue,
                duration,
                useNativeDriver: true
            }).start(() => {

            })
            this.currentValue = toValue
        }
        console.log('startAnimatedTiming')
    };

    render() {
        const { style, children, barHeight, initTranslateY } = this.props
        return (
            <Animated.View style={[styles.container, { height: barHeight + initTranslateY }, style, {
                transform: [
                    { translateY: this.translateY, }
                ]
            }]}>
                {children}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        left: 0,
        right: 0,
        bottom: 0,
    }
});

export default ToolAnimated