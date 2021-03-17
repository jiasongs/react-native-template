'use strict';
import React, { useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RouterHelper from './RouterHelper';

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

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="示例" component={Example} />
      <Tab.Screen name="关于" component={About} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function RouterContainer() {
  const navigatorRef = useRef(null);

  const onNavigationStateChange = useCallback(() => {
    const navition = navigatorRef.current._navigation;
    RouterHelper.setRouter(navition);
  }, []);

  const captureRef = useCallback((navigator) => {
    console.log('navigator', navigator);
    if (navigator) {
      const navition = navigator._navigation;
      RouterHelper.initRouter(navition);
      navigatorRef.current = navigator;
    } else {
      navigatorRef.current = null;
    }
  }, []);

  return (
    <NavigationContainer ref={captureRef}>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default React.memo(RouterContainer);
