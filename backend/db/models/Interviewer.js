/*
 * @Description: 面试官
 * @Version:
 * @Author:
 * @Date: 2022-02-13 17:03:50
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-13 17:15:26
 */

import mongoose from "../db";

// 用 Schema 定义数据规范
const InterviewerSchema = mongoose.Schema(
	{
		// id
		id: { type: String, required: true, unique: true },
		// 名称
		name: { type: String, required: true },
		// 排序
		sort: { type: String, required: true },
		// 是否在职
		onWork: { type: String, required: true }
	},
	{ timestamps: true }
);

// Model 对应 collection
const Interviewer = mongoose.model("interviewer", InterviewerSchema);

export default Interviewer;
