/*
 * @Description: 面试统计信息接口相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-14 21:44:37
 * @LastEditors: Chen
 * @LastEditTime: 2021-03-07 14:49:58
 */

import xss from "xss";
import mongoose from "../db/db";

import Interview from "../db/models/Interviewees";
import OriginNums from "../db/models/OriginNums";
import { getChannelNameById } from "./common";

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

// 获取面试统计信息
export const getStatisticsData = async (params) => {
	let mp = {};
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
	mp.majorId = new RegExp(params.majorId, "ig");
	const res = await Interview.find(mp, {
		channelName: 1,
		statusId: 1
	});
	return res;
};

// 获取不同专业入职比例
export const getEntryRate = async (params) => {
	let mp = {};
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
	mp.statusId = "join";
	const res = await Interview.find(mp, { majorName: 1 });
	return res;
};

// 获取初始简历数量
export const getOriginNums = async (params) => {
	let mp = {};
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
	mp.majorId = new RegExp(params.majorId, "ig");
	const res = await OriginNums.find(mp, {
		channelName: 1,
		num: 1
	});
	return res ? res : 0;
};

// 新增初始简历数
export const addOriginNums = async (data) => {
	xssData(data);
	try {
		const channelName = await getChannelNameById(data.channelId);
		data.channelName = channelName;
		const res = await OriginNums.create(data);
		return {
			retCode: 0
		};
	} catch (e) {
		return {
			retCode: 1,
			err: e
		};
	}
};

// 编辑初始简历数
export const editOriginNums = async (data) => {
	xssData(data);
	try {
		const channelName = await getChannelNameById(data.channelId);
		data.channelName = channelName;
		const mp = {
			_id: mongoose.Types.ObjectId(data.id),
			userId: data.userId
		};
		const res = await OriginNums.findOneAndUpdate(
			mp,
			{
				date: data.date,
				majorId: data.majorId,
				channelId: data.channelId,
				channelName: data.channelName,
				num: data.num
			},
			{ new: true }
		);
		console.log(res);
		if (res) {
			return {
				retCode: 0
			};
		} else {
			return {
				retCode: -1
			};
		}
	} catch (e) {
		return {
			retCode: 1,
			err: e
		};
	}
};

// 删除初始简历数
export const deleteOriginNums = async (data) =>{
	const mp = {
		_id: mongoose.Types.ObjectId(data.id),
		userId: data.userId
	};
	console.log(mp);
	const res1 = await OriginNums.findOne(mp);
	const res = await OriginNums.findOneAndDelete(mp);
	console.log(res1,res);
	return res;
}
