/*
 * @Description: Mongoose 连接 Mongodb客户端
 * @Version:
 * @Author:
 * @Date: 2020-12-24 22:47:00
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-03 22:21:10
 */

import mongoose from "mongoose";
import CONF from "../conf/db";

const url = `mongodb://${CONF.MONGODB_CONF.host}:${CONF.MONGODB_CONF.port}`;
const dbName = CONF.MONGODB_CONF.dbName;

mongoose.set("useFindAndModify", false);

// 连接数据库
mongoose.connect(`${url}/${dbName}`, {
	// 配置
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//  获取连接对象
const db = mongoose.connection;

// 发生错误
db.on("error", (err) => {
	console.error(err);
});

// 连接成功
db.once("open", () => {
	console.log("mongoose connect success");
});

export default mongoose;
