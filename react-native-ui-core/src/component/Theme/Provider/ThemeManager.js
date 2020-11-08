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

  static changePrimary(data = {}) {
    DeviceEventEmitter.emit(CHANGEEVENT, { primary: data });
  }

  static changeFont(data = {}) {
    DeviceEventEmitter.emit(CHANGEEVENT, { primary: { font: data } });
  }
}

export default ThemeManager;
