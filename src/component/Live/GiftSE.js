'use strict';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Animated } from 'react-native';

class GiftSE extends React.PureComponent {

    static propTypes = {

    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.translateX = new Animated.Value(-200)
        this.translateY = new Animated.Value(0)
        this.opacity = new Animated.Value(1)
    }

    componentDidMount() {
        this.startAnimation()
        setTimeout(() => {
            this.startAnimation2()
        }, 3000);
    }

    componentWillUnmount() {
        this.translateX.stopAnimation()
        this.translateY.stopAnimation()
        this.opacity.stopAnimation()
       
    }

    startAnimation = () => {
        Animated.parallel([
            Animated.spring(this.translateX, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true
            }),
        ]).start(() => {

        })
    }

    startAnimation2 = () => {
        Animated.parallel([
            Animated.timing(this.translateY, {
                toValue: -120,
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(this.opacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start(() => {

        })
    }

    render() {
        return (
            <Animated.View style={[styles.container, {
                transform: [
                    { translateX: this.translateX },
                    { translateY: this.translateY, }
                ],
                opacity: this.opacity,
            }]}>
                <Image />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        width: 200,
        height: 50,
        backgroundColor: 'red',
    }
});

export default GiftSE