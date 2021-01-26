/*
 * @Description: 面试情况表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-05 22:39:09
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-26 21:45:10
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

	if (params.beginDate && params.endDate) {
		mp.date = {
			$gte: new Date(params.beginDate),
			$lte: new Date(params.endDate)
		};
	} else if (params.beginDate && !params.endDate) {
		mp.date = {
			$gte: new Date(params.beginDate)
		};
	} else if (!params.beginDate && params.endDate) {
		mp.date = {
			$lte: new Date(params.endDate)
		};
	}
	mp.userId = params.userId;
	mp.majorId = new RegExp(params.majorId, "ig");
	mp.channelId = new RegExp(params.channelId, "ig");
	mp.name = new RegExp(params.name, "ig");
	mp.phoneNum = new RegExp(params.phoneNum, "ig");
	mp.email = new RegExp(params.email, "ig");
	if (params.status.length > 0) {
		mp.status = {
			$in: params.status
		};
	}

	const res = await Interview.find(mp)
		.skip(pageIndex * pageSize)
		.limit(pageSize);

	return {
		datas: res,
		total: res.length
	};
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
	return res;
};
