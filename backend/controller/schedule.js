/*
 * @Description: 面试日程表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-15 00:08:36
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-06 23:46:58
 */

import Interview from "../db/models/Interviewees";
const getSchedule = async (params) => {
	let mp = {
		userId: params.userId,
		"schedules.date": {
			$gte: new Date(params.beginDate),
			$lte: new Date(params.endDate)
		},
		isDelete: false
	};
	const res = await Interview.aggregate([
		{
			$unwind: "$schedules"
		},
		{
			$match: {
				userId: params.userId,
				"schedules.interviewDate": {
					$gte: params.beginDate,
					$lte: params.endDate
				}
			}
		},
		{
			$project: {
				name: 1,
				jobName: 1,
				statusName: 1,
				schedules: 1,
			}
		}
	]);
	return res;
};
export default getSchedule;
