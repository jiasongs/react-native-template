'use strict';
//import liraries
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, StyleSheet, } from 'react-native'

// create a component
export default class StickyHeader extends PureComponent {
    static propTypes = {
        stickyHeaderY: PropTypes.number,
        stickyScrollY: PropTypes.any
    };
    static defaultProps = {
        stickyHeaderY: -1,
        stickyScrollY: new Animated.Value(0)
    };
    _onLayout = (event) => {
        this.setState({
            stickyLayoutY: event.nativeEvent.layout.y,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            stickyLayoutY: 0,
        };
    }

    componentDidMount() {

    }

    render() {
        const { stickyHeaderY, stickyScrollY, children, style } = this.props;
        const { stickyLayoutY } = this.state;
        let y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY;
        const translateY = stickyScrollY.interpolate({
            inputRange: [-1, 0, y, y + 1],
            outputRange: [0, 0, 0, 1],
        });
        return (
            <Animated.View
                onLayout={this._onLayout}
                style={[
                    style,
                    styles.container,
                    { transform: [{ translateY }] }
                ]}
            >
                {children}
            </Animated.View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        zIndex: 100
    },
});


//make this component available to the app

