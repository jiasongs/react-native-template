'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, PanResponder } from 'react-native';
import RecordManager from '../../config/RecordManager';

class Recording extends React.PureComponent {

    constructor(props) {
        super(props);
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._onStartShouldSetPanResponder,
            onPanResponderMove: this._onPanResponderMove,
            onPanResponderRelease: this._onPanResponderRelease,
            onPanResponderTerminate: this._onPanResponderTerminate,
        });
        this.state = { isRecording: false, moveToCancel: false, currentTime: 0 }
        this._panLocationMoveXY = { x: 0, y: 0 }
        this._cancelImageLayout = {}
        this._contentLayout = {}
        // 配置录音
        RecordManager.prepareRecording(this.recordOnProgress, this.recordOnFinished)
    }

    setPanLocationMoveXY = (x, y) => {
        this._panLocationMoveXY = { x, y }
    }

    get getPanContainContent() {
        return (
            this._panLocationMoveXY.x > this._contentLayout.x &&
            this._panLocationMoveXY.x < (this._contentLayout.x + this._contentLayout.width) &&
            this._panLocationMoveXY.y > this._contentLayout.y &&
            this._panLocationMoveXY.y < (this._contentLayout.y + this._contentLayout.height)
        )
    }

    get getPanContainCancel() {
        return (
            this._panLocationMoveXY.x > this._cancelImageLayout.x &&
            this._panLocationMoveXY.x < (this._cancelImageLayout.x + this._cancelImageLayout.width) &&
            this._panLocationMoveXY.y > this._cancelImageLayout.y &&
            this._panLocationMoveXY.y < (this._cancelImageLayout.y + this._cancelImageLayout.height)
        )
    }

    get formatCurrentTime() {
        const { currentTime } = this.state
        let m = parseInt(currentTime / 60)
        let s = parseInt(currentTime % 60)
        return `${m}:${s}`.replace(/\b(\d)\b/g, "0$1")
    }

    recordOnProgress = (data) => {
        console.log('recordOnProgress', data)
        this.setState({ currentTime: data.currentTime })
    }

    recordOnFinished = () => {
        console.log('recordOnFinished')
    }

    cancelRecording = () => {
        RecordManager.stopRecord()
    }

    startRecording = () => {
        RecordManager.startRecord()
    }

    _onStartShouldSetPanResponder = (event) => {
        // 是否响应手势
        this.setPanLocationMoveXY(event.nativeEvent.locationX, event.nativeEvent.locationY)
        if (!this.state.isRecording) {
            if (this.getPanContainContent) {
                // 开启录音
                this.startRecording()
                this.setState({ isRecording: true })
                console.log('开启录音')
                return true;
            }
        }
        return false
    };

    _onPanResponderMove = (event) => {
        // 手势移动
        this.setPanLocationMoveXY(event.nativeEvent.locationX, event.nativeEvent.locationY)
        if (this.state.isRecording) {
            if (this.getPanContainCancel) {
                // 录音状态下，滑动到垃圾桶
                console.log('录音状态下，滑动到垃圾桶')
                if (!this.state.moveToCancel) {
                    this.setState({ moveToCancel: true })
                }
            } else {
                // 录音状态下，滑动到垃圾桶
                console.log('录音状态下，没有滑到垃圾桶')
                if (this.state.moveToCancel) {
                    this.setState({ moveToCancel: false })
                }
            }
        }
    };

    _onPanResponderRelease = (event) => {
        const { onRecording } = this.props
        const { currentTime } = this.state
        //手松开
        this.setPanLocationMoveXY(event.nativeEvent.locationX, event.nativeEvent.locationY)
        if (this.state.isRecording) {
            if (this.getPanContainCancel) {
                // 在垃圾桶松开手，取消发送
                console.log('在垃圾桶松开手，取消发送')

            } else {
                // 不在垃圾桶松开手，发送
                console.log('不在垃圾桶松开手，发送')
                onRecording && onRecording({ uri: RecordManager.ceshiAudioPath, duration: currentTime })
            }
            if (this.state.moveToCancel) {
                this.setState({ isRecording: false, moveToCancel: false, currentTime: 0 })
            } else {
                this.setState({ isRecording: false, currentTime: 0 })
            }
            this.cancelRecording()
        }
    };

    _onPanResponderTerminate = (event) => {
        //手势中断
        console.log('_onPanResponderTerminate', event.nativeEvent)
    };

    _onLayout = (event) => {
        console.log(event.nativeEvent)
        this._contentLayout = event.nativeEvent.layout
    };

    _onLayoutCancel = (event) => {
        console.log(event.nativeEvent)
        this._cancelImageLayout = event.nativeEvent.layout
    };

    render() {
        const { isRecording, moveToCancel, currentTime } = this.state
        let recordText = ''

        if (isRecording) {
            if (moveToCancel) {
                recordText = '松开取消发送'
            } else {
                recordText = '松开发送'
            }
        } else {
            recordText = '长按录音'
        }
        return (
            <View style={styles.recordContainer} {...this._panResponder.panHandlers}>
                <View
                    style={styles.contentContainer}
                    pointerEvents={'none'}
                    onLayout={this._onLayout}>
                    <Text>{isRecording ? this.formatCurrentTime : null}</Text>
                    <Image style={styles.recordImage} />
                    <Text style={styles.recordText}>{recordText}</Text>
                </View>
                {isRecording ? (
                    <Image onLayout={this._onLayoutCancel} style={[styles.cancelImage, {
                        transform: [{
                            scale: moveToCancel ? 1.5 : 1.0,
                        }]
                    }]}
                    />
                ) : null}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    recordContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    recordImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'red',
    },
    recordText: {
        marginTop: 10,
        fontSize: FontSize(12),
    },
    contentContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 130,
        width: 100,
        backgroundColor: 'green',
    },
    cancelImage: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        top: 50,
        right: 20,
        backgroundColor: 'red',
    }
});

export default Recording