'use strict';
import React, { Component } from 'react';
import {
    AlertIOS,
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import PropTypes from 'prop-types'
import { isEmpty } from '../../util/Tool';
import Video from 'react-native-video';

const PlayStatus = {
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    END: 'END',
}
class VideoPlayer extends React.PureComponent {

    static propTypes = {
        ...Video.propTypes,
        defaultPaused: PropTypes.bool
    };

    static defaultProps = {
        ...Video.defaultProps,
        repeat: false,
        playInBackground: false,
        playWhenInactive: false,
        ignoreSilentSwitch: 'ignore',
        progressUpdateInterval: 250.00,
        resizeMode: 'contain',
        defaultPaused: false
    };

    constructor(props) {
        super(props);
        this.state = {
            rate: 1, // 速率
            volume: 1, // 声音
            muted: false, // 静音与否
            paused: props.defaultPaused, // 暂停与否
        }
        this.playStatus = PlayStatus.PLAYING
        this.totalDuration = 0 // 总的播放量
        this.currentDuration = 0 // 当前播放量
    };


    setPresentFullscreenPlayer = () => {
        if (this._videoRef) {
            if (__ANDROID__) {
                // number = number + 3
            }
            this._videoRef.presentFullscreenPlayer()

        }
    };
    // 使用这种方式更易于管理状态
    // 自动管理是否播放，使用Props的话，要在父组件管理太多的状态,引起不必要的渲染
    setPause = (paused) => {
        console.log('paused')
        if (this.playStatus == PlayStatus.END) {
            this.setSeek(0)
            this.playStatus == PlayStatus.END
        }
        let pausedTemp;
        if (!isEmpty(paused)) {
            pausedTemp = paused
        } else {
            pausedTemp = !this.state.paused
        }
        if (pausedTemp != this.state.paused) {
            this.setState({ paused: pausedTemp })
            this.playStatus = pausedTemp ? PlayStatus.PAUSED : PlayStatus.PLAYING
        }
    };
    setMuted = () => {
        // 静音与否
        this.setState((preState) => {
            muted: !preState.muted
        })
    };
    setSeek = (number) => {
        if (this._videoRef) {
            this._videoRef.seek(number)
            console.log(number)
        }
    };

    _onLoad = (data) => {
        // console.log('_onLoad', data.duration)
        this.totalDuration = data.duration
    };

    _onProgress = (data) => {
        const { onProgress } = this.props
        this.currentDuration = data.currentTime
        onProgress && onProgress(this.currentDuration)
    };

    _onBuffer = (data) => {
        console.log('_onBuffer', data)
    };

    _onEnd = (data) => {
        const { repeat, onEnd } = this.props
        if (repeat) {
            // 循环播放,不处理
        } else {
            // 播放结束
            this.playStatus = PlayStatus.END
            // 暂停
            this.setState({ paused: true })
        }
        onEnd && onEnd(data)
    };

    _captureRef = (v) => {
        this._videoRef = v
    };

    render() {
        const { onLoad, onBuffer, onProgress, onEnd, ...others } = this.props
        return (
            <Video
                ref={this._captureRef}
                onLoad={this._onLoad}
                onBuffer={this._onBuffer}
                onProgress={this._onProgress}
                onEnd={this._onEnd}
                {...others}
                // 管理自己的状态
                rate={this.state.rate}
                paused={this.state.paused}
                volume={this.state.volume}
                muted={this.state.muted}
            />
        )
    }
}

export default VideoPlayer
