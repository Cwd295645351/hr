/*
 * @Description: 公共接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:44:44
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-13 22:17:31
 */

import { GET_CONFIG, GET_INTERVIEWER_LIST, GET_JOB_LIST, GET_STATUS_LIST, GET_CHANNEL_LIST } from "./InterviewUrlConfig";
import axios from "./AxiosConfig";

// 获取配置
export const getConfig = () => {
	return axios.get(GET_CONFIG);
};

// 获取渠道列表
export const getInterviewerList = () => {
	return axios.get(GET_INTERVIEWER_LIST);
};

// 获取职位列表
export const getJobList = () => {
	return axios.get(GET_JOB_LIST);
};

// 获取渠道列表
export const getChannelList = () => {
	return axios.get(GET_CHANNEL_LIST);
};

// 获取状态列表
export const getStatusList = () => {
	return axios.get(GET_STATUS_LIST);
};

