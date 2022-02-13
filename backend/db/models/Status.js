/*
 * @Description: 状态模型
 * @Version:
 * @Author:
 * @Date: 2020-12-24 22:55:45
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-13 17:02:52
 */

import mongoose from "../db";

// 用 Schema 定义数据规范
const StatusSchema = mongoose.Schema(
	{
		// id
		id: { type: String, required: true, unique: true },
		// 名称
		name: { type: String, required: true }
	},
	{ timestamps: true }
);

// Model 对应 collection
const Status = mongoose.model("status", StatusSchema);

export default Status;
