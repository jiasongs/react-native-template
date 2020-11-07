'use strict';
import './config/predefine';
import './config/global';
import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RouterContainer from './routers/RouterContainer';
import {
  OverlayProvider,
  DevRefresh,
  ThemeProvider,
  ThemeDark,
  ThemeLight,
} from './components';
import { useBackExitApp } from './common/hooks';
import { StorageManager } from './common/manager';
import RouterHelper from './routers/RouterHelper';

function App() {
  const [state, setState] = useState({});

  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log('colorScheme', colorScheme);
    if (colorScheme === 'light') {
      setState(ThemeLight);
    } else {
      setState(ThemeDark);
    }
  }, [colorScheme]);

  useEffect(() => {
    async function loadTheme() {
      const data = await StorageManager.load('THEME1');
      if (data) {
        setState({
          ...data,
        });
      }
      SplashScreen.hide();
    }
    loadTheme();
  }, []);

  useBackExitApp(() => {
    const routerStacks = RouterHelper.routerStacks;
    if (routerStacks.length === 1) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <ThemeProvider
      theme={state}
      registerTheme={{
        customStyle: (primary) => {
          console.log('customStyle', primary);
          return {};
        },
      }}
    >
      <OverlayProvider>
        <RouterContainer />
        {__DEV__ && <DevRefresh />}
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default React.memo(App);
