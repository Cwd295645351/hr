/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-14 21:39:02
 * @LastEditors: Chen
 * @LastEditTime: 2021-05-09 16:39:25
 */
import Router from "koa-router";
import { SuccessModel, ErrorModel } from "../model/resModel";
import {
	getStatisticsData,
	getEntryRate,
	getOriginNums,
	addOriginNums,
	editOriginNums,
	deleteOriginNums
} from "../controller/statistics";
import { getChannelList, getMajorList } from "../controller/common";

const router = Router({
	prefix: "/api/statistics"
});

// 获取各个渠道的初始数量
const getChannelOriginNums = async (params) => {
	const originNum = await getOriginNums(params);
	return originNum;
};

// 获取初始简历数
router.post("/getOriginNumsList", async (ctx, next) => {
	const params = ctx.request.body;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
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
	const res = await getChannelOriginNums(params);
	if (res) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
	}
});

// 新增初始简历数
router.post("/addOriginNums", async (ctx, next) => {
	const originObj = ctx.request.body;
	if (!originObj.userId || originObj.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
	}
	const res = await addOriginNums(originObj);
	if (res.retCode == 0) {
		ctx.body = new SuccessModel("", "新增成功");
	} else {
		let message = [];
		const errors = res.err.errors;
		console.log(errors);
		for (let key in errors) {
			if (errors[key].kind === "required") {
				let errName = findName(errors[key].path);
				if (errName != "简历数") {
					message.push(`${errName}不能为空`);
				} else {
					message.push(`${errName}不能为0`);
				}
			}
		}
		message = [...new Set(message)];
		ctx.body = new ErrorModel(null, message.join(","));
	}
});

// 编辑初始简历数
router.post("/editOriginNums", async (ctx, next) => {
	const originObj = ctx.request.body;
	if (!originObj.userId || originObj.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
	}
	if (!originObj.id || originObj.id == "") {
		ctx.body = new ErrorModel(null, "id不能为空");
		return;
	}
	if (!originObj.date || originObj.date == "") {
		ctx.body = new ErrorModel(null, "日期不能为空");
		return;
	}
	if (!originObj.majorId || originObj.majorId == "") {
		ctx.body = new ErrorModel(null, "专业不能为空");
		return;
	}
	if (!originObj.property || originObj.property == "") {
		ctx.body = new ErrorModel(null, "招工性质不能为空");
		return;
	}
	if (!originObj.channelId || originObj.channelId == "") {
		ctx.body = new ErrorModel(null, "渠道不能为空");
		return;
	}
	if (!originObj.originNum || originObj.originNum == "") {
		ctx.body = new ErrorModel(null, "初始简历数不能为空");
		return;
	}
	if (!originObj.passNum || originObj.passNum == "") {
		ctx.body = new ErrorModel(null, "通过初筛数不能为空");
		return;
	}
	const res = await editOriginNums(originObj);
	if (res.retCode == 0) {
		ctx.body = new SuccessModel("", "编辑成功");
	} else if (res.retCode == -1) {
		ctx.body = new ErrorModel("", "编辑失败");
	} else {
		let message = [];
		const errors = res.err.errors;
		for (let key in errors) {
			if (errors[key].kind === "required") {
				message.push(`${findName(errors[key].path)}不能为空`);
			}
		}
		ctx.body = new ErrorModel(null, message.join(","));
	}
});

