'use strict';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { tabOptions, transitionConfig } from './RouterTool';
import { TabBottomBar } from '../components';
import {
  About,
  DemoAlert,
  DemoButton,
  DemoContainer,
  DemoImageView,
  DemoRow,
  DemoList,
  DemoOverlay,
  DemoPicker,
  DemoToast,
  DemoTheme,
  Example,
  DemoSegmented,
  DemoCard,
  DemoWebBrowser,
  DemoPopover,
  DemoPermissions,
  DemoForm,
} from '../modules';
// import { Images } from '../assets';

const TabNavigatorRouter = {
  Example: {
    screen: Example,
    navigationOptions: tabOptions({
      title: '示例',
      // normalIcon: Images.icon_tabbar_example,
      // selectedIcon: Images.icon_tabbar_example,
    }),
  },
  About: {
    screen: About,
    navigationOptions: tabOptions({
      title: '关于',
      // normalIcon: Images.icon_tabbar_about,
      // selectedIcon: Images.icon_tabbar_about,
    }),
  },
};

const TabNavigatorConfig = {
  initialRouteName: 'Example',
  tabBarOptions: {
    showIcon: true,
    indicatorStyle: { height: 0 },
    inactiveTintColor: '#999',
    activeTintColor: '#0085da',
    style: {
      backgroundColor: '#fff',
    },
    tabStyle: {
      margin: 2,
    },
    keyboardHidesTabBar: true,
  },
  lazy: true, //懒加载
  tabBarComponent: TabBottomBar,
};

const TabNavigator = createBottomTabNavigator(
  TabNavigatorRouter,
  TabNavigatorConfig,
);

const StackNavigatorRouter = {
  Tab: { screen: TabNavigator },
  DemoAlert: { screen: DemoAlert },
  DemoButton: { screen: DemoButton },
  DemoContainer: { screen: DemoContainer },
  DemoImageView: { screen: DemoImageView },
  DemoRow: { screen: DemoRow },
  DemoList: { screen: DemoList },
  DemoOverlay: { screen: DemoOverlay },
  DemoPicker: { screen: DemoPicker },
  DemoToast: { screen: DemoToast },
  DemoTheme: { screen: DemoTheme },
  DemoSegmented: { screen: DemoSegmented },
  DemoCard: { screen: DemoCard },
  DemoWebBrowser: { screen: DemoWebBrowser },
  DemoPopover: { screen: DemoPopover },
  DemoPermissions: { screen: DemoPermissions },
  DemoForm: { screen: DemoForm },
};

const StackNavigatorConfig = {
  initialRouteName: 'Tab',
  initialRouteParams: {},
  defaultNavigationOptions: ({ navigation }) => {
    return {
      cardStyle: {},
      cardShadowEnabled: true,
      cardOverlayEnabled: true,
      headerShown: false,
      animationEnabled: true,
      gestureEnabled: true,
      gestureResponseDistance: {
        horizontal: 25,
        vertical: 135,
      },
      ...transitionConfig(navigation),
    };
  },
};

const StackNavigator = createStackNavigator(
  StackNavigatorRouter,
  StackNavigatorConfig,
);

export { StackNavigator };
