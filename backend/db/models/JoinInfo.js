/*
 * @Description: 入职信息
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-04-24 21:27:19
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-13 18:17:37
 */
import mongoose from "../db";
import dayjs from "dayjs";

// 用 Schema 定义数据规范
const JoinInfoSchema = mongoose.Schema(
	{
		// 用户id
		userId: { type: String, required: true },
		// 档案编号
		NO: { type: String },
		// 入职时间
		joinDate: {
			type: Date,
			get: (v) => {
				return v ? dayjs(v).format("YYYY-MM-DD") : "";
			}
		},
		// 性质
		property: { type: String },
		// 姓名
		name: { type: String },
		// 部门
		apartment: { type: String },
		// 电话号码
		phoneNum: { type: String },
		// 入职备注
		joinRemark: { type: String },
		// 状态id
		statusId: { type: String },
		// 状态名称
		statusName: { type: String },
		// 隐藏标志
		hideTag: { type: String }
	},
	{ timestamps: true }
);

// 使格式化时间能输出
JoinInfoSchema.set("toJSON", { getters: true });

// Model 对应 collection
const JoinInfo = mongoose.model("joininfo", JoinInfoSchema);

export default JoinInfo;
