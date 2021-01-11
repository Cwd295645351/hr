/*
 * @Description: 面试情况路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-29 00:00:00
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-11 23:59:42
 */
import Router from "koa-router";
import {
	getList,
	addInterviewee,
	editInterviewee
} from "../controller/situation";
import { SuccessModel, ErrorModel } from "../model/resModel";

const router = Router({
	prefix: "/api/situation"
});

// 获取面试者列表
router.post("/getList", async (ctx, next) => {
	const params = ctx.request.body;
	const res = await getList(params);
	if (res.length > 0) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
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

export default router;
