'use strict';
import { useEffect, useRef, useCallback } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';

export function useBackHandler(handler) {
  const handleCall = useCallback(handler, []);

  useEffect(() => {
    const listener = BackHandler.addEventListener(
      'hardwareBackPress',
      handleCall,
    );
    return () => {
      listener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useBackExitApp(handler) {
  const lastActionTimeRef = useRef(0);

  const callBack = useCallback(handler, []);

  useBackHandler(() => {
    const isTopRouter = callBack();
    if (isTopRouter) {
      const nowTime = new Date().getTime();
      const delay = 2000;
      if (nowTime - lastActionTimeRef.current < delay) {
        BackHandler.exitApp();
        return false;
      } else {
        lastActionTimeRef.current = nowTime;
        ToastAndroid.show('再按一次退出应用', 1500);
        return true;
      }
    } else {
      return false;
    }
  });
}
