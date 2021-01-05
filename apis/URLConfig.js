/*
 * @Description: url配置
 * @Version:
 * @Author: Chen
 * @Date: 2021-01-05 21:22:02
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 21:50:38
 */

const HOST =
	process.env == "production" ? window.location.origin : "http://127.0.0.1:3000";

export const LOGIN = `${HOST}/api/user/login`;