/*
 * @Description: 面试官
 * @Version:
 * @Author:
 * @Date: 2022-02-13 17:03:50
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-20 23:08:08
 */

import mongoose from "../db";

// 用 Schema 定义数据规范
const InterviewerSchema = mongoose.Schema(
	{
		// id
		id: { type: Number, required: true, unique: true },
		// 名称
		name: { type: String, required: true },
		// 排序
		sort: { type: String, required: true, unique: true },
		// 是否在职
		onWork: { type: Boolean, required: true },
		// 是否是领导
		isLeader: { type: Boolean, required: true }
	},
	{ timestamps: true }
);

// Model 对应 collection
const Interviewer = mongoose.model("interviewer", InterviewerSchema);

export default Interviewer;
