/*
 * @Description: 数据库配置
 * @Version:
 * @Author: Chen
 * @Date: 2021-01-03 16:48:13
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-03 21:51:46
 */

const env = process.env.NODE_ENV;

// 配置
let MONGODB_CONF;
let REDIS_CONF;

if (env === "dev") {
	// mongodb
	MONGODB_CONF = {
		host: "127.0.0.1",
		port: "27017",
		dbName: "hr-manage"
	};

	// redis
	REDIS_CONF = {
		port: 6379,
		host: "127.0.0.1"
	};
} else {
	// mongodb
	MONGODB_CONF = {
		host: "127.0.0.1",
		port: "27017",
		dbName: "hr-manage"
	};
	// redis
	REDIS_CONF = {
		port: 6379,
		host: "127.0.0.1"
	};
}

export default {
	MONGODB_CONF,
	REDIS_CONF
};
