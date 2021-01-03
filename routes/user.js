/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2020-12-29 00:00:00
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-03 23:13:28
 */
import Router from "koa-router";
import login from "../controller/user";
import resModel from "../model/resModel";

const SuccessModel = resModel.SuccessModel;
const ErrorModel = resModel.ErrorModel;

const router = Router({
	prefix: "/api/user"
});

router.post("/login", async (ctx, next) => {
	const { username, password } = ctx.request.body;
	const res = await login(username, password);
	if (res) {
		ctx.body = new SuccessModel(res, "登录成功");
	} else {
		ctx.body = new ErrorModel("登录失败");
	}
});

module.exports = router;
