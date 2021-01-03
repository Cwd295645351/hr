/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-02 17:46:51
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-03 15:08:50
 */
const mongoose = require("../db");

const IntervieweesSchema = mongoose.Schema(
	{
		date: {
			type: String,
			required: true
		},
		majorId: {
			type: String,
			required: true
		},
		majorName: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		phoneNum: {
			type: Number
		},
		email: {
			type: String
		},
		channelId: {
			type: String,
			required: true
		},
		channelName: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		schedules:{
			type:Object,
			required:true
		},
		phoneInterviewSituation: {
			type: String
		},
		remark: {
			type: String
		}
	},
	{ timestamps: true }
);

// Interview 对应 collection
const Interview = mongoose.model("interviewees", IntervieweesSchema);

module.exports = Interview;
