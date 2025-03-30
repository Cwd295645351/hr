/*
 * @Description: 公共接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:44:44
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-20 23:36:37
 */

import {
	GET_CONFIG,
	GET_INTERVIEWER_LIST,
	GET_JOB_LIST,
	GET_STATUS_LIST,
	GET_CHANNEL_LIST,
	GET_CITY_LIST,
	NOT_EVALUATE_LIST
} from "./InterviewUrlConfig";
import axios from "./AxiosConfig";

// 获取配置
export const getConfig = () => {
	return axios.get(GET_CONFIG);
};

// 获取渠道列表
export const getInterviewerList = (isLeader = false) => {
	return axios.get(`${GET_INTERVIEWER_LIST}?isLeader=${isLeader}`);
};

// 获取职位列表
export const getJobList = () => {
	return axios.get(GET_JOB_LIST);
};

// 获取职位列表
export const getCityList = () => {
	return axios.get(GET_CITY_LIST);
};

// 获取渠道列表
export const getChannelList = () => {
	return axios.get(GET_CHANNEL_LIST);
};

// 获取状态列表
export const getStatusList = () => {
	return axios.get(GET_STATUS_LIST);
};

// 获取未给出评价的面试官信息
export const getNotEvaluateList = (userId) => {
	return axios.get(`${NOT_EVALUATE_LIST}?userId=${userId}`);	
}
