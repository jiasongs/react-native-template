'use strict';
import {
  Platform,
  UIManager,
  Text,
  TextInput,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import { Images } from '../../assets';
import { Predefine } from '../predefine';
import Constants from './Constants';
import {
  Button,
  LoadingHint,
  NavigationBar,
  ListRow,
  ToastView,
  Checkbox,
  ListView,
  NetworkError,
} from 'react-native-ui-core';
import ListHeaderLoading from 'react-native-ui-core/List/ListHeaderLoading';
import RouterHelper from '../../routers/RouterHelper';

/**
 * @开启安卓的布局动画
 */
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
/**
 * @屏蔽调试警告
 */
LogBox.ignoreLogs([]);
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
Predefine.addDefaultProps(Text, { allowFontScaling: false });
Predefine.addDefaultProps(TextInput, {
  allowFontScaling: false,
  selectionColor: Predefine.overallColor,
});
Predefine.addDefaultProps(TouchableOpacity, { activeOpacity: 0.6 });
Predefine.addDefaultProps(Button, { activeOpacity: 0.6 });
Predefine.addDefaultProps(LoadingHint, { source: Images.json_loading });
Predefine.addDefaultProps(NavigationBar, {
  backIcon: Images.icon_nav_left,
  onPressBack: () => RouterHelper.goBack(),
});
Predefine.addDefaultProps(ListRow, {
  accessorySource: Images.icon_arrow_right,
});
Predefine.addDefaultProps(ListView, { emptySource: Images.img_no_record });
Predefine.addDefaultProps(NetworkError, { source: Images.img_no_nerwork });
Predefine.addDefaultProps(ToastView, {
  successIcon: Images.icon_toast_success,
  failIcon: Images.icon_toast_fail,
  warnIcon: Images.icon_toast_warn,
  loadingIcon: Images.icon_toast_loading,
});
Predefine.addDefaultProps(Checkbox, {
  narmalIcon: Images.icon_nav_left,
  selectIcon: Images.icon_center_play,
});
Predefine.addDefaultProps(ListHeaderLoading, {
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
