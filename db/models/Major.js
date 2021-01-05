/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2020-12-24 22:55:45
 * @LastEditors: Chen
 * @LastEditTime: 2020-12-28 00:16:42
 */

import mongoose from "../db";

// 用 Schema 定义数据规范
const MajorSchema = mongoose.Schema(
	{
		majorId: String,
		majorName: {
			type: String,
			required: true, // 必需
			unique: true, // 唯一，不能重复
		},
	},
	{ timestamps: true }
);

// Model 对应 collection
const Major = mongoose.model("major", MajorSchema);

module.exports = Major;
