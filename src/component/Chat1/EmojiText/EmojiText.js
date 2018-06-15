'use strict';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types'

class EmojiText extends React.PureComponent {

    static propTypes = {
        ...Text.propTypes,
        content: PropTypes.string
    };

    static defaultProps = {
        ...Text.defaultProps,
        content: ''
    };


    render() {
        const { content, ...others } = this.props
        console.log('EmojiText')
        return (
            <Text {...others}>
                {content}
            </Text>
        );
    }
}

const styles = StyleSheet.create({

});

export default EmojiText
