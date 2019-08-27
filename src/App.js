'use strict';
import './config/global';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import NavigationContainer from './routers/NavigationContainer';
import { OverlayTopContainer } from './components';
import { ThemeContext, useThemeValue } from './config/theme';

function App() {
  const value = useThemeValue();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <OverlayTopContainer>
        <NavigationContainer />
      </OverlayTopContainer>
    </ThemeContext.Provider>
  );
}

export default React.memo(App);
