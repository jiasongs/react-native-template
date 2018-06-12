'use strict';
import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';


class ToolAnimated extends React.PureComponent {

    static propTypes = {
        initTranslateY: PropTypes.number
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
    };

    render() {
        const { style, children } = this.props
        return (
            <Animated.View style={[style, {
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

});

export default ToolAnimated