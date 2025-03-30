/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-14 21:39:02
 * @LastEditors: Chen
 * @LastEditTime: 2022-01-22 09:56:53
 */
import Router from "koa-router";
import { SuccessModel, ErrorModel } from "../model/resModel";
import {
	getStatisticsData,
	getEntryRate,
	getOriginNums,
	addOriginNums,
	editOriginNums,
	deleteOriginNums,
	generateWeekReport,
	getInterviewerData_nocommit
} from "../controller/statistics";
import { getChannelList, getMajorList } from "../controller/common";

const router = Router({
	prefix: "/api/statistics"
});

const TOTLE_KEY = "总数";
const CONVERSION_RATE = "转化率";
const CONVERSION_PERCENT = "初始转化率";

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
	console.log(originObj);
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
				message.push(`${errName}不能为空`);
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

	// 返回对象
	let retData = {};

	// 简历总共存在七个阶段：初始简历、通过筛选、已约面、到面、意向录用、待入职、入职

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
			0, 0, 0, 0, 0, 0, 0
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
				// 未应约
				case "noAnswer":
					addNum(numData, item.channelName, 1);
					break;
				// 爽约
				case "breakPromise":
				// 已约面
				case "attendInterview":
					addNum(numData, item.channelName, 2);
					break;
				// 不录用，已回复
				case "noHire":
				// 已到面
				case "faced":
					addNum(numData, item.channelName, 3);
					break;
				// 拒Offer
				case "refuseOffer":
				// 意向录用
				case "employ":
					addNum(numData, item.channelName, 4);
					break;
				// 待入职
				case "joining":
					addNum(numData, item.channelName, 5);
					break;
				// 已入职
				case "join":
					addNum(numData, item.channelName, 6);
					break;
			}
		}
	});

	// 根据各个渠道初始简历数, 重置数据
	const originNumResult = await getChannelOriginNums(params);
	const originNum = originNumResult.datas;
	// 初始简历数
	const originData = {};
	// 通过初筛数
	const passData = {};
	originNum.forEach((item) => {
		if (originData[item.channelName]) {
			originData[item.channelName] += item.originNum;
			passData[item.channelName] += item.passNum;
		} else {
			originData[item.channelName] = item.originNum;
			passData[item.channelName] = item.passNum;
		}
	});
	// 重新赋值初始简历数和通过筛选数
	for (let channelName in originData) {
		// 总数和初始简历数需要先减去原来的数值，再加上当前数值
		numData[TOTLE_KEY][0] =
			numData[TOTLE_KEY][0] -
			numData[channelName][0] +
			Number(originData[channelName]);
		numData[TOTLE_KEY][1] =
			numData[TOTLE_KEY][1] -
			numData[channelName][1] +
			Number(passData[channelName]);
		numData[channelName][0] = Number(originData[channelName]);
		numData[channelName][1] = Number(passData[channelName]);
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

	// 获取不同专业的入职比例

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
	// 各个专业的总数和入职人数对象{total: 总数, joinNum: 入职人数}
	const majorData = {};

	// 初始化专业对象
	majorArr.forEach((item) => {
		const obj = {
			total: 0,
			joinNum: 0
		};
		majorData[item.majorName] = obj;
	});

	// 获取所有简历，统计不同专业的总数和入职个数
	const res = await getEntryRate(params);
	res.forEach((item) => {
		if (item.majorName != null && item.majorName != "") {
			majorData[item.majorName].total++;
			// 统计入职个数
			if (item.statusId === "join") {
				majorData[item.majorName].joinNum++;
			}
		}
	});
	// 遍历专业对象
	for (let major in majorData) {
		let obj = {};
		// 专业名称
		obj.majorName = major;
		// 入职比例比例
		obj.proportion =
			majorData[major].joinNum != 0
				? (
					(majorData[major].joinNum * 100) /
					majorData[major].total
				).toFixed(2)
				: "0.00";
		returnData.push(obj);
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

// 生成周报
router.get('/generateWeekReport', async (ctx, next) => {
	const params = ctx.query;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await generateWeekReport(params);
	if (res) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
	}
})

// 获取当前未给出面试评价的面试官数据
router.get('/getInterviewerData', async (ctx, next) => {
	const params = ctx.query;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await getInterviewerData_nocommit(params);
	if (res) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
	}
})

// 不同阶段的简历数增加，index:1-6=通过筛选、已约面、到面、意向录用、待入职、入职
function addNum(obj, channelName, index) {
	for (let i = 1; i <= index; i++) {
		obj[TOTLE_KEY][i]++;
		obj[channelName][i]++;
	}
}

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
		case "originNum":
			res = "初始简历数";
			break;
		case "passNum":
			res = "通过初筛数";
			break;
	}
	return res;
}

export default router;
