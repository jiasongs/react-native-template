'use strict';
import { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { useEventListener } from './HookEventListener';

export function useBackHandler(handler) {
  useEventListener('hardwareBackPress', handler);
}

export function useBackExitApp(handler) {
  const lastActionTimeRef = useRef(0);
  const hanldeRef = useRef(handler);

  useEffect(() => {
    hanldeRef.current = handler;
  }, [handler]);

  useBackHandler(() => {
    const isTopRouter = hanldeRef.current();
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
