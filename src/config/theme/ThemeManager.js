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
    DeviceEventEmitter.emit(CHANGEEVENT, data);
  }
}

export default ThemeManager;
