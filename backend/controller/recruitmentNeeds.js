/*
 * @Description: 需求登记相关数据库操作
 * @Version:
 * @Author:
 * @Date: 2021-07-06 21:57:14
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-01 12:15:15
 */
import xss from "xss";
import mongoose from "../db/db";

import RecruitmentNeeds from "../db/models/RecruitmentNeeds";
import { getMajorNameById } from "./common";

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

// 获取招聘需求列表
export const getList = async (params) => {
	let mp = {};
	const pageIndex = params.pageIndex < 1 ? 0 : params.pageIndex - 1;
	const pageSize = params.pageSize;
	mp.userId = params.userId;
	const filterData = {
		date: 1,
		majorId: 1,
		majorName: 1,
		apartment: 1,
		property: 1,
		num: 1,
		demand: 1,
		hopeArrivalTime: 1,
		actualArrivalTime: 1,
		schedule: 1,
		remark: 1
	};

	const res = await RecruitmentNeeds.find(mp, filterData)
		.sort({ date: -1, _id: 1 })
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
		const majorName = await getMajorNameById(data.majorId);
		data.majorName = majorName;
		const res = await RecruitmentNeeds.create(data);
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

// 修改需求
export const editRecruitment = async (data) => {
	xssData(data);
	try {
		const majorName = await getMajorNameById(data.majorId);
		data.majorName = majorName;
		const res = await RecruitmentNeeds.findOneAndUpdate(
			{
				_id: mongoose.Types.ObjectId(data.id),
				userId: data.userId
			},
			{
				date: data.date,
				majorId: data.majorId,
				majorName: data.majorName,
				apartment: data.apartment,
				property: data.property,
				num: data.num,
				demand: data.demand,
				hopeArrivalTime: data.hopeArrivalTime,
				actualArrivalTime: data.actualArrivalTime,
				schedule: data.schedule,
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
		userId: data.userId
	};
	const res = await RecruitmentNeeds.findOneAndDelete(mp);
	return res;
};