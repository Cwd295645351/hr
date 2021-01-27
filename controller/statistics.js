/*
 * @Description: 面试统计信息接口相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-14 21:44:37
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-27 23:41:13
 */

import Interview from "../db/models/Interviewees";
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
		status: 1
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
	const res = await Interview.find(mp, { majorName: 1 });
	return res;
};
