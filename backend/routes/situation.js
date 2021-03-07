/*
 * @Description: 面试情况路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-29 00:00:00
 * @LastEditors: Chen
 * @LastEditTime: 2021-03-07 12:18:47
 */
import Router from "koa-router";
import {
	getList,
	addInterviewee,
	importInterviewee,
	editInterviewee,
	deleteInterviewee
} from "../controller/situation";
import { SuccessModel, ErrorModel } from "../model/resModel";

const router = Router({
	prefix: "/api/situation"
});

// 获取面试者列表
router.post("/getList", async (ctx, next) => {
	const params = ctx.request.body;
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
	const res = await getList(params);
	if (res) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
	}
});

// 批量导入面试者
router.post("/importInterviewee", async (ctx, next) => {
	const interviewee = ctx.request.body;
	const res = await importInterviewee(interviewee);
	if (res) {
		ctx.body = new SuccessModel(res, "新增成功");
	} else {
		ctx.body = new ErrorModel(null, "新增失败");
	}
});

// 新增面试者
router.post("/addInterviewee", async (ctx, next) => {
	const interviewee = ctx.request.body;
	if (!interviewee.userId || interviewee.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
	}
	const res = await addInterviewee(interviewee);
	if (res.retCode == 0) {
		ctx.body = new SuccessModel("", "新增成功");
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

// 编辑面试者
router.post("/editInterviewee", async (ctx, next) => {
	const interviewee = ctx.request.body;
	if (!interviewee.userId || interviewee.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	if (!interviewee.id || interviewee.id == "") {
		ctx.body = new ErrorModel(null, "id不能为空");
		return;
	}
	if (!interviewee.date || interviewee.date == "") {
		ctx.body = new ErrorModel(null, "日期不能为空");
		return;
	}
	if (!interviewee.majorId || interviewee.majorId == "") {
		ctx.body = new ErrorModel(null, "专业不能为空");
		return;
	}
	if (!interviewee.name || interviewee.name == "") {
		ctx.body = new ErrorModel(null, "姓名不能为空");
		return;
	}
	if (!interviewee.property || interviewee.property == "") {
		ctx.body = new ErrorModel(null, "性质不能为空");
		return;
	}
	if (!interviewee.phoneNum || interviewee.phoneNum == "") {
		ctx.body = new ErrorModel(null, "手机号不能为空");
		return;
	}
	if (!interviewee.email || interviewee.email == "") {
		ctx.body = new ErrorModel(null, "邮箱不能为空");
		return;
	}
	if (!interviewee.channelId || interviewee.channelId == "") {
		ctx.body = new ErrorModel(null, "渠道不能为空");
		return;
	}
	if (!interviewee.statusId || interviewee.statusId == "") {
		ctx.body = new ErrorModel(null, "简历状态不能为空");
		return;
	}
	if (
		!interviewee.phoneInterviewSituation ||
		interviewee.phoneInterviewSituation == ""
	) {
		ctx.body = new ErrorModel(null, "电话面试情况不能为空");
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

// 删除面试者
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
