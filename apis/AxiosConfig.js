/*
 * @Description: axios配置
 * @Version:
 * @Author: Chen
 * @Date: 2021-01-05 21:28:12
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-24 17:22:19
 */

import Axios from "axios";
import refreshToken from "../apis/interview/login";
import tools from "../utils/tools";

Axios.interceptors.request.use(
	(config) => {
		const userInfo = sessionStorage.getItem("userInfo")
			? JSON.parse(sessionStorage.getItem("userInfo"))
			: null;
		if (userInfo) {
			config.headers.Authorization = "Bearer " + userInfo.accessToken;
		}
		// console.log(config);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

Axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		debugger;
		if (err && err.response && err.response.status) {
			switch (err.response.status) {
				case 500:
					// do something...
					break;
				case 401:
					const userInfo = tools.getInfo();
					console.log("userInfo", userInfo);
					// refreshToken();
					// do something...
					break;
				default:
					// do something...
					break;
			}
		}
		return Promise.reject(err);
	}
);

export default Axios;
