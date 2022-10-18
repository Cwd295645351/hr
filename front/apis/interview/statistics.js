/*
 * @Description: 面试统计信息接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:48:58
 * @LastEditors: Chen
 * @LastEditTime: 2021-05-09 16:39:43
 */
import {
	GET_INTERVIEW_STATISTICS,
	GET_ENTRY_RATE,
	GET_ORIGIN_NUM_LIST,
	ADD_ORIGIN_NUM,
	EDIT_ORIGIN_NUM,
	DELETE_ORIGIN_NUM,
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

// 获取初始简历列表
export const getOriginNumsList = (data) => {
	return axios.post(GET_ORIGIN_NUM_LIST, data);
};

// 新增初始简历数
export const addOriginNums = (data)=>{
    return axios.post(ADD_ORIGIN_NUM,data);
}

// 编辑初始简历数
export const editOriginNums = (data)=>{
    return axios.post(EDIT_ORIGIN_NUM,data);
}

// 删除初始简历数
export const deleteOriginNums = (data)=>{
    return axios.post(DELETE_ORIGIN_NUM,data);
}
