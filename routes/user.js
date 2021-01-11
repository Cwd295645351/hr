/*
 * @Description: 用户登录路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-29 00:00:00
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-11 23:49:51
 */
import Router from "koa-router";
import login from "../controller/user";
import { SuccessModel, ErrorModel } from "../model/resModel";
import jwt from "jsonwebtoken";

const SECRET_KEY = "admin_jwt_token";
const EXPIRES_TIME = 3600000;

const router = Router({
	prefix: "/api/user"
});

// 登录
router.post("/login", async (ctx, next) => {
	const { username, password } = ctx.request.body;
	const res = await login(username, password);
	if (res) {
		// 数据库存在用户
		// jwt生成token
		const accessToken = jwt.sign(
			{
				user_id: res._id
			},
			SECRET_KEY,
			{ expiresIn: EXPIRES_TIME }
		);
		// refresh token
		const refreshToken = accessToken.slice(
			accessToken.lastIndexOf(".") + 1
		);
		ctx.session.user_id = res._id;
		ctx.session.refreshToken = refreshToken;

		const retData = {
			accessToken: accessToken,
			refreshToken: refreshToken,
			expiresIn: EXPIRES_TIME,
			userId: res._id
		};

		ctx.body = new SuccessModel(retData, "登录成功");
	} else {
		ctx.body = new ErrorModel(null, "用户名或密码错误");
	}
});

// 刷新token
router.post("/refreshToken", async (ctx, next) => {
	const { refreshToken } = ctx.request.body;
	if (ctx.session.refreshToken === refreshToken) {
		// 当前用户已登录，刷新token
		// jwt生成token
		const accessToken = jwt.sign(
			{
				user_id: ctx.session.user_id
			},
			SECRET_KEY,
			{ expiresIn: EXPIRES_TIME }
		);
		// refresh token
		const refreshToken = accessToken.slice(
			accessToken.lastIndexOf(".") + 1
		);
		ctx.session.refreshToken = refreshToken;
		const retData = {
			accessToken: accessToken,
			refreshToken: refreshToken,
			expiresIn: EXPIRES_TIME,
			userId: ctx.session.user_id
		};

		ctx.body = new SuccessModel(retData, "刷新成功");
	} else {
		ctx.body = new ErrorModel(null, "无效参数refreshToken");
	}
});

module.exports = router;
