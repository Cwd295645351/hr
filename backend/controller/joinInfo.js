/*
 * @Description: 入职信息相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-04-24 23:28:47
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-01 12:11:15
 */

import xss from "xss";
import mongoose from "../db/db";

import Interview from "../db/models/Interviewees";
import JoinInfo from "../db/models/JoinInfo";
import { getStatusNameById } from "./common";

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

// 获取入职情况表
export const getList = async (params) => {
	const mp = {
		hideTag: "0",
		userId: params.userId,
		statusId: {
			$in: ["joining", "join"]
		}
	};
	const filterData = {
		NO: 1,
		joinDate: 1,
		property: 1,
		name: 1,
		apartment: 1,
		hideTag: 1,
		phoneNum: 1,
		statusId: 1,
		statusName: 1,
		joinRemark: 1
	};
	const pageIndex = params.pageIndex < 1 ? 0 : params.pageIndex - 1;
	const pageSize = params.pageSize;
	mp.isDelete = false;
	const InterviewRes = await Interview.find(mp, filterData);
	const JoinInfoRes = await JoinInfo.find({
		hideTag: "0",
		userId: params.userId
	});
	const res = InterviewRes.concat(JoinInfoRes);

	// 待入职的信息
	const joiningData = res.filter((item) => item.statusId === "joining");

	// 已入职的信息
	const joinData = res.filter((item) => item.statusId === "join");

	// 待入职且已填入职时间的信息，按照入职时间排序
	const joiningHasData = joiningData
		.filter((item) => {
			return item.joinDate;
		})
		.sort((a, b) => {
			return (
				new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
			);
		});
	// 筛选出待入职但未填入职时间的信息
	const joiningNoData = joiningData.filter((item) => {
		return item.joinDate == "";
	});

	// 已入职且已填入职时间的信息，按照入职时间排序
	const joinHasData = joinData
		.filter((item) => {
			return item.joinDate;
		})
		.sort((a, b) => {
			return (
				new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
			);
		});
	// 筛选出已入职但未填入职时间的信息
	const joinNoData = joinData.filter((item) => {
		return item.joinDate == "";
	});

	const total = joiningHasData.concat(joiningNoData, joinHasData, joinNoData);

	return {
		datas: total.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
		total: total.length
	};
};

// 添加入职信息
export const addInfo = async (data) => {
	xssData(data);
	try {
		const statusName = await getStatusNameById(data.statusId);
		data.statusName = statusName;
		const res = await JoinInfo.create(data);
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

// 修改入职信息
export const editInfo = async (data, isFromInfo) => {
	xssData(data);
	const statusName = await getStatusNameById(data.statusId);
	data.statusName = statusName;
	try {
		if (isFromInfo) {
			// 数据存放在入职信息表
			const res = await JoinInfo.findOneAndUpdate(
				{
					_id: mongoose.Types.ObjectId(data.id),
					userId: data.userId
				},
				{
					NO: data.NO,
					joinDate: data.joinDate,
					property: data.property,
					statusId: data.statusId,
					statusName: data.statusName,
					name: data.name,
					apartment: data.apartment,
					phoneNum: data.phoneNum,
					joinRemark: data.joinRemark
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
		} else {
			// 数据存放在面试信息表

			const res = await Interview.findOneAndUpdate(
				{
					_id: mongoose.Types.ObjectId(data.id),
					userId: data.userId,
					isDelete: false
				},
				{
					NO: data.NO,
					joinDate: data.joinDate,
					property: data.property,
					statusId: data.statusId,
					statusName: data.statusName,
					name: data.name,
					apartment: data.apartment,
					phoneNum: data.phoneNum,
					joinRemark: data.joinRemark
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
		}
	} catch (e) {
		return {
			retCode: 1,
			err: e
		};
	}
};

// 隐藏入职信息
export const hideInfo = async (data) => {
	const mp = {
		_id: mongoose.Types.ObjectId(data.id),
		userId: data.userId,
		isDelete: false
	};
	let res = null;
	if (data.isFromInfo) {
		res = await JoinInfo.findOneAndUpdate(
			mp,
			{
				hideTag: "1"
			},
			{ new: true }
		);
	} else {
		res = await Interview.findOneAndUpdate(
			mp,
			{
				hideTag: "1"
			},
			{ new: true }
		);
	}
	return res;
};
