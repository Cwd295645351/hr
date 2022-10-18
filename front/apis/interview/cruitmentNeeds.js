/*
 * @Description: 招聘需求接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:41:03
 * @LastEditors: Chen
 * @LastEditTime: 2021-07-06 22:45:21
 */

import {
	GET_RECRUITMENT_LIST,
    ADD_RECRUITMENT,
	EDIT_RECRUITMENT,
	DELETE_RECRUITMENT
} from "../InterviewUrlConfig";
import axios from "../AxiosConfig";

// 获取面试情况
export const getCruitmentList = (data)=>{
    return axios.post(GET_RECRUITMENT_LIST,data);
}

// 新增面试者
export const addCruitment = (data)=>{
    return axios.post(ADD_RECRUITMENT,data);
}


// 修改面试者
export const editCruitment = (data)=>{
    return axios.post(EDIT_RECRUITMENT,data);
}

// 删除面试者
export const deleteCruitment = (data)=>{
    return axios.post(DELETE_RECRUITMENT,data);
}
