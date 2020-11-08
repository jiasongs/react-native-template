'use strict';
import { Dimensions, PixelRatio } from 'react-native';

const deviceWidth = Math.ceil(Dimensions.get('window').width); //设备的宽度
const deviceHeight = Math.ceil(Dimensions.get('window').height); //设备的高度
const pixelRatio = Math.ceil(PixelRatio.get()); //当前设备的像素密度
const defaultPixel = 2; //iphone6的像素密度
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2); //获取缩放比例

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
    if (deviceHeight >= 667 && deviceHeight <= 737) {
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
      return size * 1.2;
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

export function addDefaultProps(WrapComponent, customProps) {
  const NewWrapComponent = WrapComponent.type || WrapComponent;
  const componentDefaultProps = NewWrapComponent.defaultProps;
  NewWrapComponent.defaultProps = {
    ...componentDefaultProps,
    ...customProps,
  };
}
