/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2020-12-28 23:15:38
 * @LastEditors: Chen
 * @LastEditTime: 2021-07-06 22:35:13
 */
// const Koa = require('koa')
import Koa from "koa";
import json from "koa-json";
import onerror from "koa-onerror";
import logger from "koa-logger";
import koaStatic from "koa-static";
import session from "koa-generic-session";
import redisStore from "koa-redis";
import cors from "koa2-cors";
import koajwt from "koa-jwt";
import path from "path";
import fs from "fs";
import morgan from "koa-morgan";

import CONF from "./conf/db";

import user from "./routes/user";
import situation from "./routes/situation";
import statistics from "./routes/statistics";
import joinInfo from "./routes/joinInfo";
import schedule from "./routes/schedule";
import recruitment from "./routes/recruitment";
import common from "./routes/common";
import koaBody from "koa-body";

const app = new Koa();
const SECRET_KEY = "admin_jwt_token";

// error handler
onerror(app);

// middlewares
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

// 配置日志
const ENV = process.env.NODE_ENV;
if (ENV != "production") {
	// 开发环境 / 测试环境
	app.use(
		morgan("dev", {
			stream: process.stdout
		})
	);
} else {
	// 线上环境
	const logFileName = path.join(__dirname, "logs", "access.log");
	const writeStream = fs.createWriteStream(logFileName, {
		flags: "a"
	});
	app.use(
		morgan("combined", {
			stream: writeStream
		})
	);
}

// 配置session和cookie
app.keys = ["dsafasfas$@!6"];
app.use(
	session({
		// 配置 cookie
		cookie: {
			path: "/",
			httpOnly: true,
			maxAge:  24 * 60 * 60 * 1000 // 过期时间2小时
		},
		// 配置 redis
		store: redisStore({
			all: `${CONF.REDIS_CONF.host}:${CONF.REDIS_CONF.port}` // redis的地址
		})
	})
);

// 处理跨域请求
app.use(
	cors({
		origin: function (ctx) {
			return "*"; //只允许所有域名的请求
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
			ctx.headers["Content-Type"] = "application/json";
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

// jwt验证
app.use(
	koajwt({
		secret: SECRET_KEY
	}).unless({
		path: [/\/api\/user\/login/]
	})
);

// 文件上传处理
app.use(
	koaBody({
		multipart: true,
		formidable: {
			maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
			keepExtensions: true,
			maxFields: 2 * 1024 * 1024, // 文件上传大小
			uploadDir: path.join(__dirname, "public/upload/"),
			onFileBegin: (name, file) => {
				// 文件存储之前对文件进行重命名处理
				const fileFormat = file.name.split(".");
				let savePath = `${Date.now()}.${
					fileFormat[fileFormat.length - 1]
				}`;
				file.path = `public/upload/${savePath}`;
			}
		}
	})
);

// routes
app.use(user.routes(), user.allowedMethods());
app.use(situation.routes(), situation.allowedMethods());
app.use(common.routes(), common.allowedMethods());
app.use(statistics.routes(), statistics.allowedMethods());
app.use(schedule.routes(), schedule.allowedMethods());
app.use(recruitment.routes(), recruitment.allowedMethods());
app.use(joinInfo.routes(), joinInfo.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
	console.error("server error", err, ctx);
});

module.exports = app;
