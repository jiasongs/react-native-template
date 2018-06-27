'use strict';
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types'
import Images from '../assets';

class Tutorial extends React.PureComponent {

    static propTypes = {
        visible: PropTypes.bool,
        source: PropTypes.array,
        onTutorialEnd: PropTypes.func
    }

    static defaultProps = {
        visible: true,
        source: [Images.icon_qq, Images.shuangse_bt_cannon]
    }

    constructor(props) {
        super(props);
        this.state = { selected: 0 }
    }

    _onPressFull = () => {
        const { source, onTutorialEnd } = this.props
        const { selected } = this.state
        if (source.length - 1 === selected) {
            onTutorialEnd && onTutorialEnd()
        } else {
            this.setState({ selected: selected + 1 })
        }
    }

    _onPressJump = () => {
        const { source, onTutorialEnd } = this.props
        onTutorialEnd && onTutorialEnd()

    }

    renderContent = () => {
        const { source } = this.props
        const { selected } = this.state
        const image = source[selected].image
        const style = source[selected].style
        console.log('renderContent')
        return (
            <Image
                key={`renderContent_${selected}`}
                resizeMode={'contain'}
                source={image}
                style={style}
            />
        )
    }

    render() {
        const { visible } = this.props
        return (
            <Modal
                animationType={'fade'}
                visible={visible}
                transparent={true}>
                <TouchableWithoutFeedback onPress={this._onPressFull}>
                    <View style={styles.mask} />
                </TouchableWithoutFeedback>
                {this.renderContent()}
                <TouchableOpacity style={styles.jumpOverContainer} onPress={this._onPressJump}>
                    <Image
                        style={styles.jumpOverImage}
                        source={Images.icon_tutorial_jump_over}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    mask: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    jumpOverContainer: {
        position: 'absolute',
        right: 20,
        top: 60,
        backgroundColor: 'red',
    },
    jumpOverImage: {
        width: 70,
        height: 30,
    }
});

export default Tutorial