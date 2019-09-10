'use strict';
import { DeviceEventEmitter } from 'react-native';

export const CHANGEEVENT = '__ChangeTheme';

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
}

export default ThemeManager;
