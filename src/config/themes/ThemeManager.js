'use strict';
import { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import DefaultTheme from './default';

const __ChangeEvent = '__ChangeTheme';

function useThemeValue(initState = {}) {
  const [value, setValue] = useState({ ...DefaultTheme, ...initState });

  useEffect(() => {
    const listenerName = DeviceEventEmitter.addListener(
      __ChangeEvent,
      (data) => {
        setValue((preValue) => {
          return { ...preValue, ...data };
        });
      },
    );
    return () => listenerName.remove();
  }, []);

  return value;
}

class ThemeManager {
  static currentTheme = DefaultTheme;

  static addListener(callBack) {
    return DeviceEventEmitter.addListener(__ChangeEvent, callBack);
  }

  static removeListener(callBack) {
    DeviceEventEmitter.removeListener(__ChangeEvent, callBack);
  }

  static changeTheme(data = {}) {
    if (!data.type) {
      console.warn('Theme的type属性必须存在');
    }
    this.currentTheme = { ...this.currentTheme, ...data };
    DeviceEventEmitter.emit(__ChangeEvent, data);
  }

  static restoreTheme() {
    DeviceEventEmitter.emit(__ChangeEvent, DefaultTheme);
  }
}

export { ThemeManager, useThemeValue };
