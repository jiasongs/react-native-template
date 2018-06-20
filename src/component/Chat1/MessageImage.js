'use strict';
import React from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types'

class MessageImage extends React.PureComponent {

    static propTypes = {
        uri: PropTypes.string,
        defaultWidth: PropTypes.number,
        imageWidth: PropTypes.number,
        imageHeight: PropTypes.number,
    };

    static defaultProps = {
        defaultWidth: SCREEN_WIDTH
    };

    constructor(props) {
        super(props);
        this.state = { visible: false }
    }

    _onPress = () => {
        if (this.state.visible) {
            this.setState({ visible: false })
        } else {
            this.setState({ visible: true })
        }
    }

    renderImage = () => {
        const { uri } = this.props
        return (
            <Image resizeMode={'cover'} style={styles.image} source={{ uri }} />
        )
    }

    render() {
        const { uri, defaultWidth, imageWidth, imageHeight } = this.props
        const { visible } = this.state
        return (
            <TouchableOpacity onPress={this._onPress}>
                <this.renderImage />
                {visible ? (
                    <Modal visible={visible} animationType={'fade'} transparent={true}>
                        <TouchableWithoutFeedback onPress={this._onPress}>
                            <View style={styles.modalContainer}>
                                <Image
                                    resizeMode={'cover'}
                                    style={[styles.modalImage, {
                                        width: defaultWidth,
                                        height: defaultWidth * (imageHeight / imageWidth)
                                    }]}
                                    source={{ uri }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                ) : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 130,
        height: 170,
        // backgroundColor: 'red',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: SCREEN_WIDTH,
        height: 300
    }
});

export default MessageImage