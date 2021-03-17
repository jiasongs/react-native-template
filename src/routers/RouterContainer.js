'use strict';
import React, { useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="示例" component={Example} />
      <Tab.Screen name="关于" component={About} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="DemoAlert" component={DemoAlert} />
    </Stack.Navigator>
  );
}

function RouterContainer() {
  const navigatorRef = useRef(null);

  const captureRef = useCallback((navigator) => {
    navigatorRef.current = navigator;
  }, []);

  return (
    <NavigationContainer ref={captureRef}>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default React.memo(RouterContainer);
