import RNDeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export default {
  isNotch: Platform.OS === 'ios' ? RNDeviceInfo.hasNotch() : false,
};
