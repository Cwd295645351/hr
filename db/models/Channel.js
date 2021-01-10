/*
 * @Description: 渠道模型
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-24 22:59:19
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-11 00:10:17
 */

import mongoose from "../db";

const ChannelSchema = mongoose.Schema(
	{
		channelId: {
			type: String,
			required: true,
			unique: true
		},
		channelName: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

const Channel = mongoose.model("channel", ChannelSchema);

export default Channel;
