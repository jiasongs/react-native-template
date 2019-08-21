'use strict';
import QueryString from 'query-string';
import FetchBlob from 'rn-fetch-blob';
import ServerCode from './ServerCode';

const loggerTrueColor = 'color: #1ba01b';
const loggerFalseColor = 'color: #f00';

const useFormData = true;
/**
 * @默认选项配置
 */
const _settings = {
  url: '',
  method: 'GET',
  headers: {},
  data: null,
  timeout: 5000,
  query: null,
  dataType: 'json',
  cache: true,
  useFormData: useFormData,
  accepts: {
    text: 'text/plain',
    html: 'text/html',
    xml: 'application/xml, text/xml',
    json: 'application/json, text/javascript'
  },
  contentType: useFormData ? 'multipart/form-data; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8',
};

/**
 * @匹配所有资源类型
 */
const _allType = '*/' + '*';


function configSettings(settings) {
  // fetch 选项 // 组合默认设置与用户设置
  let options = {}, newSettings = { ..._settings, ...settings };
  newSettings.method = newSettings.method.toUpperCase();
  newSettings.dataType = newSettings.dataType.toLowerCase();
  // GET/HEAD请求不能设置body
  newSettings.hasBody = !/^(?:GET|HEAD)$/.test(newSettings.method);
  // 格式化query为querystring
  newSettings.query = QueryString.stringify(newSettings.query || null);
  if (newSettings.uploadFormData && Array.isArray(newSettings.uploadFormData)) {
    let newFormData = [];
    newSettings.uploadFormData.forEach(item => {
      if (item.filename) {
        let path = item.data;
        path = path.startsWith('file://') ? path.slice(7) : path;
        item.data = FetchBlob.wrap(path);
      }
      newFormData.push(item);
    });
    newSettings.uploadFormData = newFormData;
  } else {
    newSettings.uploadFormData = null;
  }
  if (newSettings.data) {
    if (newSettings.useFormData) {
      let formData = new FormData();
      for (const key in newSettings.data) {
        if (Object.prototype.hasOwnProperty.call(newSettings.data, key)) {
          let value = newSettings.data[key];
          if (value === undefined || value === null) {
            value = '';
          } else if (value.slice) {
            let newValue = value.slice();
            if (newValue && (Array.isArray(newValue) || typeof newValue === 'object')) {
              value = JSON.stringify(newValue);
            }
          }
          formData.append(key, value);
        }
      }
      newSettings.data = formData;
    } else {
      newSettings.data = JSON.stringify(newSettings.data);
    }
  } else {
    newSettings.data = null;
  }
  if (!newSettings.hasBody) {
    // 如果设置了data，将它追加到query中
    if (newSettings.data) {
      newSettings.query += (newSettings.query ? '&' : '') + newSettings.data;
    }
    // 如果设置为不缓存，在query中追加时间戳
    if (newSettings.cache === false) {
      newSettings.query += (newSettings.query ? '&' : '') + '_=' + Date.now();
    }
  } else {
    if (newSettings.data) {
      options.body = newSettings.data;
      newSettings.headers['Content-Type'] = newSettings.contentType;
    } else if (newSettings.uploadFormData) {
      newSettings.headers['Content-Type'] = 'multipart/form-data; charset=UTF-8';
    }
  }
  newSettings.url += (newSettings.query ? (/\?/.test(newSettings.url) ? '&' : '?') + newSettings.query : '');
  // q=0.01 表示权重，数字越小权重越小
  let accept = newSettings.accepts[newSettings.dataType];
  newSettings.headers.Accept = accept ? (accept + ', ' + _allType + '; q=0.01') : _allType;
  options.method = newSettings.method;
  options.headers = newSettings.headers;
  return { newSettings, options };
}

function timeoutPromise(settings) {
  const { newSettings } = settings;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: ServerCode.OVERTIME_CODE, data: null, msg: ServerCode.OVERTIME_MSG });
    }, newSettings.timeout);
  });
}

function fetchPromise(settings) {
  const { newSettings, options } = settings;
  return fetch(newSettings.url, options)
    .then((response) => {
      const status = response.status;
      if (response.ok && status >= 200 && status < 300 || status === 304) {
        const dataType = newSettings.dataType || response.headers.get('Content-Type');
        if (dataType.match(/json/)) {
          return response.json();
        } else {
          return response.text();
        }
      } else {
        let error = {
          status,
          errorDetail: response.text(),
        };
        return Promise.reject(error);
      }
    })
    .then((result) => {
      if (__DEV__) {
        try {
          console.group('%c请求数据', loggerTrueColor);
          console.log(`%c请求接口(${options.method})——>>`, loggerTrueColor, newSettings.url);
          if (options.method === 'GET') {
            console.log('%c请求参数(QUERY)——>>', loggerTrueColor, QueryString.parse(newSettings.query));
          } else {
            if (newSettings.useFormData) {
              console.log('%c请求内容(FORMDATA)——>>', loggerTrueColor, newSettings.data._parts);
            } else {
              console.log('%c请求内容(JSON)——>>', loggerTrueColor, JSON.parse(newSettings.data));
            }
          }
          console.log('%c请求结果——>>', loggerTrueColor, result);
          console.groupEnd();
        } catch (error) {
          console.log('%c打印出错——>>', loggerFalseColor, error);
        }
      }

      return Promise.resolve(result);
    })
    .catch(async (error) => {
      if (__DEV__) {
        try {
          let errorDetail = await error.errorDetail;
          console.group('%c请求数据', loggerFalseColor);
          console.log(`%c请求接口(${options.method})——>>`, loggerFalseColor, newSettings.url);
          if (options.method === 'GET') {
            console.log('%c请求参数(QUERY)——>>', loggerFalseColor, QueryString.parse(newSettings.query));
          } else {
            if (newSettings.useFormData) {
              console.log('%c请求内容(FORMDATA)——>>', loggerFalseColor, newSettings.data._parts);
            } else {
              console.log('%c请求内容(JSON)——>>', loggerFalseColor, JSON.parse(newSettings.data));
            }
          }
          console.log('%c请求失败——>>', loggerFalseColor, error.status, errorDetail);
          console.groupEnd();
        } catch (error) {
          console.log('%c打印出错——>>', loggerFalseColor, error);
        }
      }
      return Promise.resolve({ code: ServerCode.FAIL_CODE, data: '', msg: error });
    });
}

