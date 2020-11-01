'use strict';
import { Dimensions, Platform, StatusBar, NativeModules } from 'react-native';
import DeviceInfo from './DeviceInfo';
import DefineColors from './DefineColors';
import DefineStyles from './DefineStyles';
import { fontSize, scaleSize, addDefaultProps } from './Adaptation';

const StatusBarManager = NativeModules.StatusBarManager;
const RNCSafeAreaProvider = NativeModules.RNCSafeAreaProvider;

const Predefine = {
  ...DefineColors,
  ...DefineStyles,

  fontSize,
  scaleSize,
  addDefaultProps,

  get isIOS() {
    return Platform.OS === 'ios';
  },
  get isPad() {
    return Platform.isPad;
  },
  get isAndroid() {
    return Platform.OS === 'android';
  },
  get isNotchedScreen() {
    if (Platform.OS === 'ios') {
      return DeviceInfo.isNotch;
    }
    return false;
  },
  get isLandscape() {
    return DeviceInfo.isLandscape;
  },
  get statusBarHeight() {
    if (Platform.OS === 'ios') {
      return StatusBarManager.getConstants().HEIGHT;
    } else if (Platform.OS === 'android') {
      if (Platform.Version > 20) {
        return StatusBar.currentHeight;
      }
      return 0;
    }
    return 0;
  },
  get navBarHeight() {
    if (Platform.OS === 'ios') {
      return this.isPad
        ? Platform.Version >= 12.0
          ? 50
          : 44
        : this.isLandscape
        ? 32
        : 44;
    } else if (Platform.OS === 'android') {
      return 44;
    }
    return 44;
  },
  get contentTop() {
    return this.statusBarHeight + this.navBarHeight;
  },
  get screenInset() {
    const insets = RNCSafeAreaProvider.getConstants().initialWindowMetrics
      .insets;
    return {
      left: insets.left,
      right: insets.right,
      top: insets.top,
      bottom: insets.bottom,
    };
  },
  get screenWidth() {
    return Dimensions.get('screen').width;
  },
  get screenHeight() {
    return Dimensions.get('screen').height;
  },
  get windowWidth() {
    return Dimensions.get('window').width;
  },
  get windowHeight() {
    return Dimensions.get('window').height;
  },
};

export { Predefine };
