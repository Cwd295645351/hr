/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2020-12-28 23:15:38
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-06 23:31:34
 */
// const Koa = require('koa')
import Koa from "koa";
import json from "koa-json";
import onerror from "koa-onerror";
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";
import koaStatic from "koa-static";
import session from "koa-generic-session";
import redisStore from "koa-redis";
import cors from "koa2-cors";
import koajwt from "koa-jwt";

import CONF from "./conf/db";

import user from "./routes/user";
import situation from "./routes/situation";

const app = new Koa();
const SECRET_KEY = "admin_jwt_token";

// error handler
onerror(app);

// middlewares
app.use(
	bodyparser({
		enableTypes: ["json", "form", "text"]
	})
);
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + "/public"));

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.keys = ["dsafasfas$@!6"];
app.use(
	session({
		// 配置 cookie
		cookie: {
			path: "/",
			httpOnly: true,
			maxAge: 2 * 60 * 60 * 1000 // 过期时间2小时
		},
		// 配置 redis
		store: redisStore({
			all: `${CONF.REDIS_CONF.host}:${CONF.REDIS_CONF.port}` // redis的地址
		})
	})
);

app.use(
	cors({
		origin: function (ctx) {
			//设置允许来自指定域名请求
			if (ctx.url === "/test") {
				return "*"; // 允许来自所有域名请求
			}
			return "http://localhost:8080"; //只允许http://localhost:8080这个域名的请求
		},
		maxAge: 5, //指定本次预检请求的有效期，单位为秒。
		credentials: true, //是否允许发送Cookie
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法'
		allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
		exposeHeaders: ["WWW-Authenticate", "Server-Authorization"] //设置获取其他自定义字段
	})
);

// 错误处理
app.use((ctx, next) => {
	return next().catch((err) => {
		if (err.status === 401) {
			ctx.status = 401;
			ctx.body = {
				retCode: 401,
				message: "接口鉴权失败，请重新登录"
			};
		} else {
			throw err;
		}
	});
});

app.use(
	koajwt({
		secret: SECRET_KEY
	}).unless({
		path: [/\/api\/user\/login/]
	})
);

// routes
app.use(user.routes(), user.allowedMethods());
app.use(situation.routes(), situation.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
	console.error("server error", err, ctx);
});

module.exports = app;
