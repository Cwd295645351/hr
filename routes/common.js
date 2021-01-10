/*
 * @Description: 公共路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-10 22:39:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-10 22:47:01
 */
import Router from "koa-router";
import { getMajorList, getChannelList } from "../controller/common";
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

export default router;
