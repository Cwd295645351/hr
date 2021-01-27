/*
 * @Description: 面试情况接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:41:03
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-27 22:02:00
 */

import {
	GET_INTERVIEW_LIST,
	ADD_INTERVIEWEE,
	EDIT_INTERVIEWEE,
	DELETE_INTERVIEWEE
} from "../InterviewUrlConfig";
import axios from "../AxiosConfig";

// 获取面试情况
export const getInterviewList = (data)=>{
    return axios.post(GET_INTERVIEW_LIST,data);
}

// 新增面试者
export const addInterviewee = (data)=>{
    return axios.post(ADD_INTERVIEWEE,data);
}

// 修改面试者
export const editInterviewee = (data)=>{
    return axios.post(EDIT_INTERVIEWEE,data);
}

// 删除面试者
export const deleteInterviewee = (data)=>{
    return axios.post(DELETE_INTERVIEWEE,data);
}
