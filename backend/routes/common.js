/*
 * @Description: 公共路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-10 22:39:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-02-18 12:50:08
 */
import Router from "koa-router";
import { getMajorList, getChannelList, getStatusList } from "../controller/common";
import { SuccessModel, ErrorModel } from "../model/resModel";

const router = Router({
	prefix: "/api/common"
});

// 获取专业列表
router.get("/getMajorList", async (ctx, next) => {
	const res = await getMajorList();
	if (res.length > 0) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel("", "获取失败");
	}
});

// 获取渠道列表
router.get("/getChannelList", async (ctx, next) => {
	const res = await getChannelList();
	if (res.length > 0) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel("", "获取失败");
	}
});

// 获取状态列表
router.get("/getStatusList", async (ctx, next) => {
	const res = await getStatusList();
	if (res.length > 0) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel("", "获取失败");
	}
});

// 上传文件
router.post("/uploadFile", async (ctx, next) => {
	const files = ctx.request.files.file;
	files.path = files.path.slice(6);
	ctx.body = JSON.stringify(files);
});

export default router;
