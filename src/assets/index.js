'use strict';
import { ThemeManager } from '../config/themes/index';

export const Images = {
  /**
   * @JSON [动画的JSON文件]
   */
  json_loading: require('./json/loading.json'),

  /**
   * @Common [通用]
   */
  icon_network_err: require('./icon/icon_network_err.png'),
  icon_no_record: require('./icon/icon_no_record.png'),
  icon_nav_left: require('./icon/icon_nav_left.png'),
  icon_arrow_right: require('./icon/icon_arrow_right.png'),

  /**
   * @Toast [轻提示]
   */
  get icon_toast_fail() {
    const type = ThemeManager.currentTheme.type;
    switch (type) {
      case 1:
        return require('./icon/icon_toast_fail.png');
      case 2:
        return require('./icon/icon_toast_fail.png');
      default:
        return null;
    }
  },
  icon_toast_loading: require('./icon/icon_toast_loading.png'),
  icon_toast_success: require('./icon/icon_toast_success.png'),
  icon_toast_warn: require('./icon/icon_toast_warn.png'),

  /**
   * @Share [分享]
   */

  /**
   * @CHAT [聊天组件]
   */

  /**
   * @TABBAR [Tabbar]
   */
  // icon_tabbar_home: require('./tabbar/icon_tabbar_home.png'),
  // icon_tabbar_chat: require('./tabbar/icon_tabbar_chat.png'),
  // icon_tabbar_mine: require('./tabbar/icon_tabbar_mine.png'),
  // icon_tabbar_home_cur: require('./tabbar/icon_tabbar_home_cur.png'),
  // icon_tabbar_mine_cur: require('./tabbar/icon_tabbar_mine_cur.png'),

  /**
   * @ICONS [项目Icon]
   */

  /**
   * @IMAGES [项目Image]
   */
};
