/*
 * @Description: 面试统计信息接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:48:58
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-27 23:43:40
 */
import {
	GET_INTERVIEW_STATISTICS,
	GET_ENTRY_RATE
} from "../InterviewUrlConfig";
import axios from "../AxiosConfig";

// 获取面试统计信息
export const getInterviewStatistics = (params) => {
	return axios.get(GET_INTERVIEW_STATISTICS, { params: params });
};

// 获取不同专业入职比例
export const getEntryRate = (params) => {
	return axios.get(GET_ENTRY_RATE, { params: params });
};
