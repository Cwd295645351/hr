/*
 * @Description: 初始简历
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-02-27 22:19:05
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-13 18:18:23
 */
import mongoose from "../db";
import dayjs from "dayjs";

const OriginNumsSchema = mongoose.Schema(
	{
		// 用户id
		userId: { type: String, required: true },
		// 日期
		date: {
			type: Date,
			required: true,
			get: (v) => {
				return v ? dayjs(v).format("YYYY-MM-DD") : "";
			}
		},
		// 专业id
		majorId: { type: String, required: true },
		// 专业名称
		majorName: { type: String, required: true },
		// 渠道id
		channelId: { type: String, required: true },
		// 渠道名称
		channelName: { type: String, required: true },
		// 招工性质
		property: { type: String, required: true },
		// 初始简历数
		originNum: { type: Number, required: true },
		// 通过初筛数
		passNum: { type: Number, required: true },
		// 是否删除
		isDelete: { type: Boolean }
	},
	{ timestamps: true }
);

// 使格式化时间能输出
OriginNumsSchema.set("toJSON", { getters: true });

// OriginNums 对应 collection
const OriginNums = mongoose.model("origins", OriginNumsSchema);

export default OriginNums;