// 删除初始简历数
router.post("/deleteOriginNums", async (ctx, next) => {
	const data = ctx.request.body;
	if (!data.userId || data.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	if (!data.id || data.id == "") {
		ctx.body = new ErrorModel(null, "id不能为空");
		return;
	}
	try {
		const res = await deleteOriginNums(data);
		if (res) {
			ctx.body = new SuccessModel("", "删除成功");
		} else {
			ctx.body = new ErrorModel(null, "删除失败");
		}
	} catch (e) {
		ctx.body = new ErrorModel(null, "删除失败");
	}
});

// 获取面试统计信息
router.get("/getStatisticsData", async (ctx, next) => {
	const params = ctx.query;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}

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
	const TOTLE_KEY = "总数";
	const CONVERSION_RATE = "转化率";
	const CONVERSION_PERCENT = "初始转化率";
	// 返回对象
	let retData = {};
	// 数量对象
	const numData = {
		总数: [0, 0, 0, 0, 0, 0, 0]
	};
	// 转化率对象
	const rateData = {
		总数转化率: [0, 0, 0, 0, 0, 0, 0]
	};
	// 初始转化率对象
	const percentData = {
		总数初始转化率: [0, 0, 0, 0, 0, 0, 0]
	};

	// 获取渠道列表
	const channelArr = await getChannelList();
	channelArr.forEach((item) => {
		rateData[item.channelName + CONVERSION_RATE] = [0, 0, 0, 0, 0, 0, 0]; // 转化率
		percentData[item.channelName + CONVERSION_PERCENT] = [
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]; // 初始转化率
		numData[item.channelName] = [0, 0, 0, 0, 0, 0, 0]; // 数量
	});
	const res = await getStatisticsData(params);

	// 统计各个渠道的面试份数
	res.forEach((item) => {
		if (item.channelName) {
			numData[item.channelName][0]++;
			numData[TOTLE_KEY][0]++;
			// 判断当前简历处于哪种状态
			switch (item.statusId) {
				// 通过初筛
				case "pass":
					numData[TOTLE_KEY][1]++;
					numData[item.channelName][1]++;
					break;
				// 爽约
				case "breakPromise":
				// 已约面
				case "attendInterview":
					numData[TOTLE_KEY][1]++;
					numData[item.channelName][1]++;
					numData[TOTLE_KEY][2]++;
					numData[item.channelName][2]++;
					break;
				// 不录用，已回复
				case "noHire":
				// 已到面
				case "faced":
					numData[TOTLE_KEY][1]++;
					numData[item.channelName][1]++;
					numData[TOTLE_KEY][2]++;
					numData[item.channelName][2]++;
					numData[TOTLE_KEY][3]++;
					numData[item.channelName][3]++;
					break;
				// 拒Offer
				case "refuseOffer":
				// 意向录用
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
				// 待入职
				case "joining":
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
					numData[TOTLE_KEY][6]++;
					numData[item.channelName][6]++;
					break;
			}
		}
	});

	// 获取各个渠道初始简历数
	const originNumResult = await getChannelOriginNums(params);
	const originNum = originNumResult.datas;
	console.log(originNum);
	const originData = {};
	originNum.forEach((item) => {
		if (originData[item.channelName]) {
			originData[item.channelName] += item.num;
		} else {
			originData[item.channelName] = item.num;
		}
	});
	for (let channelName in originData) {
		numData[TOTLE_KEY][0] += originData[channelName];
		numData[channelName][0] = originData[channelName];
	}

	// 获取各个渠道的转化率和初始转化率
	for (let channelName in numData) {
		const numArr = numData[channelName];
		for (let i = numArr.length - 1; i > 0; i--) {
			// 获取转化率（当前阶段占上个阶段的比例）
			rateData[channelName + CONVERSION_RATE][i] =
				numArr[i - 1] > 0
					? ((numArr[i] * 100) / numArr[i - 1]).toFixed(2)
					: "0.00";
			// 获取初始转化率（当前阶段占初始阶段的比例）
			percentData[channelName + CONVERSION_PERCENT][i] =
				numArr[0] > 0
					? ((numArr[i] * 100) / numArr[0]).toFixed(2)
					: "0.00";
		}
		// 设置初始阶段的转化率和初始转化率
		rateData[channelName + CONVERSION_RATE][0] =
			numArr[0] > 0 ? "100.00" : "0.00";
		percentData[channelName + CONVERSION_PERCENT][0] =
			numArr[0] > 0 ? "100.00" : "0.00";
	}

	// 横轴数据
	const xData = [
		"初始简历",
		"通过筛选",
		"已约面",
		"到面",
		"意向录用",
		"待入职",
		"入职"
	];
	retData = Object.assign(numData, rateData, percentData);
	ctx.body = new SuccessModel({ yData: retData, xData: xData }, "获取成功");
});

// 获取不同专业入职比例
router.get("/getEntryRate", async (ctx, next) => {
	const params = ctx.query;
	const retData = {};
	const returnData = [];
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
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
	// 获取专业列表
	const majorArr = await getMajorList();
	majorArr.forEach((item) => {
		retData[item.majorName] = 0;
	});

	// 获取不同专业入职比例
	const res = await getEntryRate(params);
	const total = res.length;
	if (total > 0) {
		res.forEach((item) => {
			retData[item.majorName]++;
		});
		for (let key in retData) {
			let obj = {};
			// 专业名称
			obj.majorName = key;
			// 比例
			obj.proportion = ((retData[key] * 100) / total).toFixed(2);
			returnData.push(obj);
		}
	}
	// 返回结果按比例降序
	returnData.sort((first, second) => {
		if (parseFloat(first.proportion) > parseFloat(second.proportion)) {
			return -1;
		} else {
			return 1;
		}
	});
	ctx.body = new SuccessModel(returnData, "获取成功");
});

// 根据字段获取中文
function findName(str) {
	let res = "";
	switch (str) {
		case "date":
			res = "日期";
			break;
		case "majorId":
		case "majorName":
			res = "专业";
			break;
		case "name":
			res = "姓名";
			break;
		case "property":
			res = "性质";
			break;
		case "phoneNum":
			res = "手机号";
			break;
		case "email":
			res = "邮箱";
			break;
		case "channelId":
		case "channelName":
			res = "渠道";
			break;
		case "statusId":
		case "statusName":
			res = "简历状态";
			break;
		case "phoneInterviewSituation":
			res = "电话面试情况";
			break;
		case "num":
			res = "简历数";
			break;
	}
	return res;
}

export default router;
