import RNDeviceInfo from 'react-native-device-info';
import { PixelRatio, Dimensions, Platform } from 'react-native';

const pixelHeight = PixelRatio.getPixelSizeForLayoutSize(
  Dimensions.get('window').height,
);

const Device = {
  isNotch:
    Platform.OS === 'ios'
      ? pixelHeight === 2436 ||
        pixelHeight === 1792 ||
        pixelHeight === 2688 ||
        pixelHeight === 1624
      : false,
};

// 检测是否是全民屏设备
RNDeviceInfo.hasNotch().then((data) => {
  Device.isNotch = data;
});

export default Device;
