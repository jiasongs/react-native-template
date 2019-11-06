'use strict';
/**
 * 检查手机号是否正确
 * @param
 * @returns {Boolean}
 */
export function checkMobile(mobile) {
  const reg = new RegExp(/(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/);
  return reg.test(mobile);
}
/**
 * 检查是否为number类型
 * @param
 * @returns {Boolean}
 */
export function checkNumber(number) {
  const regPos = new RegExp(/^\d+(\.\d+)?$/); //非负浮点数
  const regNeg = new RegExp(
    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/,
  ); //负浮点数
  if (regPos.test(number) || regNeg.test(number)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 检查是否为空
 * @param
 * @returns {Boolean}
 */
export function checkEmpty(value) {
  if (typeof value === 'undefined') {
    return true;
  }
  if (value === null) {
    return true;
  }
  if (value === '') {
    return true;
  }
  return false;
}

/**
 * 检测字符串是否有中文
 * @param
 * @returns {Boolean}
 */
export function containsChinese(value) {
  const reg = new RegExp(/.*[\u4e00-\u9fa5]+.*$/);
  return reg.test(value);
}
/**
 * 转换
 * @param
 * @returns {String}
 */
export function conversionBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const k = 1000,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
/**
 * 以Base64位字符串数据的形式返回一个图片的source
 * @param
 * @returns {String}
 */
export function base64Prefix(data) {
  return `data:image/png;base64,${data}`;
}
/**
 * 阶乘算法
 * @param
 * @returns {Int}
 */
export function factorial(num) {
  if (num < 0) {
    return -1;
  } else if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
/**
 * 转换时分秒
 * @param
 * @returns
 */
export function conversionSeconds(seconds) {
  let arr = [
    parseInt(seconds / 60 / 60),
    parseInt((seconds / 60) % 60),
    parseInt(seconds % 60),
  ];
  return arr.join(':').replace(/\b(\d)\b/g, '0$1');
}

/**
 * 过滤掉false, null, 0, "", undefined, and NaN
 * @param array
 * @returns {Array}}
 */
export function bouncerEmpty(arr) {
  return arr.filter((val) => {
    return !(!val || val === '');
  });
}

/**
 *
 * 冒泡排序
 * @param array
 * @param sortType ascending descending
 * @returns array
 */
export function bubbleSort(array, sortType = 'ascending') {
  if (!Array.isArray(array)) {
    return array;
  }
  let arrayTemp = array.slice();
  for (let i = 0; i < arrayTemp.length; i++) {
    for (let j = 0; j < arrayTemp.length - i - 1; j++) {
      const element = arrayTemp[j];
      const element1 = arrayTemp[j + 1];
      if (parseInt(element1) < parseInt(element)) {
        arrayTemp[j] = element1;
        arrayTemp[j + 1] = element;
      }
    }
  }
  return sortType === 'ascending' ? arrayTemp : arrayTemp.reverse();
}
/**
 *
 * 判断是否是对象
 * @param any
 * @returns bool
 */
export function isObject(payload) {
  return Object.prototype.toString.call(payload) === '[object Object]';
}
/**
 *
 * 去空
 * @param any
 * @returns any
 */
export function deleteEmpty(payload) {
  if (checkEmpty(payload)) {
    return '';
  }
  return payload;
}
/**
 *
 * 去空（数组）
 * @param array
 * @returns array
 */
export function deleteEmptyInArray(payload) {
  let newPayload = [];
  if (Array.isArray(payload)) {
    payload.forEach((item) => {
      newPayload.push(deleteEmptyProperty(item));
    });
  } else {
    newPayload = deleteEmpty(payload);
  }
  return newPayload;
}
/**
 *
 * 去空（对象）
 * @param object
 * @returns object
 */
export function deleteEmptyInObject(payload) {
  let newPayload;
  if (isObject(payload)) {
    newPayload = { ...payload };
    for (const key in newPayload) {
      newPayload[key] = deleteEmptyProperty(newPayload[key]);
    }
  } else {
    newPayload = deleteEmpty(payload);
  }
  return newPayload;
}
/**
 *
 * 去空（任意）
 * @param any
 * @returns any
 */
export function deleteEmptyProperty(payload) {
  let newPayload;
  if (Array.isArray(payload)) {
    newPayload = deleteEmptyInArray(payload);
  } else if (isObject(payload)) {
    newPayload = deleteEmptyInObject(payload);
  } else {
    newPayload = deleteEmpty(payload);
  }
  return newPayload;
}

// /**
//  * 转换时间戳
//  * @param 时间戳
//  * @returns
//  */
// export function formatTimeStamp(dateTimeStamp) {
//   const minute = 1000 * 60, hour = minute * 60, day = hour * 24, week = day * 7, month = day * 30;
//   // const nowTime = Moment().format('x');   //获取当前时间毫秒
//   const diffValue = nowTime - parseInt(dateTimeStamp);  //时间差
//   if (diffValue < 0) {
//     return dateTimeStamp;
//   }
//   let result;
//   const minC = diffValue / minute, hourC = diffValue / hour, dayC = diffValue / day, weekC = diffValue / week, monthC = diffValue / month;
//   if (monthC >= 1 && monthC <= 3) {
//     result = `${parseInt(monthC)} 月前`;
//   } else if (weekC >= 1 && weekC <= 3) {
//     result = `${parseInt(weekC)} 周前`;
//   } else if (dayC >= 1 && dayC <= 6) {
//     result = `${parseInt(dayC)} 天前`;
//   } else if (hourC >= 1 && hourC <= 23) {
//     result = `${parseInt(hourC)} 小时前`;
//   } else if (minC >= 1 && minC <= 59) {
//     result = `${parseInt(minC)} 分钟前`;
//   } else if (diffValue >= 0 && diffValue <= minute) {
//     result = '刚刚';
//   } else {
//     result = Moment(parseInt(dateTimeStamp)).format('YYYY-MM-DD');
//   }
//   return result;
// }
