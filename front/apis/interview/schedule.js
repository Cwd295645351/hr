/*
 * @Description: 面试日程接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-28 21:24:52
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-28 21:26:06
 */
import { GET_SCHEDULE } from "../InterviewUrlConfig";
import axios from "../AxiosConfig";

export const getSchedule = (params) => {
	return axios.get(GET_SCHEDULE, { params: params });
};
