'use strict';

const HOST = 'https://cnodejs.org';
const API_HOST = HOST + '/api/';

export default {
  /**
   * @系统 [HOST]
   */
  HOST: HOST,
  API_HOST: API_HOST,

  /**
  * @资源 [APP图标]
  */
  ICON_APP: API_HOST + '/icon_app.png',

  /**
   * @业务接口 
   */
  GET_TOPICS: API_HOST + 'v1/topics',

};