/*
 * @Description: 入职信息路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-04-24 23:03:16
 * @LastEditors: Chen
 * @LastEditTime: 2021-04-25 22:27:12
 */
import Router from "koa-router";
import { getList, addInfo, editInfo, hideInfo } from "../controller/joinInfo";
import { SuccessModel, ErrorModel } from "../model/resModel";

const router = Router({
	prefix: "/api/joinInfo"
});

// 获取面试信息
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

// 新增面试信息
router.post("/addInfo", async (ctx, next) => {
	const params = ctx.request.body;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	const res = await addInfo(params);
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

// 编辑入职信息
router.post("/editInfo", async (ctx, next) => {
	const params = ctx.request.body;
	if (!params.userId || params.userId == "") {
		ctx.body = new ErrorModel(null, "userId不能为空");
		return;
	}
	let isFromInfo = false;
	if (params.updatedAt) {
		// 数据存放在入职信息表
		isFromInfo = true;
	}
	const res = await editInfo(params, isFromInfo);
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

// 隐藏入职信息
router.post("/hideInfo", async (ctx, next) => {
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
		const res = await hideInfo(data);
		if (res) {
			ctx.body = new SuccessModel("", "隐藏成功");
		} else {
			ctx.body = new ErrorModel(null, "隐藏失败");
		}
	} catch (e) {
		ctx.body = new ErrorModel(null, "隐藏失败");
	}
});

export default router;
