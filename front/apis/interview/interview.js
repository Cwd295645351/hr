/*
 * @Description: 面试情况接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:41:03
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-01 12:42:19
 */

import {
	GET_INTERVIEW_LIST,
	ADD_INTERVIEWEE,
	IMPORT_INTERVIEWEE,
	EDIT_INTERVIEWEE,
	DELETE_INTERVIEWEE,
	CHANGE_INTERVIEWEE_SCHEDULE
} from "../InterviewUrlConfig";
import axios from "../AxiosConfig";

// 获取面试情况
export const getInterviewList = (data) => {
	return axios.post(GET_INTERVIEW_LIST, data);
};

// 新增候选人
export const addInterviewee = (data) => {
	return axios.post(ADD_INTERVIEWEE, data);
};

// 批量导入候选人
export const importInterviewee = (data) => {
	return axios.post(IMPORT_INTERVIEWEE, data);
};

// 修改候选人
export const editInterviewee = (data) => {
	return axios.post(EDIT_INTERVIEWEE, data);
};

// 修改候选人面试进程
export const changeSchedule = (data) => {
	console.log(1222);
	return axios.post(CHANGE_INTERVIEWEE_SCHEDULE, data);
};

// 删除候选人
export const deleteInterviewee = (data) => {
	return axios.post(DELETE_INTERVIEWEE, data);
};
