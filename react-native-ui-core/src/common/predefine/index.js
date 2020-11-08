'use strict';
import { Dimensions, Platform, StatusBar, NativeModules } from 'react-native';
import DefineColors from './DefineColors';
import DefineStyles from './DefineStyles';

const StatusBarManager = NativeModules.StatusBarManager;
const RNCSafeAreaProvider = NativeModules.RNCSafeAreaProvider;

const Predefine = {
  ...DefineColors,
  ...DefineStyles,

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
      return this.screenInset.bottom > 0;
    }
    return false;
  },
  get isLandscape() {
    const { width, height } = Dimensions.get('window');
    return height < width;
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
    if (insets) {
      return {
        top: insets.top,
        left: insets.left,
        bottom: insets.bottom,
        right: insets.right,
      };
    }
    return { top: this.statusBarHeight, left: 0, bottom: 0, right: 0 };
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

export default Predefine;
