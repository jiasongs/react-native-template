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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RouterContainer() {
  const navigatorRef = useRef(null);

  const onNavigationStateChange = useCallback(() => {
    const navition = navigatorRef.current._navigation;
    RouterHelper.setRouter(navition);
  }, []);

  const captureRef = useCallback((navigator) => {
    if (navigator) {
      const navition = navigator._navigation;
      RouterHelper.initRouter(navition);
      navigatorRef.current = navigator;
    } else {
      navigatorRef.current = null;
    }
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Example} />
        <Tab.Screen name="Settings" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default React.memo(RouterContainer);
