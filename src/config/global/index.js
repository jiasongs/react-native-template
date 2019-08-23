'use strict';
import {
  Platform,
  YellowBox,
  UIManager,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Images } from '../../assets';
import { Theme } from '../themes';
import Constants from './Constants';
import { addCustomProps } from '../../utils/Adaptation';
import {
  LoadingHint,
  NavigationBar,
  ListRow,
  ToastView,
  Checkbox,
} from '../../components';

/**
 * @开启安卓的布局动画
 */
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
/**
 * @屏蔽调试警告
 */
YellowBox.ignoreWarnings([
  'Required dispatch_sync to load constants for RNDeviceInfo',
  'It looks',
  'Require cycle:',
  'Remote debugger is in a background',
  'Required dispatch_sync',
  'Warning: isMounted(...)',
  'Warning: Slider',
  'Warning: ViewPagerAndroid',
  'Accessing view manager configs directly off UIManager',
  'Module AudioRecorderManager requires main queue setup since it overrides',
]);
/**
 * @屏蔽输出
 */
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}
/**
 * @默认UI设置
 */
addCustomProps(Text, { allowFontScaling: false });
addCustomProps(TextInput, {
  allowFontScaling: false,
  selectionColor: Theme.overallColor,
});
addCustomProps(TouchableOpacity, { activeOpacity: 0.9 });
addCustomProps(LoadingHint.type, { source: Images.json_loading });
addCustomProps(NavigationBar.type, { backActionSource: Images.icon_nav_left });
addCustomProps(ListRow.type, { accessorySource: Images.icon_arrow_right });
addCustomProps(ToastView.type, {
  successIcon: Images.icon_toast_success,
  failIcon: Images.icon_toast_fail,
  warnIcon: Images.icon_toast_warn,
  loadingIcon: Images.icon_toast_loading,
});
addCustomProps(Checkbox.type, {
  narmalIcon: Images.icon_nav_left,
  selectIcon: Images.icon_center_play,
});

/**
 * @系统是iOS
 */
global.__IOS__ = Platform.OS === 'ios';
/**
 * @系统是安卓
 */
global.__ANDROID__ = Platform.OS === 'android';
/**
 * @获取屏幕宽度
 */
global.SCREEN_WIDTH = Theme.screenWidth;
/**
 * @获取屏幕高度
 */
global.SCREEN_HEIGHT = Theme.screenHeight;
/**
 * @常量
 */
global.Constants = Constants;
