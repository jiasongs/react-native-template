'use strict';
import { Dimensions, Platform, StatusBar } from 'react-native';
import DeviceInfo from './DeviceInfo';
import DefineColors from './DefineColors';
import DefineStyles from './DefineStyles';
import { fontSize, scaleSize, addDefaultProps } from './Adaptation';

const Predefine = {
  ...DefineColors,
  ...DefineStyles,

  fontSize,
  scaleSize,
  addDefaultProps,

  get isIOS() {
    return Platform.OS === 'ios';
  },
  get isAndroid() {
    return Platform.OS === 'android';
  },
  get isNotchedScreen() {
    if (Platform.OS === 'ios') {
      return DeviceInfo.hasNotch();
    }
    return false;
  },
  get isLandscape() {
    return Dimensions.get('screen').width > Dimensions.get('screen').height;
  },
  get statusBarHeight() {
    if (Platform.OS === 'ios') {
      if (this.isNotchedScreen) {
        return 44;
      } else {
        return 20;
      }
    } else if (Platform.OS === 'android') {
      if (Platform.Version > 20) {
        return StatusBar.currentHeight;
      }
      return 0;
    }
    return 0;
  },
  get navBarHeight() {
    return 44;
  },
  get contentTop() {
    return this.statusBarHeight + this.navBarHeight;
  },
  get screenInset() {
    const isLandscape = this.isLandscape;
    const isNotchedScreen = this.isNotchedScreen;
    return {
      left: isLandscape && isNotchedScreen ? 44 : 0,
      right: isLandscape && isNotchedScreen ? 44 : 0,
      top: this.statusBarHeight,
      bottom: isNotchedScreen ? (isLandscape ? 24 : 34) : 0,
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
