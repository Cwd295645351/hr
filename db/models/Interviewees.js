/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-02 17:46:51
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-14 00:08:19
 */
import mongoose from "../db";
import dayjs from "dayjs";

const IntervieweesSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			required: true,
			get: (v) => {
				return dayjs(v).format("YYYY-MM-DD");
			}
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
			type: String,
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

// 使格式化时间能输出
IntervieweesSchema.set("toJSON", { getters: true });

// Interview 对应 collection
const Interview = mongoose.model("interviewees", IntervieweesSchema);

export default Interview;
