/*
 * @Description: 面试情况路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-29 00:00:00
 * @LastEditors: Chen
 * @LastEditTime: 2021-02-18 12:51:12
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
	if (res) {
		ctx.body = new SuccessModel("", "新增成功");
	} else {
		ctx.body = new ErrorModel(null, "新增失败");
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
	const res = await editInterviewee(interviewee);
	if (res) {
		ctx.body = new SuccessModel("", "修改成功");
	} else {
		ctx.body = new ErrorModel(null, "修改失败");
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
	const res = await deleteInterviewee(data);
	if (res) {
		ctx.body = new SuccessModel("", "删除成功");
	} else {
		ctx.body = new ErrorModel(null, "删除失败");
	}
});

export default router;
