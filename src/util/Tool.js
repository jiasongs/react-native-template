/**
 * Created by zhuoy on 2017/6/27.
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       */

import {
    Dimensions,
    PixelRatio,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

const pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;                           //iphone6的像素密度
//px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例

const fontSize = (size) => {
    if (pixelRatio === 2) {
        // iphone 5s and older Androids
        if (deviceWidth < 360) {
            return size * 0.95;
        }
        // iphone 5
        if (deviceHeight < 667) {
            return size;
            // iphone 6-6s
        } else if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.15;
        }
        // older phablets
        return size * 1.25;
    }
    if (pixelRatio === 3) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size;
        }
        // Catch other weird android devicedevicedeviceWidth sizings
        if (deviceHeight < 667) {
            return size * 1.15;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.2;
        }

        // catch larger devices
        // ie iphone 6s plus / 7 plus / mi note 等等
        return size * 1.27;
    }
    if (pixelRatio === 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size;
            // Catch other smaller android deviceHeight sizings
        }
        if (deviceHeight < 667) {
            return size * 1.20;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.25;
        }
        // catch larger phablet devices
        return size * 1.27;
    }
    // if older device ie pixelRatio !== 2 || 3 || 3.5
    return size;
};

const scaleSize = (size) => {
    size = Math.round(size * scale + 0.5);
    return size / defaultPixel;
}
/**
     * 判断是否是手机号
     * @param mobile
     * @returns {boolean}
     */
const isMobile = (mobile) => {
    let myreg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    let re2 = new RegExp(myreg);
    return re2.test(mobile);
}
/**
   * 表单手机号验证过程
   * @param mobile  手机号
   * @returns {boolean}  为true进行下一步
   */
const checkMobile = (mobile) => {
    if (isEmpty(mobile)) {
        // Toast.fail('请输入手机号');
        return false;
    }
    if (!isMobile(mobile)) {
        alert('mobile')
        // Toast.fail('请输入正确的手机号');
        return false;
    }
    return true
}

/**
 * 表单密码验证过程
 * @param mobile  密码
 * @returns {boolean}  为true进行下一步
 */
const checkPassword = (password) => {
    if (isEmpty(password)) {
        // Toast.fail('请输入密码');
        return false;
    }
    if (password.length < 6) {
        // Toast.fail('密码不能少于6位');
        return false;
    }
    return true
}

const isNumber = (val) => {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}
/**
 * 检测字符串是否为空
 * @param s
 * @returns {boolean}
 */
const isEmpty = (s) => {
    if (typeof (s) === "undefined") return true;
    if (s === null) return true;
    if (s === '') return true;
    return false;
}

/**
 * 检测字符串是否有中文
 * @param s
 * @returns {boolean}
 */
const containsChinese = (input) => {
    if (input) {
        return /.*[\u4e00-\u9fa5]+.*$/.test(input)
    }
}
/**
  * Js 数据容量单位转换(kb,mb,gb,tb)
  * @param bytes
  * @returns {*}
  */
const bytesToSize = (bytes) => {
    if (bytes === 0) return '0 B';
    let k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
/**
     *
     * 以Base64位字符串数据的形式返回一个图片的source
     * @param data
     * @returns {{uri: string}}
     */
const base64Image = (data) => {
    return `data:image/png;base64,${data}`
}
/**
     *
     * 阶乘算法
     * @param number
     * @returns number
     */
const factorial = (num) => {
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        return (num * factorial(num - 1));
    }
}
/**
   * 时间秒数格式化
   * @param s 时间戳（单位：秒）
   * @returns {*} 格式化后的时分秒
   */
const sec_to_time = (seconds) => {
    let arr = [
        parseInt(seconds / 60 / 60),
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
    ]
    return arr.join(":").replace(/\b(\d)\b/g, "0$1");
}
/**
   * 时间秒数格式化
   * @param s 时间戳（单位：秒）
   * @returns {*} 格式化后的天时分秒
   */
const sec_to_time_day = (seconds) => {
    let h = parseInt(seconds / 60 / 60)
    let day = 0
    if (h > 24) {
        day = parseInt(h / 24)
        h = h - day * 24
    }
    let arr = [
        day,
        h,
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
    ]
    return arr;
}
/**
 * 过滤掉false, null, 0, "", undefined, and NaN
 * @param {*} arr 
 */
const bouncer = (arr) => {
    return arr.filter((val) => {
        return !(!val || val === "");
    })
}

export {
    scaleSize,
    fontSize,
    isMobile,
    checkMobile,
    checkPassword,
    isEmpty,
    containsChinese,
    bytesToSize,
    base64Image,
    factorial,
    sec_to_time,
    bouncer,
    isNumber,
    sec_to_time_day
}