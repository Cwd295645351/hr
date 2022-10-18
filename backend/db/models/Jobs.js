/*
 * @Description: 职位模型
 * @Version:
 * @Author: Chen
 * @Date: 2020-12-24 22:55:45
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-13 22:34:58
 */

import mongoose from "../db";

// 用 Schema 定义数据规范
const JobSchema = mongoose.Schema(
	{
		// 部门id
		apartmentId: { type: Number, required: true, unique: true },
		// 部门名称
		apartmentName: { type: String, required: true },
		// 排序
		sort: { type: String, required: true, unique: true },
		// 职位
		jobs: { type: Array, required: true }
	},
	{ timestamps: true }
);

// Model 对应 collection
const Job = mongoose.model("job", JobSchema);

export default Job;
