/*
 * @author: jiasong 
 * @creation time: 2018-06-26 08:57:08
 */

'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBar from '../component/NavigationBar';
import Container from '../component/Container';
import SpinnerLoading from '../component/SpinnerLoading';
import LivePlayer from '../component/Live/index';

class LivePage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { messages: [1, 1, 1, 1, 1, 1, 1] }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ messages: [] })
        }, 5000);
    }

    _onPressRecharge = () => {
        const params = {
            title: '温馨提示',
            detail: '跳转到充值',
            actions: [
                { title: '确定', onPress: () => { } }
            ]
        }
        AlertManager.show(params)
    }

    _onPressGift = () => {
        const params = {
            title: '温馨提示',
            detail: '弹出礼物界面',
            actions: [
                { title: '确定', onPress: () => { } }
            ]
        }
        AlertManager.show(params)
    }

    render() {
        const { messages } = this.state
        return (
            <Container>
                <LivePlayer
                    style={{ flex: 1 }}
                    playerStyle={{ width: 375, height: 220 }}
                    source={{ uri: 'rtmp://live.hkstv.hk.lxdns.com/live/hks' }}
                    messages={messages}
                    onPressRecharge={this._onPressRecharge}
                    onPressGift={this._onPressGift}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    ceshi: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    text: {
        color: '#fff'
    }
});

export default LivePage