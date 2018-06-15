'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

class Avatar extends React.PureComponent {

    static propTypes = {
        ...Image.propTypes
    };

    static defaultProps = {
        ...Image.defaultProps
    };

    render() {
        const { source } = this.props
        return (
            <Image style={styles.avatarImage} source={source} />
        );
    }
}

const styles = StyleSheet.create({
    avatarImage: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        // backgroundColor: '#cdcdcd',
    }
});

export default Avatar