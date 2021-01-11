/*
 * @Description: 面试情况表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-05 22:39:09
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-11 23:56:59
 */

import xss from "xss";
import mongoose from "../db/db";

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
export const getList = async (params) => {
	let mp = {};
	const pageIndex = params.pageIndex < 0 ? 0 : params.pageIndex;
	const pageSize = params.pageSize;
	for (let i in params) {
		if (params[i] && i != "pageIndex" && i != "pageSize") {
			mp[i] = new RegExp(params[i], "ig");
		}
	}

	console.log("查询条件:", mp);
	const res = await Interview.find(mp)
		.skip(pageIndex * pageSize)
		.limit(pageSize);
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
	const res = await Interview.findOneAndUpdate(
		{
			_id: mongoose.Types.ObjectId(data.id),
			userId: data.userId
		},
		{
			date: data.date,
			majorId: data.majorId,
			majorName: data.majorName,
			name: data.name,
			phoneNum: data.phoneNum,
			email: data.email,
			channelId: data.channelId,
			channelName: data.channelName,
			status: data.status,
			schedules: data.schedules,
			phoneInterviewSituation: data.phoneInterviewSituation,
			remark: data.remark
		},
		{ new: true }
	);
	console.log("结果：",res);
	return res;
};
