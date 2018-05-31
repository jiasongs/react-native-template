//import liraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Images from '../asset/index';
import { fontSize, scaleSize } from '../util/Tool';

import Theme from '../config/Theme'

const ShareSource = [
    { actionTitle: '微信好友', actionImage: Images.icon_tabbar_home_cur, type: 1 },
    { actionTitle: '朋友圈', actionImage: Images.icon_tabbar_home_cur, type: 2 },
    { actionTitle: 'QQ', actionImage: Images.icon_tabbar_home_cur, type: 3 },
    { actionTitle: '微博', actionImage: Images.icon_tabbar_home_cur, type: 4 },
]
const OtherSource = [
    { actionTitle: '复制', actionImage: Images.icon_tabbar_home_cur, type: 5 },
]
class ShareContent extends React.PureComponent {

    _onPressAcion = (type) => {
        const { onPress } = this.props
        onPress && onPress(type)
        ActionsManager.hide()
    }
    _onPressCancel = () => {
        ActionsManager.hide()
    }

    _renderContent = (dataSource, key) => {
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {dataSource.map((item, index) => {
                    return (
                        <View key={`${key}_${index}`} style={styles.actionContainer}>
                            <TouchableOpacity style={styles.actionBack} onPress={() => this._onPressAcion(item.type)}>
                                <Image style={styles.actionImage} source={item.actionImage} />
                            </TouchableOpacity>
                            <Text style={styles.actionText}>{item.actionTitle}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this._renderContent(ShareSource, 'share')}
                <View style={styles.separator} />
                {this._renderContent(OtherSource, 'other')}
                <TouchableOpacity style={styles.cancelButton} onPress={this._onPressCancel}>
                    <Text style={styles.cancelText}>取消</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.shareBackColor,
        paddingBottom: Theme.isIPhoneX ? Theme.fitIPhoneXBottom : 0,
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 17,
        marginTop: 12,
        marginBottom: 12,
    },
    actionBack: {
        width: Theme.shareActionWidth,
        height: Theme.shareActionHeight,
        borderRadius: Theme.shareActionRadius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
    },
    actionText: {
        marginTop: 7,
        // marginBottom: ShareTheme.shareActionMargin,
        color: Theme.shareActionTextColor,
        fontSize: fontSize(11),
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#cdcdcd',
    },
    cancelButton: {
        height: Theme.shareCancelActionHeight,
        backgroundColor: Theme.shareCancelBackColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        fontSize: fontSize(14),
        color: Theme.shareCancelTextColor
    },
    actionImage: {
        width: scaleSize(80),
        height: scaleSize(80),
        // backgroundColor: 'red',
    }
});

//make this component available to the app
export default ShareContent;
