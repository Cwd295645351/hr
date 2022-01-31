/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-02 17:46:51
 * @LastEditors: Chen
 * @LastEditTime: 2022-01-31 10:41:15
 */
import mongoose from "../db";
import dayjs from "dayjs";

const IntervieweesSchema = mongoose.Schema(
	{
		// 用户id
		userId: { type: String, required: true },
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
		// 专业id
		majorId: { type: String },
		// 专业名称
		majorName: { type: String },
		// 姓名
		name: { type: String },
		// 招工性质
		property: { type: String },
		// 电话号码
		phoneNum: { type: String },
		// 邮箱
		email: { type: String },
		// 渠道id
		channelId: { type: String },
		// 渠道名称
		channelName: { type: String },
		// 状态
		statusId: { type: String },
		// 状态
		statusName: { type: String },
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
			time: { type: String },
			interviewer: { type: String },
			form: { type: String }
		},
		// 电话面试情况
		phoneInterviewSituation: { type: String },
		// 相关材料
		fileList: { type: Array },
		// 备注
		remark: { type: String },
		// 档案编号
		NO: { type: String },
		// 部门
		apartment: { type: String },
		// 入职备注
		joinRemark: { type: String },
		// 隐藏标志(隐藏入职信息)
		hideTag: { type: String },
		// 是否删除
		isDelete: { type: Boolean }
	},
	{ timestamps: true }
);

// 使格式化时间能输出
IntervieweesSchema.set("toJSON", { getters: true });

// Interview 对应 collection
const Interview = mongoose.model("interviewees", IntervieweesSchema);

export default Interview;
