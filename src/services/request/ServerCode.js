'use strict';
/**
 * @状态码
 */
export default {
  /**
   * @成功 
   */
  SUCCESS_CODE: 0,
  SUCEESS_MSG: '请求成功',
  /**
   * @失败 
   */
  FAIL_CODE: 1,
  FAIL_MSG: '请求失败',
  /**
   * @超时 
   */
  OVERTIME_CODE: 50100,
  OVERTIME_MSG: '请求超时',
  /**
   * @404 [未找到页面]
   */
  NOT_FOUND_CODE: 40400,
  NOT_FOUND_MSG: '',
  /**
   * @过期 [token过期]
   */
  TOKEN_EXPIRED_CODE: 40010,
  TOKEN_EXPIRED_MSG: 'Token已过期，请重新登录',
  /**
   * @服务器不通 [详细描述]
   */
  SERVER_ERROR_CODE: 50000,
  SERVER_ERROR_MSG: '服务器请求失败，请稍后重试'
};





