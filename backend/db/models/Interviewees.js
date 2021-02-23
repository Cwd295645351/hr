/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-02 17:46:51
 * @LastEditors: Chen
 * @LastEditTime: 2021-02-23 23:24:36
 */
import mongoose from "../db";
import dayjs from "dayjs";

const IntervieweesSchema = mongoose.Schema(
	{
		userId: {
			// 用户id
			type: String,
			required: true
		},
		date: {
			// 登记日期
			type: Date,
			required: true,
			get: (v) => {
				if (v) {
					return dayjs(v).format("YYYY-MM-DD");
				} else {
					return "";
				}
			}
		},
		majorId: {
			// 专业id
			type: String,
			required: true
		},
		majorName: {
			// 专业名称
			type: String,
			required: true
		},
		name: {
			// 姓名
			type: String,
			required: true
		},
		property: {
			// 招工性质
			type: String,
			required: true // 导入表格时先注释掉
		},
		phoneNum: {
			// 电话号码
			type: String,
			required: true
		},
		email: {
			// 邮箱
			type: String,
			required: true //导入表格时先注释掉
		},
		channelId: {
			// 渠道id
			type: String,
			required: true
		},
		channelName: {
			// 渠道名称
			type: String,
			required: true
		},
		statusId: {
			// 状态
			type: String,
			required: true
		},
		statusName: {
			// 状态
			type: String,
			required: true
		},
		joinDate: {
			// 入职时间
			type: Date,
			get: (v) => {
				if (v) {
					return dayjs(v).format("YYYY-MM-DD");
				} else {
					return "";
				}
			}
		},
		schedules: {
			// 面试日程
			date: {
				type: Date,
				get: (v) => {
					if (v) {
						return dayjs(v).format("YYYY-MM-DD");
					} else {
						return "";
					}
				},
				set: (v) => {
					return v;
				}
			},
			time: {
				type: String
			},
			interviewer: {
				type: String
			},
			form: {
				type: String
			}
		},
		phoneInterviewSituation: {
			// 电话面试情况
			type: String,
			required: true
		},
		fileList: {
			// 相关材料
			type: Array
		},
		remark: {
			// 备注
			type: String
		}
	},
	{ timestamps: true }
);

// 使格式化时间能输出
IntervieweesSchema.set("toJSON", { getters: true });

// Interview 对应 collection
const Interview = mongoose.model("interviewees", IntervieweesSchema);

export default Interview;
