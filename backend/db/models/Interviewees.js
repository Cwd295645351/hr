/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-02 17:46:51
 * @LastEditors: Chen
 * @LastEditTime: 2021-04-24 21:32:39
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
			type: String
		},
		majorName: {
			// 专业名称
			type: String
		},
		name: {
			// 姓名
			type: String
		},
		property: {
			// 招工性质
			type: String
		},
		phoneNum: {
			// 电话号码
			type: String
		},
		email: {
			// 邮箱
			type: String
		},
		channelId: {
			// 渠道id
			type: String
		},
		channelName: {
			// 渠道名称
			type: String
		},
		statusId: {
			// 状态
			type: String
		},
		statusName: {
			// 状态
			type: String
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
			type: String
		},
		fileList: {
			// 相关材料
			type: Array
		},
		remark: {
			// 备注
			type: String
		},
		NO: {
			// 档案编号
			type: String
		},
		joinProperty: {
			// 入职性质
			type: String
		},
		apartment: {
			// 部门
			type: String
		},
		joinRemark: {
			// 入职备注
			type: String
		},
		hideTag: {
			// 隐藏标志
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
