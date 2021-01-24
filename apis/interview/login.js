/*
 * @Description: 登录接口
 * @Version:
 * @Author: Chen
 * @Date: 2021-01-05 21:26:28
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-23 18:01:10
 */

import { LOGIN, REFRESH_TOKEN } from "../InterviewUrlConfig";
import axios from "../AxiosConfig";

// 登录
export const login = (data) => {
	return axios.post(LOGIN, data);
};

// 刷新token
export const refreshToken = (refreshToken) => {
	return axios.post(REFRESH_TOKEN, refreshToken);
};
