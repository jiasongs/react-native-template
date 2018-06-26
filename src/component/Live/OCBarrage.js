'use strict';
import React from 'react';
import { View, Text, StyleSheet, requireNativeComponent, NativeModules } from 'react-native';
import PropTypes from 'prop-types'

const OCBarrageViewManager = NativeModules.OCBarrageViewManager
const OCBarrageView = requireNativeComponent('OCBarrageView', OCBarrage)

class OCBarrage extends React.PureComponent {

    componentDidMount() {
        setTimeout(() => {
            OCBarrageViewManager.start()
            setInterval(() => {
                this.senderOCBarrage('我是弹幕~')
            }, 1000)
        }, 500);
    }

    senderOCBarrage = (text) => {
        OCBarrageViewManager.addNormalBarrage(text, { textColor: '#52b6a1', fontSize: FontSize(15), })
    }

    render() {
        const { style } = this.props
        return (
            <OCBarrageView
                style={style}
            />
        );
    }
}

const styles = StyleSheet.create({

});

export default OCBarrage