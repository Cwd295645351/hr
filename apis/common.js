/*
 * @Description: 公共接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:44:44
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-24 17:16:22
 */

import { GET_MAJOR_LIST, GET_CHANNEL_LIST } from "./InterviewUrlConfig";
import axios from "./AxiosConfig";

// 获取专业列表
export const getMajorList = () => {
	console.log(GET_MAJOR_LIST)
	return axios.get(GET_MAJOR_LIST);
};

// 获取渠道列表
export const getChannelList = () => {
	return axios.get(GET_CHANNEL_LIST);
};