function fetchBlobPromise(settings) {
  const { newSettings, options } = settings;
  return FetchBlob.config(newSettings.config)
    .fetch(options.method, newSettings.url, options.headers, newSettings.uploadFormData)
    .uploadProgress((written, total) => {
      console.log('uploaded', written / total);
    })
    .progress((received, total) => {
      console.log('progress', received / total);
    })
    .then((response) => {
      const info = response.info();
      if (info.status === 200) {
        if (info.respType === 'json') {
          return response.json();
        } else if (info.rnfbEncode === 'path') {
          return response.path();
        }
      } else {
        let error = {
          status: info.status,
          errorDetail: response.text(),
        };
        return Promise.reject(error);
      }
    })
    .then((result) => {
      if (__DEV__) {
        try {
          console.group('%c请求数据', loggerTrueColor);
          console.log(`%c请求接口(${options.method})——>>`, loggerTrueColor, newSettings.url);
          if (options.method === 'GET') {
            console.log('%c下载参数(QUERY)——>>', loggerTrueColor, QueryString.parse(newSettings.query));
          } else {
            if (newSettings.uploadFormData) {
              console.log('%c上传内容(FORMDATA)——>>', loggerTrueColor, newSettings.uploadFormData);
            }
          }
          console.log('%c请求结果——>>', loggerTrueColor, result);
          console.groupEnd();
        } catch (error) {
          console.log('%c打印出错——>>', loggerFalseColor, error);
        }
      }
      return Promise.resolve(result);
    })
    .catch(async (error) => {
      if (__DEV__) {
        try {
          let errorDetail = await error.errorDetail;
          console.group('%c请求数据', loggerFalseColor);
          console.log(`%c请求接口(${options.method})——>>`, loggerFalseColor, newSettings.url);
          if (options.method === 'GET') {
            console.log('%c下载参数(QUERY)——>>', loggerFalseColor, QueryString.parse(newSettings.query));
          } else {
            if (newSettings.uploadFormData) {
              console.log('%c上传内容(FORMDATA)——>>', loggerFalseColor, newSettings.uploadFormData);
            }
          }
          console.log('%c请求失败——>>', loggerFalseColor, error.status, errorDetail);
          console.groupEnd();
        } catch (error) {
          console.log('%c打印出错——>>', loggerFalseColor, error);
        }
      }
      return Promise.resolve({ code: ServerCode.FAIL_CODE, data: '', msg: error });
    });
}

/**
 * [request 包装fetch]
 * @param  settings
 * @return promise
 */
function request(settings) {
  const newSettings = configSettings(settings);
  const timeout = timeoutPromise(newSettings);
  const fetch = fetchPromise(newSettings);
  /**
  * @debug环境下安卓race方法有bug 
  */
  if (__ANDROID__ && __DEV__) {
    return fetch;
  }
  return Promise.race([timeout, fetch]);
}

function requestBlob(settings) {
  const newSettings = configSettings(settings);
  // const timeout = timeoutPromise(newSettings);
  const fetchBlob = fetchBlobPromise(newSettings);
  /**
   * @debug环境下安卓race方法有bug 
   */
  if (__ANDROID__ && __DEV__) {
    return fetchBlob;
  }
  return Promise.race([fetchBlob]);
}

/**
 * [get 快捷方法]
 * @param  {[type]} url   [description]
 * @param  {[type]} query [description]
 * @return promise
 */
function get(url, query, option) {
  const setting = {
    url: url,
    method: 'GET',
    query: { ...query },
    ...option
  };
  return request(setting);
}

/**
 * [post 快捷方法]
 * @param  {[type]} url  [description]
 * @param  {[type]} data [description]
 * @return promise
 */
function post(url, data, option) {
  const setting = {
    url: url,
    method: 'POST',
    data: { ...data },
    ...option
  };
  return request(setting);
}

/**
 * [upload 快捷方法]
 * @param  {[type]} url  [url]
 * @param  {[type]} formData [{name:'',data:''},{name:'',filename:'',data:''}]
 * @param  {[type]} query [参数]
 * ]
 * @return promise
 */
function upload(url, formData, option) {
  const setting = {
    url: url,
    method: 'POST',
    uploadFormData: formData,
    config: {},
    ...option
    // uploadProgress: null,
  };
  return requestBlob(setting);
}

/**
 * [upload 快捷方法]
 * @param  {[type]} url  [url]
 * @param  {[type]} formData [{name:'',data:''},{name:'',filename:'',data:''}]
 * @param  {[type]} query [参数]
 * ]
 * @return promise
 */
function download(url, query, option) {
  const urlArray = url.split('.');
  const setting = {
    url: url,
    method: 'GET',
    query: { ...query },
    config: { fileCache: true, appendExt: urlArray[urlArray.length - 1] },
    ...option
  };
  return requestBlob(setting);
}


export default {
  get,
  post,
  upload,
  download
};