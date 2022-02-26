/*
 * @Description: 渠道模型
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-24 22:59:19
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-13 22:34:42
 */

import mongoose from "../db";

const ChannelSchema = mongoose.Schema(
	{
		// id
		id: { type: String, required: true, unique: true },
		// 名称
		name: { type: String, required: true },
		// 排序
		sort: { type: String, required: true, unique: true }
	},
	{ timestamps: true }
);

const Channel = mongoose.model("channel", ChannelSchema);

export default Channel;
