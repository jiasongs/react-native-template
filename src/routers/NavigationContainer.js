
'use strict';
import React, { useRef, useCallback } from 'react';
import { AppNavigationContainer } from './RouterConfig';
import RouterHelper from './RouterHelper';

function NavigationContainer() {

  const navigatorRef = useRef(null);

  const _onNavigationStateChange = useCallback(() => {
    const navition = navigatorRef.current._navigation;
    RouterHelper.setRouter(navition);
  }, []);

  const _captureRef = useCallback((navigator) => {
    if (navigator) {
      navigatorRef.current = navigator;
      const navition = navigatorRef.current._navigation;
      RouterHelper.initRouter(navition);
    } else {
      navigatorRef.current = null;
    }
  }, []);

  return (
    <AppNavigationContainer
      ref={_captureRef}
      onNavigationStateChange={_onNavigationStateChange}
    />
  );
}


export default React.memo(NavigationContainer);
