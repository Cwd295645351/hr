/*
 * @Description: 面试统计信息接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:48:58
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-23 13:52:47
 */
import {
	GET_INTERVIEW_STATISTICS,
	GET_ENTRY_RATE
} from "../InterviewUrlConfig";
import axios from "../AxiosConfig";

export const getInterviewStatistics = (params) => {
	return axios.get(GET_INTERVIEW_STATISTICS, { params: params });
};

export const getEntryRate = (params) => {
	return axios.get(GET_ENTRY_RATE, { params: params });
};
