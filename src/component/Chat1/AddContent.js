'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import ToolAnimated from './ToolAnimated';
import Recording from './Recording'
import SyanImagePicker from 'react-native-syan-image-picker';
import ImagePicker from 'react-native-image-picker';

class AddContent extends React.PureComponent {

    static propTypes = {
        barHeight: PropTypes.number,
        contentHeight: PropTypes.number,
        onPressAlbum: PropTypes.func,
    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.itemsData = [
            { type: 1, title: '拍摄', imageSource: '' },
            { type: 2, title: '相册', imageSource: '' },
            { type: 3, title: '语音', imageSource: '' },
            { type: 4, title: '发送简历', imageSource: '' },
            // { type: 4, title: '发送简历', imageSource: '' },
        ]
        this.state = { recording: true }
    }

    startAnimatedSpring = (toValue) => {
        this.toolAnimatedRef.startAnimatedSpring(toValue)
    }

    _openSyanImagePicker = async () => {
        const { onPressAlbum } = this.props
        let reslut = await SyanImagePicker.asyncShowImagePicker({})
        let array = []
        reslut.forEach(item => {
            array.push({
                localPath: item.uri,
                size: item.size,
                width: item.width,
                height: item.height
            })
        })
        onPressAlbum && onPressAlbum(array)
    }

    _openImagePicker = () => {
        const { onPressAlbum } = this.props
        const option = { noData: true }
        ImagePicker.launchCamera(option, (response) => {
            console.log('ImagePicker', response)
            let array = []
            array.push({
                localPath: response.uri,
                size: response.fileSize,
                width: response.width,
                height: response.height
            })
            onPressAlbum && onPressAlbum(array)
        });

    }

    _openRecording = () => {
        if (this.state.recording) {
            this.setState({ recording: false })
        } else {
            this.setState({ recording: true })
        }
    }

    _onPress = (index) => {
        const { onPressResume } = this.props
        switch (index) {
            case 1:
                // 拍摄
                this._openImagePicker()
                break;
            case 2:
                // 相册
                this._openSyanImagePicker()
                break;
            case 3:
                // 语音
                this._openRecording()
                break;
            case 4:
                // 发送简历
                onPressResume && onPressResume()
                break;
            default:
                break;
        }
    }

    renderItems = () => {
        return (
            this.itemsData.map((item, index) => {
                return (
                    <View style={styles.itemContainer} key={`${index}`}>
                        <TouchableOpacity onPress={() => this._onPress(item.type)}>
                            <Image style={styles.itemImage} />
                        </TouchableOpacity>
                        <Text style={styles.itemTitleText}>{item.title}</Text>
                    </View>
                )
            })
        )
    }

    _captureRef = (v) => {
        this.toolAnimatedRef = v
    };

    render() {
        const { contentHeight, barHeight, onRecording } = this.props
        const { recording } = this.state
        return (
            <ToolAnimated
                ref={this._captureRef}
                initTranslateY={contentHeight}
                barHeight={barHeight}
                style={[styles.container, { height: contentHeight, top: barHeight }]}>
                <this.renderItems />
                {recording ? <Recording onRecording={onRecording} /> : null}
            </ToolAnimated>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ebeced',
        backgroundColor: '#ffff',
        justifyContent: 'space-around',
        flexDirection: 'row',
        // flexWrap: 'wrap',
        left: 0,
        right: 0,
        padding: 20,
    },
    itemContainer: {
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    itemImage: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
    },
    itemTitleText: {
        fontSize: FontSize(12),
        marginTop: 8,
    },

});

export default AddContent