/*
 * @Description: 面试配置
 * @Version:
 * @Author: Chen
 * @Date: 2020-12-24 22:55:45
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-13 18:21:30
 */

import mongoose from "../db";

// 用 Schema 定义数据规范
const ConfigSchema = mongoose.Schema(
	{
		// 学校性质
		schoolProperty: { type: Array, required: true },
		// 学历
		degree: { type: Array, required: true },
		// 面试形式
		mode: { type: Array, required: true },
		// 类别
		type: { type: Array, required: true }
	},
	{ timestamps: true }
);

// Model 对应 collection
const Config = mongoose.model("config", ConfigSchema);

export default Config;
