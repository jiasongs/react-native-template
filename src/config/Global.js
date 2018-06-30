// 项目中的图片可以通过Images.xxx 获取
import { Platform, Text } from 'react-native'
import { scaleSize, fontSize, isMobile, checkMobile, checkPassword, isEmpty, containsChinese } from '../util/Tool'
import Theme from './Theme'
import Images from '../asset/index'
import { addCustomProps } from '../util/addCustomProps'
import JShareModule from 'jshare-react-native';
import XPay from 'react-native-puti-pay';
import StorageManager from './StorageManager';
import Services from '../util/Services'
import MenuManager from './MenuManager'
import ToastManager from './ToastManager'
import ActionsManager from './ActionsManager'
import AlertManager from './AlertManager';
import InteractionManager from './InteractionManager';
import RouteHelper from '../router/RouteHelper'
import * as Constants from './Constants'
import moment from 'moment'
import 'moment/locale/zh-cn'
// 本地化
moment.locale('zh-cn');

if (Platform.OS === 'ios') {
    // 启动极光分享 ios需要
    JShareModule.setup()
}
// debug模式
JShareModule.setDebug({ enable: __DEV__ })
//设置微信ID
XPay.setWxId(Constants.WEI_XIN_APPID)
//设置支付宝URL Schemes
XPay.setAlipayScheme(Constants.ALIPAY_SCHME)


if (!__DEV__) {
    global.console = {
        info: () => { },
        log: () => { },
        warn: () => { },
        debug: () => { },
        error: () => { }
    };
}

// 屏蔽调试警告
console.ignoredYellowBox = ['Remote debugger is in', 'Warning: isMounted(...)'];
// 系统是iOS
global.__IOS__ = (Platform.OS === 'ios');

// 系统是安卓
global.__ANDROID__ = (Platform.OS === 'android');

// 获取屏幕宽度
global.SCREEN_WIDTH = Theme.screen_width;

// 获取屏幕高度
global.SCREEN_HEIGHT = Theme.screen_height;

// 适配字体
global.FontSize = fontSize;

// 屏幕适配
global.ScaleSize = scaleSize;

// 图片加载
global.Images = Images;

// 存储
global.StorageManager = StorageManager;

// 存储
global.Services = Services;

// 事件处理
global.Moment = moment;

// 路由管理
global.RouteHelper = RouteHelper;

// 菜单管理
global.MenuManager = MenuManager;

// 轻提示
global.ToastManager = ToastManager;

// 常量
global.Constants = Constants;

// 操作管理
global.ActionsManager = ActionsManager

// 弹窗
global.AlertManager = AlertManager

// 交互管理，系统的有bug,https://github.com/facebook/react-native/issues/8624
global.InteractionManager = InteractionManager

// 全局的主题和控件的配置以及样式
global.Theme = Theme