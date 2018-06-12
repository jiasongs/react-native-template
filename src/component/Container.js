'use strict'
import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types'


/**
    // 每个页面最外层的View，
    // 不建议在拆分后的组件上使用这个组件，因为耦合度很高，容易造成不必要的Bug。
    // 每个拆分后的组件处理自己的事情就够了，这个组件用来处理页面最外层的事情
*/
class Container extends React.PureComponent {

    static propTypes = {
        fitIPhoneX: PropTypes.bool,
        fitIPhoneXType: PropTypes.oneOf(['padding', 'margin']),
        // 点击空白视图层落下键盘,如果你的组件是scrollview或者列表就务必要设置false,
        // 因为父组件的点击手势会影响子组件的滚动,且列表组件自带键盘落下的特性。
        keyboardShouldPersistTaps: PropTypes.bool

    };

    static defaultProps = {
        fitIPhoneX: true,
        fitIPhoneXType: 'padding',
        keyboardShouldPersistTaps: false
    };

    constructor(props) {
        super(props)

    };

    _onPresssContainer = () => {
        Keyboard.dismiss()
        console.log('_onPresssContainer')
    }

    buildProps = () => {
        const { fitIPhoneX, fitIPhoneXType } = this.props
        let iphoneXStyle;
        if (fitIPhoneX) {
            iphoneXStyle = fitIPhoneXType === 'padding' ? {
                paddingBottom: Theme.isIPhoneX ? Theme.fitIPhoneXBottom : 0
            } : { marginBottom: Theme.isIPhoneX ? Theme.fitIPhoneXBottom : 0 }
        } else {
            iphoneXStyle = {}
        }
        return { iphoneXStyle }
    };

    render() {
        const { children, style, keyboardShouldPersistTaps } = this.props
        const { iphoneXStyle } = this.buildProps()
        return (
            <TouchableWithoutFeedback disabled={!keyboardShouldPersistTaps} onPress={this._onPresssContainer}>
                <View style={[styles.container, iphoneXStyle, style]}>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        );
    };
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexGrow: 1,
        // flexShrink: 1,
        backgroundColor: Theme.pageBackgroundColor,
    },
});

export default Container;
