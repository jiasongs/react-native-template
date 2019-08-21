'use strict';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { tabOptions, transitionConfig } from './RouterTool';
import { TabBottomBar } from '../components';
import {
  Example
} from '../modules';

const TabNavigatorRouter = {
  Example: {
    screen: Example, navigationOptions: tabOptions({
      title: '示例',
      // normalIcon: Images.icon_tabbar_home,
      // selectedIcon: Images.icon_tabbar_home_cur
    })
  },
};

const TabNavigatorConfig = {
  initialRouteName: 'Example',
  initialRouteParams: {},
  tabBarOptions: {
    showIcon: true,
    indicatorStyle: { height: 0 },
    inactiveTintColor: '#999',
    activeTintColor: '#0085da',
    style: {
      backgroundColor: '#fff'
    },
    tabStyle: {
      margin: 2,
    },
    keyboardHidesTabBar: true,
  },
  lazy: false, //懒加载
  swipeEnabled: false,
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarComponent: TabBottomBar
};

const TabNavigator = createBottomTabNavigator(TabNavigatorRouter, TabNavigatorConfig);

const StackNavigatorRouter = {
  Tab: { screen: TabNavigator }
};

const StackNavigatorConfig = {
  initialRouteName: 'Tab',
  initialRouteParams: {},
  defaultNavigationOptions: {
    header: null,
    gesturesEnabled: true
  },
  cardStyle: {

  },
  cardShadowEnabled: true,
  cardOverlayEnabled: true,
  transitionConfig: transitionConfig
};

const StackNavigator = createStackNavigator(StackNavigatorRouter, StackNavigatorConfig);

export { StackNavigator };
