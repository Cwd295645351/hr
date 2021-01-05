/*
 * @Description: 用户登录路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-29 00:00:00
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 23:56:57
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
		// 数据库存在用户
		// console.log("1111",res);
		ctx.session.token = res.token;
		ctx.body = new SuccessModel(res, "登录成功");
	} else {
		ctx.body = new ErrorModel(null, "登录失败");
	}
});

module.exports = router;
