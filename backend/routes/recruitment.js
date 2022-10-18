/*
 * @Description: 招聘需求路由
 * @Version: 
 * @Author: 
 * @Date: 2021-07-06 22:18:16
 * @LastEditors: Chen
 * @LastEditTime: 2021-07-06 22:34:34
 */
import Router from "koa-router";
import {
	getList,
	addRecruitment,
	editRecruitment,
	deleteRecruitment
} from "../controller/recruitmentNeeds";
import { SuccessModel, ErrorModel } from "../model/resModel";

const router = Router({
	prefix: "/api/recruitment"
});


// 获取面试者列表
router.post("/getList", async (ctx, next) => {
	const params = ctx.request.body;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await getList(params);
	if (res) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
	}
});


// 新增面试者
router.post("/addRecruitment", async (ctx, next) => {
	const interviewee = ctx.request.body;
	if (!interviewee.userId || interviewee.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await addRecruitment(interviewee);
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
router.post("/editRecruitment", async (ctx, next) => {
	const interviewee = ctx.request.body;
	if (!interviewee.userId || interviewee.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await editRecruitment(interviewee);
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

// 删除需求
router.post("/deleteRecruitment", async (ctx, next) => {
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
		const res = await deleteRecruitment(data);
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
			res = "登记日期";
			break;
		case "majorId":
		case "majorName":
			res = "专业";
			break;
		case "apartment":
			res = "部门";
			break;
		case "property":
			res = "性质";
			break;
		case "num":
			res = "人数";
			break;
		case "demand":
			res = "具体要求";
			break;
		case "hopeArrivalTime":
			res = "希望到岗时间";
			break;
		case "actualArrivalTime":
			res = "实际到岗时间";
			break;
		case "schedule":
			res = "进度";
			break;
	}
	return res;
}

export default router;