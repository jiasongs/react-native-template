'use strict';
import { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
// eslint-disable-next-line no-unused-vars
import ThemeLight from './ThemeLight';
import ThemeDark from './ThemeDark';

const initialTheme = ThemeDark;
const __ChangeEvent = '__ChangeTheme';

function useThemeValue(initState = {}) {
  const [value, setValue] = useState({ ...initialTheme, ...initState });

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
  static currentTheme = initialTheme;

  static addListener(callBack) {
    return DeviceEventEmitter.addListener(__ChangeEvent, callBack);
  }

  static removeListener(callBack) {
    DeviceEventEmitter.removeListener(__ChangeEvent, callBack);
  }

  static changeTheme(data = {}) {
    if (!data.type) {
      console.warn('Theme的type属性必须存在');
      return;
    }
    if (data.type === this.currentTheme.type) {
      console.warn('与当前主题相同');
      return;
    }
    this.currentTheme = { ...this.currentTheme, ...data };
    DeviceEventEmitter.emit(__ChangeEvent, data);
  }

  static restoreTheme() {
    DeviceEventEmitter.emit(__ChangeEvent, initialTheme);
  }
}

export { ThemeManager, useThemeValue };
