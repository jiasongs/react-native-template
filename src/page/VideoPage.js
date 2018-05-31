//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Orientation from 'react-native-orientation';
import NavigationBar from '../component/NavigationBar'
import VideoPlayer from '../component/Video/index'
import { Button } from 'teaset';

// create a component
class VideoPage extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = { videoStyle: { width: 375, height: 260 }, navHidden: false }
    }

    componentDidMount() {
        // this locks the view to Portrait Mode
        // Orientation.lockToPortrait();

        // // this locks the view to Landscape Mode
        // // Orientation.lockToLandscape();

        // // this unlocks any previous locks to all Orientations
        // // Orientation.unlockAllOrientations();

        Orientation.addOrientationListener(this._orientationDidChange);
        console.log('VideoPage-componentDidMount')
        // setTimeout(() => {
        //     this.props.navigation.goBack()
        // }, 100);
        // alert('VideoPage-componentDidMount')
        this.inter = InteractionManager.runAfterInteractions(() => {
            console.log('VideoPage-runAfterInteractions')
            // alert('VideoPage-runAfterInteractions')
        })
    }
    componentWillUnmount() {
        // Remember to remove listener
        Orientation.removeOrientationListener(this._orientationDidChange);

        // this.inter.cancel()
    }
    onPress = () => {
        // const params = {
        //     title: '温馨提示',
        //     titleStyle: {},
        //     detail: '你好吗',
        //     detailStyle: {},
        //     action: [
        //         { text: '取消', style: {}, onPress: () => alert('zzz') },
        //         { text: '确定', style: {} },
        //     ]
        // }
        // AlertManager.show(params)
        // RouteHelper.navigate('Ceshi')
        this.props.navigation.navigate('Ceshi')
    }
    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            this.setState({ navHidden: true })
        } else {
            this.setState({ navHidden: false })
        }
    }
    render() {
        console.log('render')
        return (
            <View style={styles.container}>
                {/* <Button style={{ marginTop: 50, }} title={'测试'} onPress={this.onPress} /> */}
                {/* <NavigationBar
                    style={styles.navBar}
                    hidden={this.state.navHidden}
                    background={null}
                    statusBarHidden={this.state.navHidden}
                    title={'视频播放title'}
                    rightViewOnPress={this.rightOnPress}
                    backOnPress={this.backOnPress}
                /> */}
                <VideoPlayer
                    style={{ backgroundColor: 'black', }}
                    source={require('../asset/video/broadchurch.mp4')}
                    videoStyle={this.state.videoStyle}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    navBar: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 20
    }
});

//make this component available to the app
export default VideoPage;
