/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2020-12-24 22:59:19
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 22:57:11
 */

import mongoose from "../db";

const ChannelSchema = mongoose.Schema(
	{
		channelId: {
			type: String,
			required: true,
			unique: true,
		},
		channelName: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Channel = mongoose.model("channel", ChannelSchema);

module.exports = Channel;
