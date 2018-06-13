'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';


class ToolBarSend extends React.PureComponent {

    static propTypes = {

    }

    static defaultProps = {

    }
    constructor(props) {
        super(props);
        this.state = { isVisible: false }
    }

    changeVisible = (isVisible) => {
        if (this.state.isVisible != isVisible) {
            this.setState({ isVisible })
        }
    }

    render() {
        const { onPress } = this.props
        return (
            this.state.isVisible ? (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.leftContainer} onPress={onPress}>
                        <Text style={styles.leftText}>发送</Text>
                    </TouchableOpacity>
                </View>
            ) : null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        backgroundColor: '#43a4fe',
        borderRadius: 3,
        backgroundColor: "#43a4fe",
        overflow: 'hidden',
    },
    leftContainer: {
        paddingHorizontal: 5,
    },
    leftText: {
        fontSize: FontSize(13),
        lineHeight: 26,
        color: "#ffffff"
    }
});

export default ToolBarSend