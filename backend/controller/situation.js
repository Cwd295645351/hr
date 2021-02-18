/*
 * @Description: 面试情况表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-05 22:39:09
 * @LastEditors: Chen
 * @LastEditTime: 2021-02-18 23:18:14
 */

import xss from "xss";
import mongoose from "../db/db";

import Interview from "../db/models/Interviewees";
import { getMajorNameById, getChannelNameById, getStatusNameById } from "./common";

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
	const pageIndex = params.pageIndex < 1 ? 0 : params.pageIndex - 1;
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
	if (params.statusId.length > 0) {
		mp.statusId = {
			$in: params.statusId
		};
	}

	const res = await Interview.find(mp)
		.sort({ date: 1, _id: 1 })
		.skip(pageIndex * pageSize)
		.limit(pageSize);
	const length = await Interview.find(mp).count();
	return {
		datas: res,
		total: length
	};
};

// 添加面试者
export const addInterviewee = async (data) => {
	xssData(data);
	const majorName = await getMajorNameById(data.majorId);
	data.majorName = majorName;
	const channelName = await getChannelNameById(data.channelId);
	data.channelName = channelName;
	const statusName = await getStatusNameById(data.statusId);
	data.statusName = statusName;
	const res = await Interview.create(data);
	return res;
};

// 批量导入面试者
export const importInterviewee = async (data) => {
	xssData(data);
	const res = await Interview.insertMany(data);
	return res;
};

// 修改面试者
export const editInterviewee = async (data) => {
	xssData(data);
	const majorName = await getMajorNameById(data.majorId);
	data.majorName = majorName;
	const channelName = await getChannelNameById(data.channelId);
	data.channelName = channelName;
	const statusName = await getStatusNameById(data.statusId);
	data.statusName = statusName;
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
			statusId: data.statusId,
			joinDate: data.joinDate,
			statusName: data.statusName,
			schedules: data.schedules,
			phoneInterviewSituation: data.phoneInterviewSituation,
			fileList: data.fileList,
			remark: data.remark
		},
		{ new: true }
	);
	return res;
};

// 删除面试者
export const deleteInterviewee = async (data) => {
	const mp = {
		_id: mongoose.Types.ObjectId(data.id),
		userId: data.userId
	};
	const res = await Interview.findOneAndDelete(mp);
	return res;
};
