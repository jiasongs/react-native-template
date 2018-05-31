//import liraries

import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import NavigationBar from '../component/NavigationBar'
import DropDownMenu from '../component/DropdownMenu';
import Container from '../component/Container';

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillBlur() {
        console.log('componentWillBlur')
    }

    componentWillFocus() {
        console.log('componentWillFocus')
    }

    componentDidFocus() {
        console.log('componentDidFocus')
    }

    componentDidBlur() {
        console.log('componentDidBlur')
    }

    backOnPress = () => {
        RouteHelper.goBack()
    };

    rightOnPress = (info) => {
        ToastManager.showToast('qwe');
        MenuManager.showMenu(info.rightView)
    };

    onPress = () => {
        RouteHelper.navigate('Home')
    };

    _renderContentComponent = (selectIndex) => {
        if (selectIndex === 0) {
            return (
                <View style={styles.dropDownMenuView}>
                    <Text style={styles.dropDownMenuContext}>第一个</Text>
                </View>
            );
        } else if (selectIndex === 1) {
            return (
                <View style={styles.dropDownMenuView}>
                    <Text style={styles.dropDownMenuContext}>第二个</Text>
                </View>
            );
        } else {
            return (
                <View style={[styles.dropDownMenuView, { backgroundColor: '#f00' }]}>
                    <Text style={styles.dropDownMenuContext}>第三个</Text>
                </View>
            );
        }
    };

    contentHeight = (selectIndex) => {
        if (selectIndex === 0) {
            return 400
        } else if (selectIndex === 1) {
            return 200
        } else {
            return 50
        }
    };

    render() {
        return (
            <Container fitIPhoneX={false} style={styles.container}>
                <NavigationBar
                    title={'设置'}
                    // leftView={null}
                    rightViewOnPress={this.rightOnPress}
                    backOnPress={this.backOnPress}
                />
                <DropDownMenu
                    renderContentComponent={this._renderContentComponent}
                    contentHeight={this.contentHeight} // 因为高度有动画，所以无法测量其高度，只能给个定值。
                // 还有一种想法，可以先加载renderContentComponent，获取高度后再隐藏掉，不过感觉这样有点耗费性能，且不符合开发的逻辑。
                >
                    <ScrollView style={styles.container}>
                        <View style={styles.content}>
                            <Text style={styles.contentText}>内容</Text>
                        </View>
                    </ScrollView>
                </DropDownMenu>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentText: {
        fontSize: 16,
        color: '#555',
    },
    dropDownMenuView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f60',
    },
    dropDownMenuContext: {
        color: '#fff'
    },
});

//make this component available to the app
export default Setting;