
'use strict';
import { Dimensions, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const deviceWidth = Math.ceil(Dimensions.get('window').width);      //设备的宽度
const deviceHeight = Math.ceil(Dimensions.get('window').height);    //设备的高度
const pixelRatio = Math.ceil(PixelRatio.get());      //当前设备的像素密度
const defaultPixel = 2;                           //iphone6的像素密度
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例

console.log(pixelRatio, deviceWidth, deviceHeight);

export function fontSize(size) {
  if (pixelRatio === 2) {
    // iphone 5s and older Androids
    if (deviceWidth <= 360) {
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.05;
    }
    // older phablets
    return size * 1;
  }
  if (pixelRatio === 3) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other weird android devicedevicedeviceWidth sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    // iphoneX的字体需要特殊适配
    if (deviceHeight === 812 || deviceHeight === 896) {
      return size * 1.0;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.1;
  }
  if (pixelRatio === 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
      // Catch other smaller android deviceHeight sizings
    }
    if (deviceHeight < 667) {
      return size * 1.20;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.27;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5
  return size;
}

export function scaleSize(size) {
  size = Math.round(size * scale + 0.5);
  return size / defaultPixel;
}

export function addCustomProps(WrapComponent, customProps) {
  const componentDefaultProps = WrapComponent.defaultProps;
  WrapComponent.defaultProps = {
    ...componentDefaultProps,
    ...customProps
  };
}

export function getDeviceInfo() {
  return {
    apiLevel: DeviceInfo.getAPILevel(), // api版本，安卓可用
    appName: DeviceInfo.getApplicationName(), // app名字
    brandName: DeviceInfo.getBrand(), // 设备品牌
    buildNumber: DeviceInfo.getBuildNumber(), // 设备的build版本
    bundleId: DeviceInfo.getBundleId(), // 设备的BuildID
    carrier: DeviceInfo.getCarrier(), // 运营商名称
    deviceCountry: DeviceInfo.getDeviceCountry(), // 设备的国家
    deviceLocale: DeviceInfo.getDeviceLocale(), // 设备的本地设置
    settingFontScale: DeviceInfo.getFontScale(), // 设备设置的字体比率
    diskStorage: DeviceInfo.getFreeDiskStorage(), // 设备的可存储大小
    systemVersion: DeviceInfo.getSystemVersion(), // 设备的系统版本
    timezone: DeviceInfo.getTimezone(), // 设备的时区
    uniqueId: DeviceInfo.getUniqueID(), // 设备的唯一ID
    appVersion: DeviceInfo.getVersion(), // app的版本
    isTablet: DeviceInfo.isTablet(), // 是否为平板电脑
  };
}