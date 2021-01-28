/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-14 21:39:02
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-28 21:13:53
 */
import Router from "koa-router";
import { SuccessModel, ErrorModel } from "../model/resModel";
import { getStatisticsData, getEntryRate } from "../controller/statistics";
import { getChannelList, getMajorList } from "../controller/common";

const router = Router({
	prefix: "/api/statistics"
});

// 获取面试统计信息
router.get("/getStatisticsData", async (ctx, next) => {
	const params = ctx.query;
	console.log(111, params);
	const retData = {
		总数: [0, 0, 0, 0, 0, 0]
	};
	if (params.beginDate != "") {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.beginDate) == false) {
			ctx.body = new ErrorModel(null, "开始时间不规范");
			return;
		}
	}
	if (params.endDate != "") {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.endDate) == false) {
			ctx.body = new ErrorModel(null, "结束时间不规范");
			return;
		}
	}
	const channelArr = await getChannelList();
	channelArr.forEach((item) => {
		retData[item.channelName] = [0, 0, 0, 0, 0, 0];
	});
	const res = await getStatisticsData(params);
	const TOTLE_KEY = "总数";
	const CONVERSION_RATE = "转化率";
	res.forEach((item) => {
		retData[TOTLE_KEY][0]++;
		retData[item.channelName][0]++;
		// 判断状态
		switch (item.status) {
			// 通过初筛
			case "pass":
				retData[TOTLE_KEY][1]++;
				retData[item.channelName][1]++;
				break;
			// 参加面试
			case "attendInterview":
				retData[TOTLE_KEY][2]++;
				retData[item.channelName][2]++;
				break;
			// 已到面
			case "faced":
				retData[TOTLE_KEY][3]++;
				retData[item.channelName][3]++;
				break;
			// 已录用
			case "employ":
				retData[TOTLE_KEY][4]++;
				retData[item.channelName][4]++;
				break;
			// 已入职
			case "join":
				retData[TOTLE_KEY][5]++;
				retData[item.channelName][5]++;
				break;
		}
	});
	retData[CONVERSION_RATE] = [];
	console.log(retData);

	const totalArr = retData[TOTLE_KEY];
	let nowNum = totalArr[totalArr.length - 1];
	// 获取转化率
	for (let i = totalArr.length - 1; i > 0; i--) {
		let lastNum = nowNum + totalArr[i - 1];
		retData[CONVERSION_RATE].unshift(
			lastNum > 0 ? ((nowNum * 100) / lastNum).toFixed(2) : 0
		);
		nowNum += totalArr[i - 1];
	}
	retData[CONVERSION_RATE].unshift(nowNum > 0 ? 100 : 0);
	ctx.body = new SuccessModel(retData, "获取成功");
});

// 获取不同专业入职比例
router.get("/getEntryRate", async (ctx, next) => {
	const params = ctx.query;
	const retData = {};
	const returnData = [];
	if (params.beginDate != "") {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.beginDate) == false) {
			ctx.body = new ErrorModel(null, "开始时间不规范");
			return;
		}
	}
	if (params.endDate != "") {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.endDate) == false) {
			ctx.body = new ErrorModel(null, "结束时间不规范");
			return;
		}
	}
	const majorArr = await getMajorList();
	majorArr.forEach((item) => {
		retData[item.majorName] = 0;
	});
	const res = await getEntryRate(params);
	const total = res.length;
	if (total > 0) {
		res.forEach((item) => {
			retData[item.majorName]++;
		});
		for (let key in retData) {
			let obj = {};
			obj.majorName = key;
			obj.proportion = ((retData[key] * 100) / total).toFixed(2);
			returnData.push(obj);
		}
	}
	ctx.body = new SuccessModel(returnData, "获取成功");
});

export default router;
