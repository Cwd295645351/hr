/*
 * @Description: 招聘需求对象
 * @Version:
 * @Author:
 * @Date: 2021-07-06 21:45:27
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-01 12:26:01
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
		// 部门
		apartment: { type: String },
		// 性质
		property: { type: String },
		// 人数
		num: { type: Number },
		// 具体要求
		demand: { type: String },
		// 希望到岗时间
		hopeArrivalTime: { type: String },
		// 实际到岗时间
		actualArrivalTime: { type: String },
		// 进度
		schedule: { type: String },
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
