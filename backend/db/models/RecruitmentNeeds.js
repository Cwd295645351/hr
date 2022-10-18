/*
 * @Description: 招聘需求对象
 * @Version:
 * @Author:
 * @Date: 2021-07-06 21:45:27
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-23 21:51:22
 */
import mongoose from "../db";
import dayjs from "dayjs";

const RecruitmentNeedsSchema = mongoose.Schema(
	{
		// 用户id
		userId: { type: String, required: true },
		// 登记时间
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
		// 最低薪酬
		salaryMin: { type: Number },
		// 最高薪酬
		salaryMax: { type: Number },
		// 类别id
		typeId: { type: Number },
		// 类别名称
		typeName: { type: String },
		// 用人经理id
		interviewerId: { type: Number },
		// 用人经理名称
		interviewerName: { type: String },
		// 城市id
		cityId: { type: Number },
		// 城市名称
		cityName: { type: String },
		// 人数
		num: { type: Number },
		// JD
		demand: { type: String },
		// 希望到岗时间
		hopeArrivalTime: { type: String },
		// 实际到岗时间
		actualArrivalTime: { type: String },
		// 进度id
		scheduleId: { type: Number },
		// 优先级
		priority: { type: Number },
		// 备注
		remark: { type: String },
		// 是否删除
		isDelete: { type: Boolean }
	},
	{ timestamps: true }
);

// 使格式化时间能输出
RecruitmentNeedsSchema.set("toJSON", { getters: true });

// Model 对应 collection
const RecruitmentNeeds = mongoose.model(
	"recruitmentneed",
	RecruitmentNeedsSchema
);

export default RecruitmentNeeds;
