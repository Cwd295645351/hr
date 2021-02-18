/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2020-12-24 22:55:45
 * @LastEditors: Chen
 * @LastEditTime: 2021-02-18 12:47:56
 */

import mongoose from "../db";

// 用 Schema 定义数据规范
const StatusSchema = mongoose.Schema(
	{
		statusId: {
			type: String,
			required: true,
			unique: true // 唯一，不能重复
		},
		statusName: {
			type: String,
			required: true // 必需
		}
	},
	{ timestamps: true }
);

// Model 对应 collection
const Status = mongoose.model("status", StatusSchema);

export default Status;
