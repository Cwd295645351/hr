/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-02 17:46:51
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-08 21:36:08
 */
import mongoose from "../db";
import dayjs from "dayjs";

const IntervieweesSchema = mongoose.Schema(
	{
		// 用户id
		userId: { type: String, required: true },
		// 姓名
		name: { type: String },
		// 英文姓名
		EnglishName: { type: String },
		// 电话号码
		phoneNum: { type: String },
		// 邮箱
		email: { type: String },
		// 所在城市
		city: { type: String },
		// 主要工作经历（公司&岗位名称）
		experience: { type: String },
		// 应聘部门id
		apartmentId: { type: Number },
		// 应聘部门名称
		apartmentName: { type: String },
		// 应聘职位id
		jobId: { type: Number },
		// 应聘职位名称
		jobName: { type: String },
		// 劳动合同签署公司id
		companyId: { type: Number },
		// 劳动合同签署公司名称
		companyName: { type: String },
		// 阶段id：1=初筛简历；2=面试；3=录用；4=待入职；5=到岗；6=人才库
		stageId: { type: Number },
		// 状态id
		statusId: { type: String },
		// 状态名称
		statusName: { type: String },
		// 简历推送日期
		date: {
			type: Date,
			get: (v) => {
				return v ? dayjs(v).format("YYYY-MM-DD") : "";
			}
		},
		// 类别id
		typeId: { type: Number },
		// 类别名称（全职/实习）
		typeName: { type: String },
		// 招聘渠道id（1=招聘网站；2=内部推荐；3=社交媒体；4=猎头；5=校园招聘；6=其他）
		channelId: { type: String },
		// 招聘渠道名称
		channelName: { type: String },
		// 二级招聘渠道id
		subChannelId: { type: String },
		// 二级招聘渠道名称
		subChannelName: { type: String },
		// 性别(0=男，1=女)
		sex: { type: Number },
		// 毕业学校
		school: { type: String },
		// 专业
		major: { type: String },
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
				return v ? dayjs(v).format("YYYY-MM") : "";
			}
		},
		// 是否在职（0=否，1=是）
		isWork: { type: Number },
		// 入职时间
		joinDate: {
			type: Date,
			get: (v) => {
				return v ? dayjs(v).format("YYYY-MM-DD") : "";
			}
		},
		// 试用期满时间
		trialDate: {
			type: Date,
			get: (v) => {
				return v? dayjs(v).format("YYYY-MM-DD") : "";
			}
		},
		// 离职时间
		leaveDate: {
			type: Date,
			get: (v) => {
				return v? dayjs(v).format("YYYY-MM-DD") : "";
			}	
		},
		// 跟进事项
		todoList: { type: String },
		// 后续跟进人员
		followUp: { type: String },
		// 通知日期
		remindDate: {
			type: Date,
			get: (v) => {
				return v ? dayjs(v).format("YYYY-MM-DD") : "";
			}
		},
		// 提醒事项
		noticeStr: { type: String },
		// 提醒时间
		noticeDate: {
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
		// 简历更新时间列表（只有导出内容变化才更新）
		updateTime: [
			{
				// 更新类型：1=非面试状态变更，2=面试状态变更
				updateType: Number,
				// 更新时间
				timestamps: Number
			}
		],
		// 是否删除
		isDelete: { type: Boolean },
		// 入职部门
		joinApartmentName: { type: String },
		// Offer 岗位
		joinJobName: { type: String },
		// 直属上级
		manager: { type: String },
		// base 地点
		base: { type: String },
	},
	{ timestamps: true }
);

// 使格式化时间能输出
IntervieweesSchema.set("toJSON", { getters: true });

// Interview 对应 collection
const Interview = mongoose.model("interviewees", IntervieweesSchema);

export default Interview;
