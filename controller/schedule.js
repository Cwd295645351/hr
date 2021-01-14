/*
 * @Description: 面试日程表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-15 00:08:36
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-15 00:17:06
 */

import Interview from "../db/models/Interviewees";
const getSchedule = async (params) => {
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
	const res = await Interview.find(mp, {
		majorName: 1,
		schedules: 1
	});
	return res;
};
export default getSchedule;
