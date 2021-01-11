/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-02 17:46:51
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-11 22:45:20
 */
import mongoose from "../db";

const IntervieweesSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
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
			type: Number,
			required: true
		},
		email: {
			type: String,
			required: true
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
		schedules: {
			type: Object,
			required: true
		},
		phoneInterviewSituation: {
			type: String,
			required: true
		},
		remark: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

// Interview 对应 collection
const Interview = mongoose.model("interviewees", IntervieweesSchema);

export default Interview;
