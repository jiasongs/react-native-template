'use strict';
import { StyleSheet } from 'react-native';

export default {
  /**
   * @通用设置
   */
  pageBackgroundColor: '#f7f7f7',

  /**
   * @弹窗提示组件的设置
   */
  alertWidth: 260,
  alertMinHeight: 52,
  alertTitleMaxWidth: 200,
  alertDetailMaxWidth: 230,
  alertActionHeight: 50,
  alertActionColor: '#348fe4',
  alertSeparatorColor: '#eaeaea',
  alertTitleFontSize: 16,
  alertTitleColor: '#000',
  alertDetailFontSize: 13,
  alertDetailColor: '#000',
  alertActionFontSize: 14,
  /**
   * @action组件的设置
   */
  actionMaxHeight: 230,
  actionTitleFontSize: 14,
  actionTitleColor: '#000',
  cancelTitleFontSize: 14,
  cancelTitleColor: 'red',
  titleFontSize: 12,
  titleColor: '#999',

  /**
   * @分享组件的样式
   */
  shareBackColor: '#eeeeee',
  shareActionWidth: 50,
  shareActionHeight: 100,
  shareActionRadius: 7,
  shareActionTextColor: '#000000',
  shareCancelActionHeight: 90,
  shareCancelBackColor: '#fff',
  shareCancelTextColor: '#000000',
  /**
   * @地区选择组件的样式
   */
  areaActionTitleColor: '#5d7f3b',

  /**
   * @设置MenuManager的初始化配置 
   */
  menuOptions: {
    menuAlign: 'end',
    menuPopoverStyle: { backgroundColor: '#fff', },
    menuShowArrow: true,
    menuAnimated: true,
    menuOverlayOpacity: 0.3,
    menuShadow: false,
  },
  /**
   * @设置toastManager的初始化配置 
   */
  toastOptions: {
    position: 'center',
  },
  toastTextColor: '#fff',
  toastTextFontSize: 14,
  /**
   * @SegmentedView的设置
   */
  sbColor: '#fff',
  sbHeight: 40,
  sbBtnPaddingTop: 8,
  sbBtnPaddingBottom: 8,
  sbBtnPaddingLeft: 8,
  sbBtnPaddingRight: 8,
  sbBtnTitleColor: '#989898',
  sbBtnTextFontSize: 13,
  sbBtnActiveTitleColor: '#337ab7',
  sbBtnActiveTextFontSize: 13,
  sbIndicatorLineColor: '#337ab7',
  sbIndicatorLineWidth: 2,
  sbIndicatorPositionPadding: 0,
  /**
   * @SegmentedControlTab的设置
   */
  scTabColor: '#fff',
  scActiveTabColor: '#337ab7',
  scTabTextColor: '#337ab7',
  scActiveTabTextColor: '#fff',
  scTabTextFontSize: 14,
  scActiveTabTextFontSize: 14,
  scBorderWidth: StyleSheet.hairlineWidth,
  /**
   * @导航栏的设置
   */
  navBarPadding: 0,
  navBarBackgroundColor: '#333',
  navBarTitleColor: '#fff',
  navBarTitleFontSize: 16,
  navBarHeight: 44,
};