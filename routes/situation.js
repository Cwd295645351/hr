/*
 * @Description: 面试情况路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-29 00:00:00
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 23:58:09
 */
import Router from "koa-router";
import { getList, addInterviewee } from "../controller/situation";
import loginCheck from "../middleware/loginCheck";
import resModel from "../model/resModel";

const SuccessModel = resModel.SuccessModel;
const ErrorModel = resModel.ErrorModel;

const router = Router({
	prefix: "/api/situation"
});

// 获取面试者列表
router.get("/getList", loginCheck, async (ctx, next) => {
	console.log(ctx.session);
	const res = await getList();
	console.log(res.length);
	if (res.length > 0) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel(null, "获取失败");
	}
});

// 新增面试者
router.post("/addInterviewee", loginCheck, async (ctx, next) => {
	const interviewee = ctx.request.body;
	const res = await addInterviewee(interviewee);
	if (res) {
		ctx.body = new SuccessModel("", "新增成功");
	} else {
		ctx.body = new ErrorModel(null, "新增失败");
	}
});

module.exports = router;
