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


// 生成周报
export const generateWeekReport = async (params) => {
	// 查询当前用户下的所有候选人数据
	const mp = {
		userId: params.userId,
		isDelete: false
	};
	const beginDate = params.beginDate;
	const endDate = params.endDate;
	const filterData = {
		jobName: 1,
		stageId: 1,
		statusId: 1,
		schedules: 1,
		updateTime: 1
	}
	const candidateData = await Interview.find(mp, filterData)
	// 按周划分不同阶段的候选人数据
	const weekData = {
		// 推送简历
		pushResume: 0,
		// 面试
		interview: 0,
		// 谈薪
		talkSalary: 0,
		// offer
		offer: 0,
	}
	// 累计数据
	const totalData = []
	const jobNameMap = new Map()
	candidateData.forEach(item => {
		item.updateTime.forEach(updateItem => {
			// 只有处于开始结束时间范围内才统计
			if (updateItem.timestamps >= beginDate && updateItem.timestamps <= endDate) {
				switch (updateItem.updateType) {
					case 0:
						weekData.pushResume++;
						break;
					case 2:
						weekData.interview++;
						break;
					case 3:
						weekData.talkSalary++;
						break;
					case 4:
						weekData.offer++;
						break;

				}
			}
		})
		let jobData = {};

		if (jobNameMap.has(item.jobName)) {
			jobData = jobNameMap.get(item.jobName)
		} else {
			jobData = {
				// 职位
				jobName: item.jobName,
				// 推送简历
				pushResume: 0,
				// 邀约一面
				inviteOne: 0,
				// 一面到面
				attendInterviewOne: 0,
				// 一面通过
				onePass: 0,
				// 邀约二面
				inviteTwo: 0,
				// 二面到面
				attendInterviewTwo: 0,
				// 二面通过
				twoPass: 0,
				// 邀约三面
				inviteThree: 0,
				// 三面到面
				attendInterviewThree: 0,
				// 三面通过
				threePass: 0,
				// 录用谈 Offer
				offer: 0,
				// 发电子 Offer
				electronicOffer: 0,
				// 待入职
				waitEntry: 0,
				// 入职
				entry: 0,
			}
			jobNameMap.set(item.jobName, jobData)
		}

		const stageId = item.stageId;
		const statusId = item.statusId;
		const schedules = item.schedules;
		const schedulesLength = schedules.length;

		jobData.pushResume++;
		if (schedulesLength === 1) {
			jobData.inviteOne++;
			if (schedules[0].interviewerCommitment) {
				// 有评价代表到面
				jobData.attendInterviewOne++;
			}
		} else if (schedulesLength === 2) {
			jobData.inviteOne++;
			jobData.attendInterviewOne++;
			jobData.onePass++;
			jobData.inviteTwo++;
			if (schedules[1].interviewerCommitment) {
				// 有评价代表到面
				jobData.attendInterviewTwo++;
			}
		} else if (schedulesLength === 3) {
			jobData.inviteOne++;
			jobData.attendInterviewOne++;
			jobData.onePass++;
			jobData.inviteTwo++;
			jobData.attendInterviewTwo++;
			jobData.twoPass++;
			jobData.inviteThree++;
			if (schedules[2].interviewerCommitment) {
				// 有评价代表到面
				jobData.attendInterviewThree++;
			}
		}
		if (stageId >= 3 && stageId <= 5) {
			if (schedulesLength === 1) {
				jobData.onePass++;
			} else if (schedulesLength === 2) {
				jobData.onePass++;
				jobData.twoPass++;
			} else if (schedulesLength === 3) {
				jobData.onePass++;
				jobData.twoPass++;
				jobData.threePass++;
			}
		}
		if (stageId === 3) {
			// 进入录用阶段，表示一面通过
			if (statusId !== 'employ') {
				jobData.offer++
			}
			if (statusId === 'offerConfirm') {
				jobData.electronicOffer++
			}
		} else if (stageId === 4) {
			jobData.offer++
			jobData.electronicOffer++
			jobData.waitEntry++
		} else if (stageId === 5) {
			jobData.offer++
			jobData.electronicOffer++
			jobData.waitEntry++
			jobData.entry++
		}

	})

	// 将 map 转为数组
	jobNameMap.forEach(item => {
		totalData.push(item)
	})
	return { weekData, totalData };
}
