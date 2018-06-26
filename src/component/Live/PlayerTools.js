'use strict';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { Theme } from 'teaset';

class PlayerTools extends React.PureComponent {

    constructor(props) {
        super(props);
        this.isHidden = true
        this.opacity = new Animated.Value(0)
    }

    startFadeAnimated = () => {
        let toValue = this.isHidden ? 1 : 0
        this.isHidden = !this.isHidden
        Animated.timing(this.opacity, {
            toValue: toValue,
            duration: 400,
        }).start()
    };

    _onPressfull = () => {
        this.startFadeAnimated()
    };

    _onPressPlay = () => {
        const { onPressPlay } = this.props
        onPressPlay && onPressPlay()
    }

    _onPressVideo = () => {
        const { onPressVideo } = this.props
        onPressVideo && onPressVideo()
    }

    _onPressRefresh = () => {
        const { onPressRefresh } = this.props
        onPressRefresh && onPressRefresh()
    }

    _onPressScale = () => {
        const { onPressScale } = this.props
        onPressScale && onPressScale()
    }

    render() {
        const { style } = this.props
        return (
            <TouchableWithoutFeedback onPress={this._onPressfull}>
                <Animated.View style={[styles.container, style, { opacity: this.opacity }]}>
                    <NavTools />
                    <BottomTools
                        onPress={this._onPressScale}
                    />
                    <Tool
                        type={'播放'}
                        style={styles.playTool}
                        onPress={this._onPressPlay}
                    />
                    <Tool type={'视频'}
                        style={styles.videoTool}
                        onPress={this._onPressVideo}
                    />
                    <Tool type={'刷新'}
                        style={styles.refreshTool}
                        onPress={this._onPressRefresh}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

class NavTools extends React.PureComponent {

    render() {
        return (
            <View style={styles.navContainer}>
                <View style={styles.statusBar} />
                <View style={styles.navContent}>
                    <TouchableOpacity style={styles.backTouch}>
                        <Image style={styles.backImage} />
                    </TouchableOpacity>
                    <Text style={styles.navTitle}> 综合直播-刮刮乐 </Text>
                    <TouchableOpacity style={styles.rightTouch}>
                        <Image style={styles.rightImage} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class Tool extends React.PureComponent {

    render() {
        const { style, source, onPress } = this.props
        return (
            <TouchableOpacity style={style} onPress={onPress} >
                <Image style={styles.toolImage} source={source} />
            </TouchableOpacity>
        );
    }
}

class BottomTools extends React.PureComponent {

    render() {
        const { onPress } = this.props
        return (
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomRightText}>观看人数：1.9万</Text>
                <TouchableOpacity style={styles.scaleTouch} onPress={onPress}>
                    <Image style={styles.scaleImage} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between'
    },
    navContainer: {
        height: Theme.statusBarHeight + Theme.themes.default.navBarContentHeight,
        // backgroundColor: 'blue',
    },
    statusBar: {
        height: Theme.statusBarHeight,
        // backgroundColor: 'green',
    },
    navContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navTitle: {
        fontSize: FontSize(16),
        color: '#fff'
    },
    backTouch: {
        width: 30,
        height: 30,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backImage: {
        width: 10,
        height: 18,
        backgroundColor: 'red',
    },
    rightTouch: {
        width: 30,
        height: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightImage: {
        width: 10,
        height: 18,
        backgroundColor: 'red',
    },


    bottomContainer: {
        height: 30,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomRightText: {
        fontSize: FontSize(12),
        color: '#fff',
        marginLeft: 20,
    },
    scaleTouch: {
        width: 30,
        height: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scaleImage: {
        width: 10,
        height: 18,
        backgroundColor: 'red',
    },


    toolImage: {
        width: 10,
        height: 18,
        backgroundColor: 'red',
    },
    playTool: {
        position: 'absolute',
        bottom: 50,
        left: 20,
    },
    videoTool: {
        position: 'absolute',
        right: 20,
        bottom: 80
    },
    refreshTool: {
        position: 'absolute',
        right: 20,
        bottom: 45
    },
});

export default PlayerTools