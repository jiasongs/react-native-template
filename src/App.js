'use strict';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import NavigationContainer from './routers/NavigationContainer';
import './config/global';

function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer />
  );
}

export default React.memo(App);
