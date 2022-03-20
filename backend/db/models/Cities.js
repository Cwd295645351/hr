/*
 * @Description: 城市
 * @Version:
 * @Author:
 * @Date: 2022-02-13 17:03:50
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-20 23:19:41
 */

import mongoose from "../db";

// 用 Schema 定义数据规范
const CitySchema = mongoose.Schema(
	{
		// id
		id: { type: Number, required: true, unique: true },
		// 名称
		name: { type: String, required: true },
		// 排序
		sort: { type: String, required: true, unique: true }
	},
	{ timestamps: true }
);

// Model 对应 collection
const City = mongoose.model("city", CitySchema);

export default City;
