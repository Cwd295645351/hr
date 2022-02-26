/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-02 17:46:51
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-24 23:38:37
 */
import mongoose from "../db";
import dayjs from "dayjs";

const IntervieweesSchema = mongoose.Schema(
	{
		// 用户id
		userId: { type: String, required: true },
		// 简历推送日期
		date: {
			type: Date,
			get: (v) => {
				return v ? dayjs(v).format("YYYY-MM-DD") : "";
			}
		},
		// 应聘部门id
		apartmentId: { type: Number },
		// 应聘部门名称
		apartmentName: { type: String },
		// 应聘职位id
		jobId: { type: Number },
		// 应聘职位名称
		jobName: { type: String },
		// 类别id
		propertyId: { type: Number },
		// 类别名称
		propertyName: { type: String },
		// 招聘渠道id
		channelId: { type: Number },
		// 招聘渠道名称
		channelName: { type: String },
		// 姓名
		name: { type: String },
		// 性别(0=男，1=女)
		sex: { type: Number },
		// 电话号码
		phoneNum: { type: String },
		// 邮箱
		email: { type: String },
		// 所在城市
		city: { type: String },
		// 毕业学校
		school: { type: String },
		// 学校性质id
		schoolPropertyId: { type: Number },
		// 学校性质名称
		schoolPropertyName: { type: String },
		// 学历id
		degreeId: { type: Number },
		// 学历名称
		degreeName: { type: String },
		// 是否全日制（0=否，1=是）
		isFullTime: { type: Number },
		// 毕业时间
		graduationDate: {
			type: Date,
			get: (v) => {
				return v ? dayjs(v).format("YYYY-MM-DD") : "";
			}
		},
		// 是否在职（0=否，1=是）
		isWork: { type: Number },
		// 状态id
		statusId: { type: Number },
		// 状态名称
		statusName: { type: String },
		// 入职时间
		joinDate: {
			type: Date,
			get: (v) => {
				return v ? dayjs(v).format("YYYY-MM-DD") : "";
			}
		},
		// 面试日程
		schedules: { type: Array },
		// 是否到面(0=否，1=是)
		isArrivalInterview: { type: Number },
		// 相关材料
		fileList: { type: Array },
		// 备注
		remark: { type: String },
		// 档案编号
		NO: { type: String },
		// 入职备注
		joinRemark: { type: String },
		// 隐藏标志(隐藏入职信息):"1"=隐藏，"0"=显示
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
