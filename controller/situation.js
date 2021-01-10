/*
 * @Description: 面试情况表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-05 22:39:09
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-11 00:11:34
 */

import xss from "xss";

import Interview from "../db/models/Interviewees";
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
	const res = await Interview.find();
	return res;
};

// 添加面试者
export const addInterviewee = async (data) => {
	xssData(data);
	const majorName = await getMajorNameById(data.majorId);
	data.majorName = majorName;
	const channelName = await getChannelNameById(data.channelId);
	data.channelName = channelName;
	const res = await Interview.create(data);
	return res;
};

// 修改面试者
export const editInterviewee = async (data) => {
	xssData(data);
	const majorName = await getMajorNameById(data.majorId);
	data.majorName = majorName;
	const channelName = await getChannelNameById(data.channelId);
	data.channelName = channelName;
	const res = await Interview.findByIdAndUpdate(data.id, data, { new: true });
	return res;
};
