'use strict'
import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types'
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法

/**
    // 每个页面最外层的View，
    // 不建议在拆分后的组件上使用这个组件，因为耦合度很高，容易造成不必要的Bug。
    // 每个拆分后的组件处理自己的事情就够了，这个组件用来处理页面最外层的事情
*/
class Container extends React.PureComponent {

    static propTypes = {
        fitIPhoneX: PropTypes.bool,
        fitIPhoneXType: PropTypes.oneOf(['padding', 'margin']),
        keyboardShouldPersistTaps: PropTypes.bool // 点击键盘是否落下
    };
    static defaultProps = {
        fitIPhoneX: true,
        fitIPhoneXType: 'padding',
        keyboardShouldPersistTaps: true
    };

    constructor(props) {
        super(props)

    };

    _onPresssContainer = () => {
        const { keyboardShouldPersistTaps } = this.props
        if (keyboardShouldPersistTaps) {
            dismissKeyboard()
        }
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
        const { children, style } = this.props
        const { iphoneXStyle } = this.buildProps()
        return (
            <TouchableWithoutFeedback onPress={this._onPresssContainer}>
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
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: Theme.pageBackgroundColor,
    },
});

export default Container;
