'use strict';
import React, { useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createAppContainer } from 'react-navigation';
import { StackNavigator } from './RouterConfig';
import RouterHelper from './RouterHelper';

const PersistenceKey = 'PersistenceKey';
const AppNavigationContainer = createAppContainer(StackNavigator);

function NavigationContainer() {
  const navigatorRef = useRef(null);

  const persistNavigationState = useCallback((navState) => {
    return AsyncStorage.setItem(PersistenceKey, JSON.stringify(navState));
  }, []);

  const loadNavigationState = useCallback(async () => {
    setTimeout(() => {
      const navition = navigatorRef.current._navigation;
      RouterHelper.initRouter(navition);
    }, 300);
    return JSON.parse(await AsyncStorage.getItem(PersistenceKey));
  }, []);

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
    <AppNavigationContainer
      ref={captureRef}
      onNavigationStateChange={onNavigationStateChange}
      persistNavigationState={__DEV__ ? persistNavigationState : null}
      loadNavigationState={__DEV__ ? loadNavigationState : null}
    />
  );
}

export default React.memo(NavigationContainer);
