/*
 * @Description: 面试情况接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:41:03
 * @LastEditors: Chen
 * @LastEditTime: 2021-04-25 22:26:00
 */

import {
	GET_JOIN_INFO_LIST,
    ADD_JOIN_INFO,
    EDIT_JOIN_INFO,
    HIDE_JOIN_INFO
} from "../InterviewUrlConfig";
import axios from "../AxiosConfig";

// 获取入职信息
export const getJoinInfoList = (data)=>{
    return axios.post(GET_JOIN_INFO_LIST,data);
}

// 新增入职信息
export const addJoinInfo = (data)=>{
    return axios.post(ADD_JOIN_INFO,data);
}

// 编辑入职信息
export const editJoinInfo = (data)=>{
    return axios.post(EDIT_JOIN_INFO,data);
}

// 删除入职信息
export const hideJoinInfo = (data)=>{
    return axios.post(HIDE_JOIN_INFO,data);
}
