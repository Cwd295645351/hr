/*
 * @Description: 入职信息
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-04-24 21:27:19
 * @LastEditors: Chen
 * @LastEditTime: 2021-04-25 22:45:24
 */
import mongoose from "../db";
import dayjs from "dayjs";

// 用 Schema 定义数据规范
const JoinInfoSchema = mongoose.Schema(
	{
		userId: {
			// 用户id
			type: String,
			required: true
		},
		NO: {
			// 档案编号
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
		joinProperty: {
			// 入职性质
			type: String
		},
		name: {
			// 姓名
			type: String
		},
		apartment: {
			// 部门
			type: String
		},
		phoneNum: {
			// 电话号码
			type: String
		},
		joinRemark: {
			// 入职备注
			type: String
		},
		statusId: {
			// 状态id
			type: String
		},
		statusName: {
			// 状态名称
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
JoinInfoSchema.set("toJSON", { getters: true });

// Model 对应 collection
const JoinInfo = mongoose.model("joininfo", JoinInfoSchema);

export default JoinInfo;
