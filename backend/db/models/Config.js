/*
 * @Description: 面试配置
 * @Version:
 * @Author: Chen
 * @Date: 2020-12-24 22:55:45
 * @LastEditors: Chen
 * @LastEditTime: 2022-05-30 22:45:57
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
		type: { type: Array, required: true },
		// 985大学名单
		_985: { type: Array, required: true },
		// 211学校名单
		_211: { type: Array, required: true },
		// 签署合同公司名单
		companies: { type: Array, required: true },
		
	},
	{ timestamps: true }
);

// Model 对应 collection
const Config = mongoose.model("config", ConfigSchema);

export default Config;
