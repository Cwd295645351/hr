/*
 * @Description: 面试日程表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-15 00:08:36
 * @LastEditors: Chen
 * @LastEditTime: 2021-05-05 20:54:26
 */

import Interview from "../db/models/Interviewees";
const getSchedule = async (params) => {
	let mp = {
		userId: params.userId,
		"schedules.date": {
			$gte: new Date(params.beginDate),
			$lte: new Date(params.endDate)
		}
	};
	const res = await Interview.find(mp, {
		name: 1,
		majorName: 1,
		statusName: 1,
		schedules: 1,
		property: 1
	});
	return res;
};
export default getSchedule;
