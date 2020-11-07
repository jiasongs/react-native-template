'use strict';
import './config/predefine';
import './config/global';
import React, { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RouterContainer from './routers/RouterContainer';
import {
  OverlayProvider,
  DevRefresh,
  ThemeProvider,
  Themes,
} from './components';
import { useBackExitApp } from './common/hooks';
import { StorageManager } from './common/manager';
import RouterHelper from './routers/RouterHelper';

function App() {
  const [state, setState] = useState(
    Appearance.getColorScheme() === 'light'
      ? Themes.ThemeLight
      : Themes.ThemeDark,
  );

  useEffect(() => {
    // Appearance.addChangeListener((colorScheme) => {
    //   console.log('currentState', AppState.currentState);
    //   if (AppState.currentState === 'background') {
    //     return;
    //   }
    //   console.log('colorScheme', colorScheme);
    //   if (colorScheme === 'light') {
    //     setState(ThemeLight);
    //   } else {
    //     setState(ThemeDark);
    //   }
    // });
  }, []);

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
        customStyle: () => {
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
