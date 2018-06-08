//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types'
import { sec_to_time } from '../../util/Tool'
import Slider from './Slider';
// create a component
class PlayerTools extends React.PureComponent {

    static propTypes = {
        defaultPaused: PropTypes.bool,
        defaultEnlarge: PropTypes.bool,
    };

    static defaultProps = {
        minimumTrackTintColor: '#357ede',
        maximumTrackTintColor: '#FFFFFF',
        defaultPaused: false,
        defaultEnlarge: false
    };

    constructor(props) {
        super(props)
        this.state = { isPaused: props.defaultPaused, isEnlarge: props.defaultEnlarge }
        this.opacity = new Animated.Value(props.defaultPaused ? 1 : 0)
        this.isHidden = !props.defaultPaused // 是否隐藏，默认隐藏
    };

    startFadeAnimated = () => {
        let toValue = this.isHidden ? 1 : 0
        this.isHidden = !this.isHidden
        Animated.timing(this.opacity, {
            toValue: toValue,
            duration: 400,
        }).start()
    };

    changePaused = (isPaused) => {
        this.setState({ isPaused })
    };

    changeEnlarge = (isEnlarge) => {
        this.setState({ isEnlarge })
    };

    _onPressLeft = () => {
        const { onPressLeft } = this.props
        if (this.isHidden) {
            this.startFadeAnimated()
            return;
        }
        if (this.state.isPaused) {
            this.startFadeAnimated()
        }
        this.setState({ isPaused: !this.state.isPaused })
        onPressLeft && onPressLeft()
    };

    _onPressRight = () => {
        const { onPressRight } = this.props
        if (this.isHidden) {
            this.startFadeAnimated()
            return;
        }
        this.setState({ isEnlarge: !this.state.isEnlarge })
        onPressRight && onPressRight()
    };

    _onPressfull = () => {
        this.startFadeAnimated()
    };

    _onPressBack = () => {
        const { onPressRight, onPressBack } = this.props
        if (this.isHidden) {
            this.startFadeAnimated()
            return;
        }
        if (this.state.isEnlarge) {
            this.setState({ isEnlarge: !this.state.isEnlarge })
            onPressRight && onPressRight()
        } else {
            onPressBack && onPressBack()
        }
    };

    render() {
        const { children, style, currentDuration, totalDuration,
            debugTouchArea, sliderStyle, step, value,
            minimumValue, maximumValue,
            onSlidingStart, onSlidingComplete
        } = this.props
        return (
            <TouchableWithoutFeedback onPress={this._onPressfull}>
                <Animated.View style={[styles.container, style, { opacity: this.opacity }]}>
                    <Text style={{ color: '#FFFFFF', marginLeft: 20, marginTop: 30 }}
                        onPress={this._onPressBack}>
                        返回
                    </Text>
                    <CenterView isPaused={this.state.isPaused} onPress={this._onPressLeft} />
                    <View style={styles.bottomContainer}>
                        <LeftView isPaused={this.state.isPaused} onPress={this._onPressLeft} />
                        <Text style={styles.currentDuration} onPress={this._onPress}>
                            {sec_to_time(currentDuration)}
                        </Text>
                        <Slider
                            debugTouchArea={debugTouchArea}
                            style={sliderStyle}
                            step={step}
                            value={value}
                            minimumValue={minimumValue}
                            maximumValue={maximumValue}
                            onSlidingStart={onSlidingStart}
                            onSlidingComplete={onSlidingComplete}
                        />
                        <Text style={styles.totalDuration} onPress={this._onPress}>
                            {sec_to_time(totalDuration)}
                        </Text>
                        <RightView isEnlarge={this.state.isEnlarge} onPress={this._onPressRight} />
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

class CenterView extends React.PureComponent {

    render() {
        const { isPaused, onPress } = this.props
        return (
            <View style={styles.centerContainer}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <Image
                        style={styles.centerImage}
                        source={isPaused ? Images.icon_center_play : Images.icon_center_pause}
                    />
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
class LeftView extends React.PureComponent {

    render() {
        const { isPaused, onPress } = this.props
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <Image
                    style={styles.bottomLeftImage}
                    source={isPaused ? Images.icon_bottom_play : Images.icon_bottom_pause}
                />
            </TouchableWithoutFeedback>
        )
    }
}

class RightView extends React.PureComponent {

    render() {
        const { isEnlarge, onPress } = this.props
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <Image
                    style={styles.bottomLeftImage}
                    source={isEnlarge ? Images.icon_micrify : Images.icon_enlarge}
                />
            </TouchableWithoutFeedback>
        )
    }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        opacity: 1,
    },
    currentDuration: {
        color: '#FFFFFF',
        fontSize: FontSize(11),
        marginRight: ScaleSize(10)
    },
    totalDuration: {
        color: '#FFFFFF',
        fontSize: FontSize(11),
        marginLeft: ScaleSize(10),
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerImage: {
        width: ScaleSize(80),
        height: ScaleSize(80)
    },
    bottomLeftImage: {
        width: ScaleSize(30),
        height: ScaleSize(30),
        marginLeft: ScaleSize(15),
        marginRight: ScaleSize(15),
    }
});

//make this component available to the app
export default PlayerTools;
