'use strict';
import React from 'react';
import { View, Text, StyleSheet, requireNativeComponent, NativeModules } from 'react-native';
import PropTypes from 'prop-types'

const LivePlayerManager = NativeModules.LivePlayerManager
const LivePlayer = requireNativeComponent('LivePlayer', LivePlayerComponent)

class LivePlayerComponent extends React.PureComponent {

    static propTypes = {
        source: PropTypes.shape({ uri: PropTypes.string }).isRequired,
        onLiveLoadStart: PropTypes.func
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.isPlaying = true
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        LivePlayerManager.releasePlayer()
        console.log('componentWillUnmount')
    }

    // 播放或者暂停
    pauseResume = () => {
        if (this.isPlaying) {
            LivePlayerManager.pause()
        } else {
            LivePlayerManager.resume()
        }
        this.isPlaying = !this.isPlaying
    }

    replay = () => {
        LivePlayerManager.replay()
        this.isPlaying = true
    }

    _onLiveLoadStart = () => {
        console.log('_onLiveLoadStart')
        LivePlayerManager.start()
    }

    render() {
        const { source, style } = this.props
        console.log('LivePlayer')
        return (
            <LivePlayer
                style={style}
                source={source}
                onLiveLoadStart={this._onLiveLoadStart}
            />
        );
    }
}

const styles = StyleSheet.create({

});

export default LivePlayerComponent