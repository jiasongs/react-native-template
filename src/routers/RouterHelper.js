'use strict';
import { StackActions } from '@react-navigation/routers';

export default class RouterHelper {
  /**
   * @导航实例
   */
  static navigation = null;
  /**
   * @上次执行to方法的时间
   */
  static lastActionTime = 0;
  /**
   * @重复点击判断间隔时间
   */
  static interval = 600;
  /**
   * @列表保存路由栈信息
   */
  static routerStacks = [];
  /**
   * @未登录忽略名单 跳转时跳到登录界面
   */
  static loginIgnoreRoute = [];

  static checkActionState() {
    if (!this.navigation) {
      // eslint-disable-next-line no-console
      console.error('请先初始化路由');
      return true;
    }
    const nowTime = new Date().getTime();
    if (nowTime - this.lastActionTime <= this.interval) {
      return true;
    }
    this.lastActionTime = nowTime;
    return false;
  }

  // 拦截路由
  static interceptRouter(routeName, params) {
    if (routeName || params) {
    }
    return false;
  }

  static initRouter(navition) {
    this.setRouter(navition);
  }

  static setRouter(navition) {
    if (navition) {
      this.setNavigation(navition);
      this.setRouterStacks(navition.state ? navition.state.routes : []);
    }
  }

  static setNavigation(navigation) {
    this.navigation = navigation;
  }

  static setRouterStacks(routerStacks = []) {
    this.routerStacks = routerStacks;
  }

  // 最好使用这个
  static navigate(routeName, params = {}) {
    if (this.checkActionState()) {
      return;
    }
    if (this.interceptRouter(routeName, params)) {
      return;
    }
    this.navigation.navigate(routeName, params);
  }

  static push(routeName, params = {}) {
    if (this.checkActionState()) {
      return;
    }
    if (this.interceptRouter(routeName, params)) {
      return;
    }
    this.navigation.push(routeName, params);
  }

  static goBack(routeName) {
    if (this.checkActionState()) {
      return;
    }
    if (routeName) {
      const index = this.routerStacks.findIndex(
        (item) => routeName === item.routeName,
      );
      if (index >= 0) {
        const navTarget = this.routerStacks[index + 1];
        this.navigation.goBack(navTarget.key);
      }
    } else {
      this.navigation.goBack(null);
    }
  }

  static dismiss() {
    if (this.checkActionState()) {
      return;
    }
    this.navigation.dismiss();
  }

  static pop(number, params = {}) {
    if (this.checkActionState()) {
      return;
    }
    this.navigation.pop(number, params);
  }

  static popToTop(params = {}) {
    if (this.checkActionState()) {
      return;
    }
    this.navigation.popToTop(params);
  }

  static replace(routeName, params = {}) {
    if (this.checkActionState()) {
      return;
    }
    const replaceAction = StackActions.replace({
      routeName: routeName,
      params: params,
    });
    this.navigation.dispatch(replaceAction);
  }

  static reset(routeName, params = {}) {
    if (this.checkActionState()) {
      return;
    }
    this.navigation.reset(
      [NavigationActions.navigate({ routeName, params })],
      0,
    );
  }
}
