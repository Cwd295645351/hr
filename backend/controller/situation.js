/*
 * @Description: 面试情况表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-05 22:39:09
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-08 22:16:02
 */

import xss from "xss";
import mongoose from "../db/db";

import Interview from "../db/models/Interviewees";
import {
	getMajorNameById,
	getChannelNameById,
	getStatusNameById,
	getJobName,
	getConfig,
	getInterviewerName
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

// 获取面试情况列表
export const getList = async (params) => {
	let mp = {
		userId: params.userId,
		stageId: params.stageId,
		name: new RegExp(params.name, "ig"),
		isDelete: false
	};
	const pageIndex = params.pageIndex < 1 ? 0 : params.pageIndex - 1;
	const pageSize = params.pageSize;

	if (params.stageId !== 6) {
		mp.statusId = params.statusId;
	}

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

	if (params.interviewBeginDate && params.interviewEndDate) {
		mp["schedules.0.interviewDate"] = {
			$gte: params.interviewBeginDate,
			$lte: params.interviewEndDate
		};
	} else if (params.interviewBeginDate && !params.interviewEndDate) {
		mp["schedules.0.interviewDate"] = {
			$gte: params.interviewBeginDate
		};
	} else if (!params.interviewBeginDate && params.interviewEndDate) {
		mp["schedules.0.interviewDate"] = {
			$lte: params.interviewEndDate
		};
	}
	console.log(mp);
	if (params.jobId) {
		const jobArr = params.jobId.split("-");
		mp.apartmentId = jobArr[0];
		mp.jobId = jobArr[1];
	}

	const filterData = {
		date: 1,
		apartmentId: 1,
		apartmentName: 1,
		jobId: 1,
		jobName: 1,
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
		remindDate: 1,
		statusId: 1,
		statusName: 1,
		stageId: 1,
		joinDate: 1,
		schedules: 1,
		noticeDate: 1,
		noticeStr: 1,
		isArrivalInterview: 1,
		fileList: 1,
		remark: 1
	};

	const res = await Interview.find(mp, filterData)
		.sort({ date: -1, jobName: -1, "schedules.0.interviewDate": -1 })
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
		// 获取部门和职位名称
		const apartment = await getJobName(data.apartmentId, data.jobId);
		data.apartmentName = apartment.apartmentName;
		data.jobName = apartment.jobName;

		const config = await getConfig();
		if (data.schoolPropertyId) {
			data.schoolPropertyName = config.schoolProperty.find(
				(item) => item.id == data.schoolPropertyId
			).name;
		}
		if (data.degreeId) {
			data.degreeName = config.degree.find(
				(item) => item.id == data.degreeId
			).name;
		}
		if (data.typeId) {
			data.typeName = config.type.find(
				(item) => item.id == data.typeId
			).name;
		}
		if (data.channelId) {
			data.channelName = await getChannelNameById(data.channelId);
		}
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
		const params = {
			_id: mongoose.Types.ObjectId(data.id),
			userId: data.userId,
			isDelete: false
		};
		const originData = await Interview.findOne(params);

		// 获取部门和职位名称
		if (
			originData.jobId !== data.jobId ||
			originData.apartmentId !== data.apartmentId
		) {
			const apartment = await getJobName(data.apartmentId, data.jobId);
			data.apartmentName = apartment.apartmentName;
			data.jobName = apartment.jobName;
		}
		if (originData.channelId !== data.channelId) {
			data.channelName = await getChannelNameById(data.channelId);
		}

		const config = await getConfig();
		if (originData.schoolPropertyId !== data.schoolPropertyId) {
			data.schoolPropertyName = config.schoolProperty.find(
				(item) => item.id == data.schoolPropertyId
			).name;
		}
		if (originData.degreeId !== data.degreeId) {
			data.degreeName = config.degree.find(
				(item) => item.id == data.degreeId
			).name;
		}
		if (originData.typeId !== data.typeId) {
			data.typeName = config.type.find(
				(item) => item.id == data.typeId
			).name;
		}
		const statusArr = data.statusId.split("-");
		data.statusId = statusArr[1];
		if (originData.statusId != data.statusId) {
			data.stageId = +statusArr[0];
			data.statusName = await getStatusNameById(
				data.stageId,
				data.statusId
			);
		}
		const originSchedule = originData.schedules;
		for (let i = 0; i < data.schedules.length; i++) {
			if (originSchedule[i]) {
				// 修改面试官信息
				if (originSchedule[i].interviewerId !== data.interviewerId) {
					data.schedules[i].interviewerName =
						await getInterviewerName(
							data.schedules[i].interviewerId
						);
				}
				// 修改面试形式
				if (originSchedule[i].modeId !== data.modeId) {
					data.schedules[i].modeName = config.mode.find(
						(item) => item.id == data.schedules[i].modeId
					).name;
				}
			} else {
				// 修改面试官信息
				if (data.schedules[i].interviewerId) {
					data.schedules[i].interviewerName =
						await getInterviewerName(
							data.schedules[i].interviewerId
						);
				}
				// 修改面试形式
				if (data.schedules[i].modeId) {
					data.schedules[i].modeName = config.mode.find(
						(item) => item.id == data.schedules[i].modeId
					).name;
				}
			}
		}

		const res = await Interview.findOneAndUpdate(
			params,
			{
				date: data.date,
				apartmentId: data.apartmentId,
				apartmentName: data.apartmentName,
				jobId: data.jobId,
				jobName: data.jobName,
				typeId: data.typeId,
				typeName: data.typeName,
				channelId: data.channelId,
				channelName: data.channelName,
				name: data.name,
				sex: data.sex,
				phoneNum: data.phoneNum,
				email: data.email,
				city: data.city,
				school: data.school,
				schoolPropertyId: data.schoolPropertyId,
				schoolPropertyName: data.schoolPropertyName,
				degreeId: data.degreeId,
				degreeName: data.degreeName,
				isFullTime: data.isFullTime,
				graduationDate: data.graduationDate,
				isWork: data.isWork,
				remindDate: data.remindDate,
				stageId: data.stageId,
				statusId: data.statusId,
				statusName: data.statusName,
				joinDate: data.joinDate,
				schedules: data.schedules,
				isArrivalInterview: data.isArrivalInterview,
				fileList: data.fileList,
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
		console.log(11111111, e);
		return {
			retCode: 1,
			err: e
		};
	}
};

// 修改候选人面试进程
export const changeSchedule = async (data) => {
	try {
		xssData(data);
		const type = data.type;
		const filterData = {
			_id: mongoose.Types.ObjectId(data.id),
			userId: data.userId,
			isDelete: false
		};
		let changeData = {};
		// type: 0=去约面，1=去一面，2=去二面，3=去三面，4=录用，5=已联系，
		// 6=发offer，7=通过，8=接受，9=到岗，10=去人才库, 11=设置提醒
		switch (type) {
			case 0:
			case 4:
			case 5:
			case 7:
			case 8:
			case 9:
				changeData = {
					statusId: data.statusId,
					stageId: data.stageId,
					statusName: await getStatusNameById(
						data.stageId,
						data.statusId
					)
				};
				break;
			case 1:
			case 2:
			case 3:
				const config = await getConfig();
				const schedules = data.schedulesInfo;
				schedules.modeName = config.mode.find(
					(item) => item.id == schedules.modeId
				).name;
				schedules.interviewerName = await getInterviewerName(
					schedules.interviewerId
				);
				changeData = {
					statusId: data.statusId,
					statusName: await getStatusNameById(
						data.stageId,
						data.statusId
					),
					isArrivalInterview: 0,
					$addToSet: {
						schedules: schedules
					}
				};
				break;
			case 6:
				changeData = {
					statusId: data.statusId,
					statusName: await getStatusNameById(
						data.stageId,
						data.statusId
					),
					joinDate: data.joinDate
				};
				break;
			case 10:
				changeData = {
					stageId: 6,
					statusId: data.statusId,
					statusName: await getStatusNameById(6, data.statusId)
				};
				break;
			case 11:
				changeData = {
					noticeStr: data.noticeStr,
					noticeDate: data.noticeDate
				};
				break;
			case 12:
				changeData = {
					isArrivalInterview: data.isArrivalInterview
				};
		}
		const res = await Interview.findOneAndUpdate(filterData, changeData, {
			new: true
		});
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
