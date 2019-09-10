'use strict';
import './config/global';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import NavigationContainer from './routers/NavigationContainer';
import { OverlayTopContainer, DevRefresh } from './components';
import { ThemeProvider } from './config/theme';
import RouterHelper from './routers/RouterHelper';
import { useBackExitApp } from './common/hooks';

function App() {
  useEffect(() => {
    SplashScreen.hide();
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
    <ThemeProvider>
      <OverlayTopContainer>
        <NavigationContainer />
        {__DEV__ && <DevRefresh />}
      </OverlayTopContainer>
    </ThemeProvider>
  );
}

export default React.memo(App);
