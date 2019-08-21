
'use strict';
import { useEffect, useCallback, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export function useKeyboard() {

  const [keyboardState, setKeyboardState] = useState(null);

  useEffect(() => {
    const showName = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hidename = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showListener = Keyboard.addListener(showName, onKeyboardShow);
    const hideListener = Keyboard.addListener(hidename, onKeyboardHide);
    return () => {
      showListener.remove();
      hideListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      height: event.endCoordinates.height
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
      height: event.endCoordinates.height
    });
  }, []);

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