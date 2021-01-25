/*
 * @Description: axios配置
 * @Version:
 * @Author: Chen
 * @Date: 2021-01-05 21:28:12
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-25 21:47:10
 */

import Axios from "axios";
import { Message } from "element-ui";
import * as tools from "../utils/tools";

Axios.interceptors.request.use(
	(config) => {
		const userInfo = tools.getUserInfo();
		config.headers.Authorization = userInfo
			? `Bearer ${userInfo.accessToken}`
			: "";
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

Axios.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		if (err && err.response && err.response.status) {
			switch (err.response.status) {
				case 401:
					Message.warning("登录信息过期，请重新登录");
					tools.logout();
					break;
				default:
					return Promise.reject(err);
			}
		}
	}
);

export default Axios;
