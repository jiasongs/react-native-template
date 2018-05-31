//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from 'react-native-slider'
// create a component
class CusSlider extends React.PureComponent {
    static propTypes = {
        ...Slider.propTypes
    }
    static defaultProps = {
        ...Slider.defaultProps,
        minimumTrackTintColor: '#357ede',
        maximumTrackTintColor: '#FFFFFF',
    }
    _onSlidingStart = (params) => {
        console.log('_onSlidingStart', params)
        const { onSlidingStart } = this.props
        onSlidingStart && onSlidingStart(params)
    };
    _onSlidingComplete = (params) => {
        console.log('_onSlidingComplete', params)
        const { onSlidingComplete } = this.props
        onSlidingComplete && onSlidingComplete(params)

    };
    _onValueChange = (params) => {
        console.log('_onValueChange', params)
        const { onValueChange } = this.props
        onValueChange && onValueChange(params)
    };
    render() {
        const { onValueChange, onSlidingStart, onSlidingComplete, value, ...others } = this.props
        return (
            <Slider
                value={value}
                thumbStyle={styles.thumbStyle}
                trackStyle={styles.trackStyle}
                animationConfig={{ useNativeDriver: true }}
                {...others}
                onValueChange={this._onValueChange}
                onSlidingStart={this._onSlidingStart}
                onSlidingComplete={this._onSlidingComplete}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    thumbStyle: {
        backgroundColor: '#FFFFFF',
        width: 10,
        height: 10
    },
    trackStyle: {
        height: 3,

    }
});

//make this component available to the app
export default CusSlider;
