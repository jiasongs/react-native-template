'use strict'

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types'
import { fontSize, scaleSize, isEmpty } from '../util/Tool';
import Theme from '../config/Theme';


class AlertContent extends React.PureComponent {

    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        titleStyle: Text.propTypes.style,
        detail: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        detailStyle: Text.propTypes.style,
        actions: PropTypes.array
        // 例如,
        //   actions: [
        //         { title: '取消', titleStyle: {}, onPress: () => alert('取消') },
        //         { title: '确定', titleStyle: {}, onPress: () => alert('取消') },
        //     ]
    };

    static defaultProps = {
        actions: []
    };

    constructor(props) {
        super(props)
    };

    componentWillUnmount() {
        // 卸载
        // clearTimeout(this.times)
    }

    _onPress = (onPressItem) => {
        // 有待考虑
        setTimeout(() => {
            onPressItem && onPressItem()
        }, 300); // 防止两个alert同时触发
        AlertManager.hide()
    };

    separator = (index) => {
        const { actions } = this.props
        let separator;
        if (actions.length === 1) {
            separator = null
        } else {
            separator = actions.length - 1 === index ? null : styles.separator
        }
        return separator
    }
    _renderTitleComponent = () => {
        const { title, titleStyle } = this.props
        let titleComponent;
        if (React.isValidElement(title)) {
            titleComponent = title
        } else {
            titleComponent = !isEmpty(title) ? (
                <Text style={[styles.title, titleStyle]}>{title}</Text>
            ) : null
        }
        return titleComponent
    };
    _renderDetailComponent = () => {
        const { detail, detailStyle } = this.props
        let detailComponent;
        if (React.isValidElement(detail)) {
            detailComponent = detail
        } else {
            detailComponent = !isEmpty(detail) ? (
                <Text style={[styles.detail, detailStyle]}>{detail}</Text>
            ) : null
        }
        return detailComponent
    };
    render() {
        const { actions } = this.props
        return (
            <View style={styles.container}>
                {this._renderTitleComponent()}
                {this._renderDetailComponent()}
                <View style={styles.actionContainer}>
                    {actions.map((item, index) => {
                        return (
                            <TouchableHighlight
                                underlayColor={'#eeeeee'}
                                style={[styles.action, this.separator(index)]}
                                key={`action_${index}`}
                                onPress={() => this._onPress(item.onPress)}>
                                <Text style={[styles.actionText, item.titleStyle]}>
                                    {item.title}
                                </Text>
                            </TouchableHighlight>
                        )
                    })}
                </View>
            </View>
        );
    }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        width: Theme.alertWidth,
        minHeight: Theme.alertMinHeight,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
    },
    title: {
        marginTop: 20,
        maxWidth: Theme.alertTitleMaxWidth,
        textAlign: 'center',
        fontSize: fontSize(16),
        fontWeight: 'bold',
        color: '#000000',
        // backgroundColor: 'red',
    },
    detail: {
        marginTop: 12,
        maxWidth: Theme.alertDetailMaxWidth,
        textAlign: 'center',
        fontSize: fontSize(13),
        lineHeight: scaleSize(40),
        color: '#000000',
        // backgroundColor: 'blue',
    },
    actionContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Theme.alertWidth,
        height: Theme.alertActionHeight,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: Theme.alertSeparatorColor,
    },
    action: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Theme.alertActionHeight,
    },
    actionText: {
        color: Theme.alertActionColor,
        fontSize: fontSize(14),
    },
    separator: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: Theme.alertSeparatorColor,
    },
});

//make this component available to the app
export default AlertContent;
