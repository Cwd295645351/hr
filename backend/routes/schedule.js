/*
 * @Description: 面试日程路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-15 00:17:20
 * @LastEditors: Chen
 * @LastEditTime: 2022-05-30 22:51:49
 */
import Router from "koa-router";
import getSchedule from "../controller/schedule";
import { SuccessModel, ErrorModel } from "../model/resModel";
import dayjs from "dayjs";

const router = Router({
	prefix: "/api/schedule"
});

// 获取面试日程
router.get("/getSchedule", async (ctx, next) => {
	const params = ctx.query;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	if (params.beginDate == "") {
		ctx.body = new ErrorModel(null, "开始时间不能为空");
		return;
	}
	if (params.endDate == "") {
		ctx.body = new ErrorModel(null, "结束时间不能为空");
		return;
	}
	const res = await getSchedule(params);

	// 整合结果
	let map = new Map();
	res.forEach((item) => {
		let scheduleObj = {
			name: item.name,
			time: item.schedules.interviewTime,
			jobName: item.jobName,
			modeName: item.schedules.modeName,
			interviewer: item.schedules.interviewerName.map(ite => ite.slice(0,1)).join("/"),
			statusName: item.statusName,
			order: item.schedules.order
		};
		if (map.has(item.schedules.interviewDate)) {
			let dateArray = map.get(item.schedules.interviewDate);
			dateArray.push(scheduleObj);
			map.set(item.schedules.interviewDate, dateArray);
		} else {
			let dateArray = new Array();
			dateArray.push(scheduleObj);
			map.set(item.schedules.interviewDate, dateArray);
		}
	});

	let retData = new Array(21);
	const ONE_DAY_STRING = 24 * 60 * 60 * 1000;
	[...map].forEach((item) => {
		const index =
			(new Date(item[0]) - new Date(params.beginDate)) / ONE_DAY_STRING;
		retData[index] = item[1];
		retData[index].sort((first, second) => {
			const firstArr = first.time ? first.time.split(":") : ["00", "00"];
			const secondArr = second.time
				? second.time.split(":")
				: ["00", "00"];
			if (firstArr[0] < secondArr[0]) {
				return -1;
			} else if (firstArr[0] == secondArr[0]) {
				if (firstArr[1] < secondArr[1]) {
					return -1;
				} else {
					return 1;
				}
			} else {
				return 1;
			}
		});
	});

	for (let i = 0; i < retData.length; i++) {
		let retObj = {
			date: dayjs(
				new Date(+new Date(params.beginDate) + i * ONE_DAY_STRING)
			).format("YYYY-MM-DD"),
			interview: []
		};
		if (retData[i]) {
			retObj.interview = retData[i];
		}
		// new Date(+new Date("2021-01-17") + 24 * 60 * 60 * 1000);
		retData[i] = retObj;
	}
	ctx.body = new SuccessModel(retData, "获取成功");
});

export default router;
