import { useEffect, useRef } from 'react';
import { BackHandler, DeviceEventEmitter } from 'react-native';

export function useEventListener(eventName, handler) {
  const hanldeRef = useRef(handler);

  useEffect(() => {
    hanldeRef.current = handler;
  }, [handler]);

  useEffect(() => {
    let listener = null;
    if (eventName === 'hardwareBackPress') {
      listener = BackHandler.addEventListener(eventName, hanldeRef.current);
    } else {
      listener = DeviceEventEmitter.addListener(eventName, hanldeRef.current);
    }
    return () => {
      listener && listener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
