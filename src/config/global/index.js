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
import { Predefine } from '../predefine';
import Constants from './Constants';
import { addDefaultProps } from '../../utils/Adaptation';
import {
  LoadingHint,
  NavigationBar,
  ListRow,
  ToastView,
  Checkbox,
} from '../../components';
import ListHeaderLoading from '../../components/List/ListHeaderLoading';

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
  'Warning: componentWillMount is',
]);
/**
 * @屏蔽输出
 */
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    assert: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
    time: () => {},
    timeEnd: () => {},
  };
}
/**
 * @默认UI设置
 */
addDefaultProps(Text, { allowFontScaling: false });
addDefaultProps(TextInput, {
  allowFontScaling: false,
  selectionColor: Predefine.overallColor,
});
addDefaultProps(TouchableOpacity, { activeOpacity: 0.9 });
addDefaultProps(LoadingHint, { source: Images.json_loading });
addDefaultProps(NavigationBar, { defaultLeftSource: Images.icon_nav_left });
addDefaultProps(ListRow, { accessorySource: Images.icon_arrow_right });
addDefaultProps(ToastView, {
  successIcon: Images.icon_toast_success,
  failIcon: Images.icon_toast_fail,
  warnIcon: Images.icon_toast_warn,
  loadingIcon: Images.icon_toast_loading,
});
addDefaultProps(Checkbox, {
  narmalIcon: Images.icon_nav_left,
  selectIcon: Images.icon_center_play,
});
addDefaultProps(ListHeaderLoading, {
  source:
    Platform.OS === 'android'
      ? Images.json_list_header_loading
      : Images.json_list_header_loading,
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
global.SCREEN_WIDTH = Predefine.screenWidth;
/**
 * @获取屏幕高度
 */
global.SCREEN_HEIGHT = Predefine.screenHeight;
/**
 * @常量
 */
global.Constants = Constants;
