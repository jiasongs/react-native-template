'use strict';
import { useEffect, useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { useEventListener } from './HookEventListener';

export function useKeyboard() {
  const [keyboardState, setKeyboardState] = useState(null);

  const onKeyboardShow = useCallback((event) => {
    if (!event.isEventFromThisApp) {
      return;
    }
    setKeyboardState({
      state: 'show',
      startScreenX: event.startCoordinates.screenX,
      startScreenY: event.startCoordinates.screenY,
      endScreenX: event.endCoordinates.screenX,
      endScreenY: event.endCoordinates.screenY,
      width: event.endCoordinates.width,
      height: event.endCoordinates.height,
    });
  }, []);

  const onKeyboardHide = useCallback((event) => {
    if (!event.isEventFromThisApp) {
      return;
    }
    setKeyboardState({
      state: 'hide',
      startScreenX: event.startCoordinates.screenX,
      startScreenY: event.startCoordinates.screenY,
      endScreenX: event.endCoordinates.screenX,
      endScreenY: event.endCoordinates.screenY,
      width: event.endCoordinates.width,
      height: event.endCoordinates.height,
    });
  }, []);

  useEventListener(
    Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
    onKeyboardShow,
  );

  useEventListener(
    Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
    onKeyboardHide,
  );

  return keyboardState;
}

export function useKeyboardSpace(initSpace) {
  const [maxY, setMaxY] = useState(0);
  const [keyboardSpace, setKeyboardSpace] = useState(initSpace);
  const keyboardInfo = useKeyboard();

  useEffect(() => {
    if (keyboardInfo) {
      const offset = maxY - keyboardInfo.endScreenY;
      if (keyboardInfo.state === 'show' && offset > 0) {
        setKeyboardSpace(offset);
      } else {
        setKeyboardSpace(0);
      }
    }
  }, [keyboardInfo, maxY]);

  return [keyboardSpace, setMaxY];
}
