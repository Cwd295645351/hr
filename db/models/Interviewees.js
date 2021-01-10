/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-02 17:46:51
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-11 00:05:04
 */
import mongoose from "../db";

const IntervieweesSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
		date: {
			type: String
		},
		majorId: {
			type: String
		},
		majorName: {
			type: String
		},
		name: {
			type: String
		},
		phoneNum: {
			type: Number
		},
		email: {
			type: String
		},
		channelId: {
			type: String
		},
		channelName: {
			type: String
		},
		status: {
			type: String
		},
		schedules: {
			type: Object
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

export default Interview;
