'use strict';
import './config/global';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import NavigationContainer from './routers/NavigationContainer';
import { OverlayTopContainer } from './components';
import { ThemeContext, useThemeValue } from './config/theme';
import RouterHelper from './routers/RouterHelper';
import { useBackExitApp } from './common/hooks';

function App() {
  const value = useThemeValue();

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
    <ThemeContext.Provider value={value}>
      <OverlayTopContainer>
        <NavigationContainer />
      </OverlayTopContainer>
    </ThemeContext.Provider>
  );
}

export default React.memo(App);
