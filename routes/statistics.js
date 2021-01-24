/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-14 21:39:02
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-24 16:29:01
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
	console.log(111,params);
	const retData = {
		total: [0, 0, 0, 0, 0, 0]
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
		if (reg.test(params.endDate == false)) {
			ctx.body = new ErrorModel(null, "结束时间不规范");
			return;
		}
	}
	const channelArr = await getChannelList();
	channelArr.forEach((item) => {
		retData[item.channelId] = [0, 0, 0, 0, 0, 0];
	});
	const res = await getStatisticsData(params);
	res.forEach((item) => {
		retData.total[0]++;
		retData[item.channelId][0]++;
		// 判断状态
		switch (item.status) {
			// 通过初筛
			case "pass":
				retData.total[1]++;
				retData[item.channelId][1]++;
				break;
			// 参加面试
			case "attendInterview":
				retData.total[2]++;
				retData[item.channelId][2]++;
				break;
			// 已到面
			case "faced":
				retData.total[3]++;
				retData[item.channelId][3]++;
				break;
			// 已录用
			case "employ":
				retData.total[4]++;
				retData[item.channelId][4]++;
				break;
			// 已入职
			case "join":
				retData.total[5]++;
				retData[item.channelId][5]++;
				break;
		}
	});
	retData.percent = [];
	const totalArr = retData.total;
	let nowNum = totalArr[totalArr.length - 1];
	// 获取转化率
	for (let i = totalArr.length - 1; i > 0; i--) {
		let lastNum = nowNum + totalArr[i - 1];
		retData.percent.unshift(lastNum > 0 ? (nowNum * 100) / lastNum : 0);
		nowNum += totalArr[i - 1];
	}
	retData.percent.unshift(100);
	ctx.body = new SuccessModel(retData, "获取成功");
});

// 获取不同专业入职比例
router.get("/getEntryRate", async (ctx, next) => {
	const params = ctx.query;
	const retData = {};
	if (params.beginDate != "") {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.beginDate) == false) {
			ctx.body = new ErrorModel(null, "开始时间不规范");
			return;
		}
	}
	if (params.endDate != "") {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.endDate == false)) {
			ctx.body = new ErrorModel(null, "结束时间不规范");
			return;
		}
	}
	const majorArr = await getMajorList();
	majorArr.forEach((item) => {
		retData[item.majorId] = 0;
	});
	const res = await getEntryRate(params);
	const total = res.length;
	if (total > 0) {
		res.forEach((item) => {
			retData[item.majorId]++;
		});
		for (let key in retData) {
			retData[key] = (retData[key] * 100) / total;
		}
	}
	ctx.body = new SuccessModel(retData, "获取成功");
});

export default router;
