/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-14 21:39:02
 * @LastEditors: Chen
 * @LastEditTime: 2021-02-01 00:13:32
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
	const TOTLE_KEY = "总数";
	const CONVERSION_RATE = "转化率";
	const CONVERSION_PERCENT = "初始转化率";
	// 返回对象
	let retData = {};
	const params = ctx.query;
	// 数量对象
	const numData = {
		总数: [0, 0, 0, 0, 0, 0]
	};
	// 转化率对象
	const rateData = {
		总数转化率: [0, 0, 0, 0, 0, 0]
	};
	// 初始转化率对象
	const percentData = {
		总数初始转化率: [0, 0, 0, 0, 0, 0]
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
		rateData[item.channelName + CONVERSION_RATE] = [0, 0, 0, 0, 0, 0]; // 转化率
		percentData[item.channelName + CONVERSION_PERCENT] = [0, 0, 0, 0, 0, 0]; // 初始转化率
		numData[item.channelName] = [0, 0, 0, 0, 0, 0];
	});
	const res = await getStatisticsData(params);

	// 统计各个渠道的面试份数
	res.forEach((item) => {
		numData[TOTLE_KEY][0]++;
		numData[item.channelName][0]++;
		// 判断状态
		switch (item.status) {
			// 通过初筛
			case "pass":
				numData[TOTLE_KEY][1]++;
				numData[item.channelName][1]++;
				break;
			// 已约面
			case "attendInterview":
				numData[TOTLE_KEY][1]++;
				numData[item.channelName][1]++;
				numData[TOTLE_KEY][2]++;
				numData[item.channelName][2]++;
				break;
			// 已到面
			case "faced":
				numData[TOTLE_KEY][1]++;
				numData[item.channelName][1]++;
				numData[TOTLE_KEY][2]++;
				numData[item.channelName][2]++;
				numData[TOTLE_KEY][3]++;
				numData[item.channelName][3]++;
				break;
			// 已录用
			case "employ":
				numData[TOTLE_KEY][1]++;
				numData[item.channelName][1]++;
				numData[TOTLE_KEY][2]++;
				numData[item.channelName][2]++;
				numData[TOTLE_KEY][3]++;
				numData[item.channelName][3]++;
				numData[TOTLE_KEY][4]++;
				numData[item.channelName][4]++;
				break;
			// 已入职
			case "join":
				numData[TOTLE_KEY][1]++;
				numData[item.channelName][1]++;
				numData[TOTLE_KEY][2]++;
				numData[item.channelName][2]++;
				numData[TOTLE_KEY][3]++;
				numData[item.channelName][3]++;
				numData[TOTLE_KEY][4]++;
				numData[item.channelName][4]++;
				numData[TOTLE_KEY][5]++;
				numData[item.channelName][5]++;
				break;
		}
	});

	// 获取各个渠道的转化率和初始转化率
	for (let key in numData) {
		const numArr = numData[key];
		for (let i = numArr.length - 1; i > 0; i--) {
			// 获取转化率（当前阶段占上个阶段的比例）
			rateData[key + CONVERSION_RATE][i] =
				numArr[i - 1] > 0
					? ((numArr[i] * 100) / numArr[i - 1]).toFixed(2)
					: "0.00";
			// 获取初始转化率（当前阶段占初始阶段的比例）
			percentData[key + CONVERSION_PERCENT][i] =
				numArr[0] > 0
					? ((numArr[i] * 100) / numArr[0]).toFixed(2)
					: "0.00";
		}
		// 设置初始阶段的转化率和初始转化率
		rateData[key + CONVERSION_RATE][0] = numArr[0] > 0 ? "100.00" : "0.00";
		percentData[key + CONVERSION_PERCENT][0] =
			numArr[0] > 0 ? "100.00" : "0.00";
	}
	retData = Object.assign(numData, rateData, percentData);
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
	returnData.sort((first, second) => {
		if (parseFloat(first.proportion) > parseFloat(second.proportion)) {
			return -1;
		} else {
			return 1;
		}
	});
	ctx.body = new SuccessModel(returnData, "获取成功");
});

export default router;
