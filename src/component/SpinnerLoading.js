'use strict';
import React, { PureComponent } from 'react'
import { Animated, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Spinner from 'react-native-spinkit'

// create a component
class SpinnerLoading extends PureComponent {
    static propTypes = {
        ...Spinner.propTypes,
        animated: PropTypes.bool,
        duration: PropTypes.number
    };
    static defaultProps = {
        size: 40,
        color: '#589017',
        type: 'Circle',
        animated: true,
        duration: 500,
        isVisible: false
    };
    startAnimated = () => {
        const { duration } = this.props;
        // console.log('startAnimated');
        Animated.timing(this.opacity, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true
        }).start((finsh) => {
            this.setState({ visible: false })
        })
    };

    constructor(props) {
        super(props);
        this.state = { visible: props.isVisible };
        this.opacity = new Animated.Value(1);
    }

    componentWillReceiveProps(nextProps) {
        const { isVisible, animated } = nextProps;
        const { visible } = this.state;
        if (isVisible != visible) {
            !isVisible && animated ? this.startAnimated() : this.setState({ visible: isVisible })
        }
    }

    render() {
        const { style, isVisible, ...others } = this.props;
        const { visible } = this.state;
        // console.log('render');
        return (
            visible ? (
                <Animated.View style={[styles.spinnerContainer, style, { opacity: this.opacity }]}>
                    <Spinner
                        style={styles.spinner}
                        isVisible={visible}
                        {...others}
                    />
                </Animated.View>
            ) : null
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    spinnerContainer: {
        zIndex: 20,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

//make this component available to the app
export default SpinnerLoading;
