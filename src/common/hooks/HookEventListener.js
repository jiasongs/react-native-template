import { useEffect, useRef } from 'react';
import { BackHandler, DeviceEventEmitter, Keyboard } from 'react-native';

export function useEventListener(eventName, handler) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    let listener = null;
    if (eventName.indexOf('keyboard') !== -1) {
      listener = Keyboard.addListener(eventName, (data) => {
        handlerRef.current(data);
      });
    } else if (eventName.indexOf('hardware') !== -1) {
      listener = BackHandler.addEventListener(eventName, (data) => {
        return handlerRef.current(data);
      });
    } else {
      listener = DeviceEventEmitter.addListener(eventName, (data) => {
        handlerRef.current(data);
      });
    }
    return () => {
      listener && listener.remove();
    };
  }, [eventName]);
}
