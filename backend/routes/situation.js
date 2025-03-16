/*
 * @Description: 面试情况路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-29 00:00:00
 * @LastEditors: Chen
 * @LastEditTime: 2022-06-06 23:14:17
 */
import Router from "koa-router";
import {
	getList,
	exportData,
	addInterviewee,
	importInterviewee,
	editInterviewee,
	deleteInterviewee,
	changeSchedule,
	downloadData
} from "../controller/situation";
import { SuccessModel, ErrorModel } from "../model/resModel";

const router = Router({
	prefix: "/api/situation"
});

// 获取候选人列表
router.post("/getList", async (ctx, next) => {
	const params = ctx.request.body;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	if (params.beginDate != "" && params.beginDate != undefined) {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.beginDate) == false) {
			ctx.body = new ErrorModel(null, "开始时间不规范");
			return;
		}
	}
	if (params.endDate != "" && params.endDate != undefined) {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.endDate) == false) {
			ctx.body = new ErrorModel(null, "结束时间不规范");
			return;
		}
	}
	const res = await getList(params);
	if (res) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
	}
});

router.post("/exportData", async (ctx, next) => {
	const params = ctx.request.body;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	if (params.beginDate != "" && params.beginDate != undefined) {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.beginDate) == false) {
			ctx.body = new ErrorModel(null, "开始时间不规范");
			return;
		}
	}
	if (params.endDate != "" && params.endDate != undefined) {
		const reg = /^\d{4}-\d{2}-\d{2}$/gi;
		if (reg.test(params.endDate) == false) {
			ctx.body = new ErrorModel(null, "结束时间不规范");
			return;
		}
	}
	const res = await exportData(params);
	if (res) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
	}
});

router.post("/downloadData", async (ctx, next) => {
	const params = ctx.request.body;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await downloadData(params);
	if (res) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
	}
});

// 批量导入候选人
router.post("/importInterviewee", async (ctx, next) => {
	const interviewee = ctx.request.body;
	const res = await importInterviewee(interviewee);
	if (res) {
		ctx.body = new SuccessModel(res, "新增成功");
	} else {
		ctx.body = new ErrorModel(null, "新增失败");
	}
});

// 新增候选人
router.post("/addInterviewee", async (ctx, next) => {
	const interviewee = ctx.request.body;
	if (!interviewee.userId || interviewee.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await addInterviewee(interviewee);
	if (res.retCode == 0) {
		ctx.body = new SuccessModel("", "新增成功");
	} else if (res.retCode == 2) {
		ctx.body = new ErrorModel(null, "候选人已存在");
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

// 编辑候选人
router.post("/editInterviewee", async (ctx, next) => {
	const interviewee = ctx.request.body;
	if (!interviewee.userId || interviewee.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await editInterviewee(interviewee);
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

// 修改候选人面试进程
router.post("/changeSchedule", async (ctx, next) => {
	const interviewee = ctx.request.body;
	if (!interviewee.userId || interviewee.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await changeSchedule(interviewee);
	if (res.retCode == 0) {
		ctx.body = new SuccessModel("", "编辑成功");
	} else if (res.retCode == -1) {
		ctx.body = new ErrorModel("", "编辑失败");
	}
});

// 删除候选人
router.post("/deleteInterviewee", async (ctx, next) => {
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
		const res = await deleteInterviewee(data);
		if (res) {
			ctx.body = new SuccessModel("", "删除成功");
		} else {
			ctx.body = new ErrorModel(null, "删除失败");
		}
	} catch (e) {
		ctx.body = new ErrorModel(null, "删除失败");
	}
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
	}
	return res;
}

export default router;
