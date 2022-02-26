/*
 * @Description: 面试情况表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-05 22:39:09
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-26 23:50:56
 */

import xss from "xss";
import mongoose from "../db/db";

import Interview from "../db/models/Interviewees";
import {
	getMajorNameById,
	getChannelNameById,
	getStatusNameById,
	getJobName,
	getConfig
} from "./common";

// 遍历对象，将对象属性进行xss防御
const xssData = (data) => {
	if (typeof data == "string" || typeof data == "number") {
		return data !== 0 ? xss(data) : 0;
	} else {
		for (let key in data) {
			
			data[key] = xssData(data[key]);
		}
		return data;
	}
};

// 获取面试情况列表
export const getList = async (params) => {
	let mp = {
		userId: params.userId,
		stageId: params.stageId,
		statusId: params.statusId,
		name: new RegExp(params.name, "ig"),
		isDelete: false
	};
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

	const filterData = {
		date: 1,
		apartmentId: 1,
		apartmentName: 1,
		jobId: 1,
		jobName:1,
		typeId: 1,
		typeName: 1,
		channelId: 1,
		channelName: 1,
		name: 1,
		sex: 1,
		phoneNum: 1,
		email: 1,
		city: 1,
		school: 1,
		schoolPropertyId: 1,
		schoolPropertyName: 1,
		degreeId: 1,
		degreeName: 1,
		isFullTime: 1,
		graduationDate: 1,
		isWork: 1,
		statusId: 1,
		statusName: 1,
		joinDate: 1,
		schedules: 1,
		isArrivalInterview: 1,
		fileList: 1,
		remark: 1,
		schedules: 1
	};

	const res = await Interview.find(mp, filterData)
		.sort({ date: -1, "schedules.date": -1, _id: 1 })
		.skip(pageIndex * pageSize)
		.limit(pageSize);
	const length = await Interview.find(mp, {}).count();
	return {
		datas: res,
		total: length
	};
};

// 添加面试者
export const addInterviewee = async (data) => {
		xssData(data);
	try {
		const apartment = await getJobName(data.apartmentId, data.jobId);
		data.apartmentName = apartment.apartmentName;
		data.jobName = apartment.jobName;

		const config = await getConfig();
		data.schoolPropertyName = config.schoolProperty.find(
			(item) => item.id == data.schoolPropertyId
		).name;
		data.degreeName = config.degree.find(
			(item) => item.id == data.degreeId
		).name;
		data.typeName = config.type.find((item) => item.id == data.typeId).name;
		data.channelName = await getChannelNameById(data.channelId);
		data.statusName = await getStatusNameById(data.stageId, data.statusId);
		console.log(data);
		const res = await Interview.create(data);
		return {
			retCode: res ? 0 : 1
		};
	} catch (e) {
		console.log(e);
		return {
			retCode: 1,
			err: e
		};
	}
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
	try {
		const majorName = await getMajorNameById(data.majorId);
		data.majorName = majorName;
		const channelName = await getChannelNameById(data.channelId);
		data.channelName = channelName;
		const statusName = await getStatusNameById(data.statusId);
		data.statusName = statusName;
		const res = await Interview.findOneAndUpdate(
			{
				_id: mongoose.Types.ObjectId(data.id),
				userId: data.userId,
				isDelete: false
			},
			{
				date: data.date,
				majorId: data.majorId,
				majorName: data.majorName,
				name: data.name,
				property: data.property,
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
				remark: data.remark,
				apartment: data.apartment
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

// 删除面试者
export const deleteInterviewee = async (data) => {
	const mp = {
		_id: mongoose.Types.ObjectId(data.id),
		userId: data.userId,
		isDelete: false
	};
	const res = await Interview.findOneAndUpdate(
		mp,
		{
			isDelete: true
		},
		{ new: true }
	);
	if (res) return true;
	else return false;
};
