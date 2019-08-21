'use strict';
import { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import DefaultTheme from './default';

const __ChangeEvent = '__ChangeTheme';

function useThemeValue(initState = DefaultTheme) {
  const [value, setValue] = useState(initState);

  useEffect(() => {
    const listenerName = DeviceEventEmitter.addListener(__ChangeEvent, (data) => {
      setValue((preValue) => {
        return { ...preValue, ...data };
      });
    });
    return () => listenerName.remove();
  }, []);

  return value;
}

class ThemeManager {


  static changeTheme(data = {}) {
    DeviceEventEmitter.emit(__ChangeEvent, data);
  }

  static restoreTheme() {
    DeviceEventEmitter.emit(__ChangeEvent, DefaultTheme);
  }

}

export {
  ThemeManager,
  useThemeValue
};

