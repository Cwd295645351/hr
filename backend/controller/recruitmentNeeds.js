/*
 * @Description: 需求登记相关数据库操作
 * @Version:
 * @Author:
 * @Date: 2021-07-06 21:57:14
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-23 21:50:15
 */
import xss from "xss";
import mongoose from "../db/db";

import RecruitmentNeeds from "../db/models/RecruitmentNeeds";
import {
	getJobName,
	getConfig,
	getInterviewerName,
	getCityName
} from "./common";

// 遍历对象，将对象属性进行xss防御
const xssData = (data) => {
	if (typeof data == "string") {
		return xss(data);
	} else if (typeof data == "number") {
		return data;
	} else {
		for (let key in data) {
			data[key] = xssData(data[key]);
		}
		return data;
	}
};

// 获取招聘需求列表
export const getList = async (params) => {
	let mp = {
		userId: params.userId,
		isDelete: false
	};
	const pageIndex = params.pageIndex < 1 ? 0 : params.pageIndex - 1;
	const pageSize = params.pageSize;
	const filterData = {
		date: 1,
		apartmentId: 1,
		apartmentName: 1,
		jobId: 1,
		jobName: 1,
		salaryMin: 1,
		salaryMax: 1,
		typeId: 1,
		typeName: 1,
		interviewerId: 1,
		interviewerName: 1,
		cityId: 1,
		cityName: 1,
		num: 1,
		demand: 1,
		hopeArrivalTime: 1,
		actualArrivalTime: 1,
		scheduleId: 1,
		priority: 1,
		remark: 1
	};

	const res = await RecruitmentNeeds.find(mp, filterData)
		.sort({  scheduleId: 1, priority: 1, jobId: 1, date: -1 })
		.skip(pageIndex * pageSize)
		.limit(pageSize);
	const length = await RecruitmentNeeds.find(mp).count();
	return {
		datas: res,
		total: length
	};
};

// 添加需求
export const addRecruitment = async (data) => {
	xssData(data);
	try {
		const apartment = await getJobName(data.apartmentId, data.jobId);
		data.apartmentName = apartment.apartmentName;
		data.jobName = apartment.jobName;
		const config = await getConfig();
		if (data.typeId !== "") {
			data.typeName = config.type.find(
				(item) => item.id == data.typeId
			).name;
		}
		if (data.interviewerId !== "") {
			data.interviewerName = await getInterviewerName(data.interviewerId);
		}
		if (data.cityId !== "") {
			data.cityName = await getCityName(data.cityId);
		}

		const res = await RecruitmentNeeds.create(data);
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

// 修改需求
export const editRecruitment = async (data) => {
	xssData(data);
	try {
		const params = {
			_id: mongoose.Types.ObjectId(data.id),
			userId: data.userId,
			isDelete: false
		};
		const originData = await RecruitmentNeeds.findOne(params);
		// 获取部门和职位名称
		if (
			originData.jobId !== data.jobId ||
			originData.apartmentId !== data.apartmentId
		) {
			const apartment = await getJobName(data.apartmentId, data.jobId);
			data.apartmentName = apartment.apartmentName;
			data.jobName = apartment.jobName;
		}
		const config = await getConfig();
		if (originData.typeId !== data.typeId) {
			data.typeName = config.type.find(
				(item) => item.id == data.typeId
			).name;
		}

		if (originData.interviewerId !== data.interviewerId) {
			data.interviewerName = await getInterviewerName(data.interviewerId);
		}

		if (originData.cityId !== data.cityId) {
			data.cityName = await getCityName(data.cityId);
		}
		const res = await RecruitmentNeeds.findOneAndUpdate(
			params,
			{
				date: data.date,
				apartmentId: data.apartmentId,
				apartmentName: data.apartmentName,
				jobId: data.jobId,
				jobName: data.jobName,
				salaryMin: data.salaryMin,
				salaryMax: data.salaryMax,
				typeId: data.typeId,
				typeName: data.typeName,
				interviewerId: data.interviewerId,
				interviewerName: data.interviewerName,
				cityId: data.cityId,
				cityName: data.cityName,
				num: data.num,
				demand: data.demand,
				hopeArrivalTime: data.hopeArrivalTime,
				actualArrivalTime: data.actualArrivalTime,
				scheduleId: data.scheduleId,
				priority: data.priority,
				remark: data.remark
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

// 删除需求
export const deleteRecruitment = async (data) => {
	const mp = {
		_id: mongoose.Types.ObjectId(data.id),
		userId: data.userId,
		isDelete: false
	};
	const res = await RecruitmentNeeds.findOneAndUpdate(
		mp,
		{
			isDelete: true
		},
		{ new: true }
	);
	if (res) return true;
	else return false;
};
