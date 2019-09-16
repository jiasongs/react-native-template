'use strict';
import './config/global';
import React, { useState, useEffect, useContext } from 'react';
import SplashScreen from 'react-native-splash-screen';
import NavigationContainer from './routers/NavigationContainer';
import { OverlayProvider, DevRefresh } from './components';
import { ThemeProvider } from './config/theme';
import RouterHelper from './routers/RouterHelper';
import { useBackExitApp } from './common/hooks';
import { StorageManager } from './common/manager';

function App() {
  const [state, setState] = useState({});

  useEffect(() => {
    StorageManager.load('THEME').then((data) => {
      if (data) {
        setState(data);
      }
      SplashScreen.hide();
    });
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
    <ThemeProvider themeValue={state}>
      <OverlayProvider>
        <NavigationContainer />
        {__DEV__ && <DevRefresh />}
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default React.memo(App);
