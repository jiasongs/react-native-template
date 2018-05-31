'use strict';
import { StackActions, NavigationActions } from 'react-navigation'

class RouteHelper {

    // navigation的实例
    static navigation = null;
    // 上次执行to方法的时间
    static lastActionTime = 0;
    // 重复点击判断间隔时间,单位毫秒
    static interval = 500;
    // 列表保存路由栈信息
    static routeStack = [];
    // 路由拦截器
    static routeInterceptor;

    static addStack(navigation) {
        if (this.routeStack.findIndex((item) => navigation.state.key === item.state.key) === -1) {
            this.navigation = navigation;
            this.routeStack.push(navigation);
        }
    }

    static remove(navigation) {
        let index = this.routeStack.findIndex((item) => navigation.state.key === item.state.key);
        if (index !== -1) {
            this.routeStack.splice(index, 1);
            this.navigation = this.routeStack[this.routeStack.length - 1]
        }
    }
    // 最好使用这个
    static navigate(routeName, params, delay = true) {
        let nowTime = new Date().getTime();
        if ((nowTime - this.lastActionTime) <= this.interval && delay) {
            console.warn('间隔时间内重复点击了');
            return
        }
        if (this.routeInterceptor && !this.routeInterceptor(routeName, params)) {
            // console.log('路由跳转被拦截');
            return;
        }
        if (!this.navigation) {
            console.error('请先初始化路由');
            return
        }
        this.lastActionTime = nowTime;
        this.navigation.navigate(routeName, params);
    }

    static goBack(routeName) {
        if (routeName) {
            const index = this.routeStack.findIndex((item) => routeName === item.state.routeName)
            const navTarget = this.routeStack[index + 1]
            const key = navTarget.state.key;
            this.navigation.goBack(key);
        } else {
            this.navigation.goBack()
        }
    }

    static push(routeName, params, delay = true) {
        let nowTime = new Date().getTime();
        if ((nowTime - this.lastActionTime) <= this.interval && delay) {
            console.warn('间隔时间内重复点击了');
            return
        }
        if (this.routeInterceptor && !this.routeInterceptor(routeName, params)) {
            // console.log('路由跳转被拦截');
            return;
        }
        if (!this.navigation) {
            console.error('请先初始化路由');
            return
        }
        this.lastActionTime = nowTime;
        this.navigation.push(routeName, params);
    }

    static pop(n, params) {
        this.navigation.pop(n, params)
    }

    static popToTop(params) {
        this.navigation.popToTop(params)
    }

    static replace(routeName, params) {
        this.navigation.replace(routeName, params)
    }

    static reset(routeName) {

        let resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName })
            ]
        });
        this.navigation.dispatch(resetAction);
    }
}

export default RouteHelper
