'use strict'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'


// create a component
class Container extends React.PureComponent {

    static propTypes = {
        fitIPhoneX: PropTypes.bool,
        fitIPhoneXType: PropTypes.oneOf(['padding', 'margin'])
    };
    static defaultProps = {
        fitIPhoneX: true,
        fitIPhoneXType: 'padding'
    };

    constructor(props) {
        super(props)

    };

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
            <View style={[styles.container, iphoneXStyle, style]}>
                {children}
            </View>
        );
    };
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.pageBackgroundColor,
    },
});

export default Container;
