/*
 * @Description: 登录接口
 * @Version:
 * @Author: Chen
 * @Date: 2021-01-05 21:26:28
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 21:32:12
 */

import { LOGIN } from "../URLConfig";
import axios from "../AxiosConfig";

export const login = (data) => {
	return axios.post(LOGIN, data);
};
