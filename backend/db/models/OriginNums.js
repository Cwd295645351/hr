/*
 * @Description: 初始简历
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-02-27 22:19:05
 * @LastEditors: Chen
 * @LastEditTime: 2021-03-13 15:25:09
 */
import mongoose from "../db";
import dayjs from "dayjs";

const OriginNumsSchema = mongoose.Schema(
	{
		userId: {
			// 用户id
			type: String,
			required: true
		},
		date: {
			// 日期
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
		num: {
			// 初始简历数
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
);

// 使格式化时间能输出
OriginNumsSchema.set("toJSON", { getters: true });

// OriginNums 对应 collection
const OriginNums = mongoose.model("origins", OriginNumsSchema);

export default OriginNums;