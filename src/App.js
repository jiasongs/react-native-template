/* eslint-disable no-unused-vars */
'use strict';
import './config/predefine';
import './config/global';
import React, { useState, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import NavigationContainer from './routers/NavigationContainer';
import { OverlayProvider, DevRefresh } from './components';
import { ThemeProvider, useTheme } from './config/theme';
import { useBackExitApp } from './common/hooks';
import { StorageManager } from './common/manager';
import RouterHelper from './routers/RouterHelper';

function App() {
  const value = useTheme();
  const [state, setState] = useState({
    page: {
      style: {
        backgroundColor: 'gary',
      },
    },
  });

  useEffect(() => {
    async function loadTheme() {
      // const data = await StorageManager.load('THEME');
      // if (data) {
      //   setState(data);
      // }
      SplashScreen.hide();
    }
    loadTheme();
  }, []);

  console.log('value', value);

  useBackExitApp(() => {
    const routerStacks = RouterHelper.routerStacks;
    if (routerStacks.length === 1) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <ThemeProvider themeValue={state}>
      <OverlayProvider>
        <NavigationContainer />
        {__DEV__ && <DevRefresh />}
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default React.memo(App);
