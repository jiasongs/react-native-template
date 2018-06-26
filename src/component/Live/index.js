'use strict';
import React from 'react';
import { View, Text, StyleSheet, ViewPropTypes, Dimensions, } from 'react-native';
import PropTypes from 'prop-types'
import Orientation from 'react-native-orientation';
import LivePlayer from './LivePlayer'
import PlayerTools from './PlayerTools'
import ToolContainer from './ToolContainer';
import Content from './Content';
import OCBarrage from './OCBarrage';

class Index extends React.PureComponent {

    static propTypes = {
        source: PropTypes.shape({ uri: PropTypes.string }).isRequired,
        onLiveLoadStart: PropTypes.func
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.state = { playerStyle: props.playerStyle }
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange)
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange)
    }

    _orientationDidChange = (orientation) => {
        console.log(orientation)
        if (orientation === 'LANDSCAPE') {
            this.changeLandscapeLiveStyle(true)
            // this._toolsRef.changeEnlarge(true)
        } else {
            this.setState({ playerStyle: this.props.playerStyle })
            // this._toolsRef.changeEnlarge(false)
        }
    }

    changeLandscapeLiveStyle = (isLand = false) => {
        setTimeout(() => {
            const { width, height } = Dimensions.get('window');
            // 安卓减去状态栏的高度
            this.setState({ playerStyle: { width: width, height: __IOS__ ? height + 20 : height - Theme.statusBarHeight } })
            console.log(width, height)
        }, 200);
    }

    _onPressPlay = () => {
        this.livePlayer.pauseResume()
    }

    _onPressVideo = () => {
        alert('播放视频')
    }

    _onPressRefresh = () => {
        this.livePlayer.replay()
    }

    _onPressScale = () => {
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'PORTRAIT') {
                Orientation.lockToLandscapeLeft()
                this.changeLandscapeLiveStyle()
            } else {
                Orientation.lockToPortrait()
                this.setState({ playerStyle: this.props.playerStyle })
            }
        });
    }

    _captureRef = (v) => {
        this.livePlayer = v
    }

    render() {
        const { style, source, messages, onPressRecharge, onPressGift } = this.props
        const { playerStyle } = this.state
        return (
            <View style={style}>
                <View style={playerStyle}>
                    <LivePlayer
                        ref={this._captureRef}
                        style={playerStyle}
                        source={source}
                    />
                    <OCBarrage style={styles.ocbarrage} />
                    <PlayerTools
                        style={styles.playerTools}
                        onPressPlay={this._onPressPlay}
                        onPressVideo={this._onPressVideo}
                        onPressRefresh={this._onPressRefresh}
                        onPressScale={this._onPressScale}
                    />
                </View>
                <Content messages={messages} />
                <ToolContainer
                    onPressRecharge={onPressRecharge}
                    onPressGift={onPressGift}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    playerTools: {
        // backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    ocbarrage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
        // backgroundColor: 'red',
    }
});

export default Index