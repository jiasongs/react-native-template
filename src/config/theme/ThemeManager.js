'use strict';
import React, { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import ThemeLight from './ThemeLight';
// eslint-disable-next-line no-unused-vars
import ThemeDark from './ThemeDark';

const CHANGEEVENT = '__ChangeTheme';
const initialTheme = ThemeLight;

function useThemeValue(initState = {}) {
  const [value, setValue] = useState({ ...initialTheme, ...initState });

  useEffect(() => {
    const listenerName = DeviceEventEmitter.addListener(CHANGEEVENT, (data) => {
      setValue((preValue) => {
        return { ...preValue, ...data };
      });
    });
    return () => listenerName.remove();
  }, [initState]);

  useEffect(() => {
    ThemeManager.currentTheme = value;
  }, [value]);

  return value;
}

class ThemeManager {
  static currentTheme = {};

  static addListener(callBack) {
    return DeviceEventEmitter.addListener(CHANGEEVENT, callBack);
  }

  static removeListener(callBack) {
    DeviceEventEmitter.removeListener(CHANGEEVENT, callBack);
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
    DeviceEventEmitter.emit(CHANGEEVENT, data);
  }

  static restoreTheme() {
    DeviceEventEmitter.emit(CHANGEEVENT, initialTheme);
  }
}

const ThemeContext = React.createContext(initialTheme);

export { ThemeManager, ThemeContext, useThemeValue };
