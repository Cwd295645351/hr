/*
 * @Description: 面试统计信息接口相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-14 21:44:37
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-01 12:36:55
 */

import xss from "xss";
import mongoose from "../db/db";

import Interview from "../db/models/Interviewees";
import OriginNums from "../db/models/OriginNums";
import { getChannelNameById, getMajorNameById } from "./common";

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
	mp.userId = params.userId;
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
	mp.isDelete = false;
	const res = await Interview.find(mp, {
		channelName: 1,
		statusId: 1
	});
	return res;
};

// 获取不同专业入职比例
export const getEntryRate = async (params) => {
	let mp = {};
	mp.userId = params.userId;
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
	mp.isDelete = false;
	const res = await Interview.find(mp, { majorName: 1, statusId: 1 });
	return res;
};

// 获取初始简历数量
export const getOriginNums = async (params) => {
	let mp = {};

	const pageIndex = params.pageIndex < 1 ? 0 : params.pageIndex - 1;
	const pageSize = parseInt(params.pageSize);
	mp.userId = params.userId;
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
	if (params.property && params.property.length > 0) {
		mp.property = {
			$in: params.property
		};
	}
	if (params.channelId && params.channelId.length > 0) {
		mp.channelId = {
			$in: params.channelId
		};
	}
	if (params.majorId && params.majorId.length > 0) {
		mp.majorId = {
			$in: params.majorId
		};
	}
	mp.isDelete = false;
	const filterData = {
		date: 1,
		majorId: 1,
		majorName: 1,
		property: 1,
		channelId: 1,
		channelName: 1,
		originNum: 1,
		passNum: 1
	};
	const res = await OriginNums.find(mp, filterData)
		.sort({ date: -1, _id: 1 })
		.skip(pageIndex * pageSize)
		.limit(pageSize);
	const length = await OriginNums.find(mp).count();
	return {
		datas: res,
		total: length
	};
};

// 新增初始简历数
export const addOriginNums = async (data) => {
	xssData(data);
	try {
		const channelName = await getChannelNameById(data.channelId);
		data.channelName = channelName;
		const majorName = await getMajorNameById(data.majorId);
		data.majorName = majorName;
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
		const majorName = await getMajorNameById(data.majorId);
		data.majorName = majorName;
		const mp = {
			_id: mongoose.Types.ObjectId(data.id),
			userId: data.userId
		};
		const res = await OriginNums.findOneAndUpdate(
			mp,
			{
				date: data.date,
				majorId: data.majorId,
				majorName: data.majorName,
				channelId: data.channelId,
				channelName: data.channelName,
				property: data.property,
				originNum: data.originNum,
				passNum: data.passNum
			},
			{ new: true }
		);
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
export const deleteOriginNums = async (data) => {
	const mp = {
		_id: mongoose.Types.ObjectId(data.id),
		userId: data.userId,
		isDelete: false
	};
	const res = await OriginNums.findOneAndUpdate(
		mp,
		{
			isDelete: true
		},
		{ new: true }
	);
	if (res) return true;
	else return false;
};
