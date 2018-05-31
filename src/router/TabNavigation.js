'use strict';

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import Home from '../page/Home'
import Mine from '../page/Mine'

// import TabBarBottom from '../component/TabBarBottom'

const tabOptions = (params) => {
    return {
        title: params.title,
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                resizeMode="contain"
                style={styles.tabBarIcon}
                source={!focused ? params.normalIcon : params.selectedIcon}
            />
        )
    }
};

const Tab = createBottomTabNavigator({
    Home: {
        screen: Home, navigationOptions: tabOptions({
            title: '首页',
            normalIcon: Images.icon_tabbar_home,
            selectedIcon: Images.icon_tabbar_home_cur
        })
    },
    Mine: {
        screen: Mine, navigationOptions: tabOptions({
            title: '我的',
            normalIcon: Images.icon_tabbar_mine,
            selectedIcon: Images.icon_tabbar_mine_cur
        })
    },
    // Setting: {
    //     screen: Setting, navigationOptions: tabOptions({
    //         title: '设置',
    //         normalIcon: Images.icon_tabbar_mine,
    //         selectedIcon: Images.icon_tabbar_mine_cur
    //     })
    // },

}, {
        tabBarOptions: {
            showIcon: true,
            indicatorStyle: { height: 0 },
            activeTintColor: "#0085da",
            style: {
                backgroundColor: "#fff"
            },
            tabStyle: {
                margin: 2,
            },
        },
        lazy: true, //懒加载
        swipeEnabled: false,
        animationEnabled: false, //关闭安卓底栏动画
        tabBarPosition: "bottom",
        // tabBarComponent: (props) => <TabBarBottom {...props} />,
        initialRouteName: 'Home'
    });

// create a component
// class TabNavigation extends React.PureComponent {
//     componentDidMount() {

//     }

//     render() {
//         console.log('this.props.navigation', this.props.navigation)
//         return (
//             <Tab navigation={this.props.navigation} />
//         );
//     }
// }

// define your styles
const styles = StyleSheet.create({
    tabBarIcon: {
        height: ScaleSize(80),
        width: ScaleSize(80)
    }
});

//make this component available to the app
export default Tab;
