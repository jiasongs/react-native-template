'use strict';
import queryString from 'query-string';

// 默认选项配置
const _settings = {
    url: '',
    method: 'GET',
    headers: {},
    data: null,
    query: null,
    dataType: '',
    cache: true,
    accepts: {
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
    },
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
}
// 匹配所有资源类型
const _allType = '*/' + '*'
const _objToString = Object.prototype.toString;


/**
 * [classOf 检测是否属于指定的类型]
 * className 首字母需要大写
 */
function classOf(obj, className) {
    return _objToString.call(obj) === '[object ' + className + ']';
}

/**
 * [isPlainObject 检测对象是否是纯粹的由Object创建的对象]
 * 1. 排除Null和非Object类型的对象
 * 2. 排除宿主对象
 * 3. 排除不是由Object构造函数创建的对象(这也包括了宿主对象)
 */
function isPlainObject(obj) {
    var constructor, proto,
        fnToString = Function.prototype.toString;

    // IE7/8里的宿主对象是Object类型，而且它们的toString也是Object类型
    if (!obj || !classOf(obj, 'Object') || typeof obj.toString !== 'function') {
        return false;
    }

    if (typeof Object.getPrototypeOf === 'function') {
        proto = Object.getPrototypeOf(obj);
    }

    // Object.prototype 等于 null
    if (proto === null) {
        return true;
    }

    constructor = proto ? proto.constructor : obj.constructor;

    // IE7里的宿主对象的constructor是undefined
    return typeof constructor === 'function' &&
        fnToString.call(constructor) === fnToString.call(Object);
}

/**
 * [isArray 检测是否是数组类型]
 */
function isArray(obj) {
    return classOf(obj, 'Array');
}

/**
 * [extend 将一个或多个对象的属性复制到另一个指定的对象上]
 */
function extend(target) {
    var args = [].slice.call(arguments, 1),
        source;

    while (!!(source = args.shift())) {
        for (let name in source) {
            let copy = source[name];
            let src = target[name];

            if (isPlainObject(copy)) {
                src = isPlainObject(src) ? src : {};
                target[name] = extend(src, copy);

            } else if (isArray(copy)) {
                src = isArray(src) ? src : [];
                target[name] = extend(src, copy);

            } else {
                target[name] = copy;
            }
        }
    }

    return target;
}
function initSettings(settings) {
    // fetch 选项 // 组合默认设置与用户设置
    let options = {}, s = extend({}, _settings, settings);

    s.method = s.method.toUpperCase();

    s.dataType = s.dataType.toLowerCase();

    // GET/HEAD请求不能设置body
    s.hasBody = !/^(?:GET|HEAD)$/.test(s.method);

    // 格式化query为querystring
    s.query = queryString.stringify(s.query || null);
    //格式化data为JSONstring
    s.data = JSON.stringify(s.data || null);


    if (!s.hasBody) {
        // 如果设置了data，将它追加到query中
        if (s.data) {
            s.query += (s.query ? '&' : '') + s.data;
        }
        // 如果设置为不缓存，在query中追加时间戳
        if (s.cache === false) {
            s.query += (s.query ? '&' : '') + '_=' + Date.now();
        }

    } else {
        if (s.data) {
            options.body = s.data;
            s.headers['Content-Type'] = s.contentType;
        }
    }

    s.url += (s.query ? (/\?/.test(s.url) ? '&' : '?') + s.query : '');

    // q=0.01 表示权重，数字越小权重越小
    let accept = s.accepts[s.dataType];
    s.headers.Accept = accept ? (accept + ', ' + _allType + '; q=0.01') : _allType;

    options.method = s.method;
    options.headers = s.headers;
    return { s, options }
}

export default {
	/**
	 * [request 包装参数和Body]
	 * @param  initSettings
	 * @return { s, options }
	 */
    initSettings,
	/**
	 * [request 包装fetch]
	 * @param  settings
	 * @return promise
	 */
    request(settings) {
        const { s, options } = initSettings(settings)
        console.log(s.url)
        return fetch(s.url, options).then((res) => {
            let status = res.status;
            if (res.ok && status >= 200 && status < 300 || status === 304) {
                let dataType = s.dataType || res.headers.get('Content-Type');

                if (dataType.match(/json/)) {
                    return Promise.all([res.json(), res]);
                } else {
                    return Promise.all([res.text(), res]);
                }

            } else {
                let error = status + ' ' + (res.statusText || '');
                console.log('error')
                console.log(error)
                return Promise.reject(error || 'error');
            }
        })
    },

	/**
	 * [get 快捷方法]
	 * @param  {[type]} url   [description]
	 * @param  {[type]} query [description]
	 * @return promise
	 */
    get(url, query) {
        return this.request({
            url: url,
            method: 'GET',
            query: query
        });
    },

	/**
	 * [post 快捷方法]
	 * @param  {[type]} url  [description]
	 * @param  {[type]} data [description]
	 * @return promise
	 */
    post(url, data) {
        return this.request({
            url: url,
            method: 'POST',
            data: data
        });
    },
    // {
    // 	table:'table_name',
    // 	where:[
    // 		['hongqiu','>','20180414'],['hongqiu','<','20180414']
    // 	],
    // 	limit:10,
    // 	page:10,
    // }
    // {
    // 	table:'table_name',
    // 	data:[{
    // 		key:val
    // 	},{

    // 	}
    // 	]
    // }
}
'Services'









