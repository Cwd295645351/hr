/*
 * @Description: 面试情况表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-05 22:39:09
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-10 17:36:23
 */

import xss from "xss";

import Interviewees from "../db/models/Interviewees";
import { getMajorNameById, getChannelNameById } from "./common";

// 遍历对象，将对象属性进行xss防御
const xssData = (data) => {
	if (typeof data == "string" || typeof data == "number") {
		return xss(data);
	} else {
		for (let key in data) {
			data[key] = xssData(data[key]);
		}
		return data;
	}
};

// 获取面试情况列表
export const getList = async () => {
	const res = await Interviewees.find();
	return res;
};

// 添加面试者
export const addInterviewee = async (data) => {
	xssData(data);
	console.log("test:", data);
	const majorName = await getMajorNameById(data.majorId);
	data.majorName = majorName;
	const channelName = await getChannelNameById(data.channelId);
	data.channelName = channelName;
	const res = await Interviewees.create(data);
	return res;
};
