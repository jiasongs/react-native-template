'use strict';
import './config/predefine';
import './config/global';
import React, { useState, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import NavigationContainer from './routers/NavigationContainer';
import { OverlayProvider, DevRefresh, ThemeProvider } from './components';
import { useBackExitApp } from './common/hooks';
import { StorageManager } from './common/manager';
import RouterHelper from './routers/RouterHelper';

function App() {
  const [state, setState] = useState({});

  useEffect(() => {
    async function loadTheme() {
      const data = await StorageManager.load('THEME');
      if (data) {
        setState({
          ...data,
          customStyle: {},
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
    <ThemeProvider defaultTheme={state}>
      <OverlayProvider>
        <NavigationContainer />
        {__DEV__ && <DevRefresh />}
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default React.memo(App);
