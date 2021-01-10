/*
 * @Description: 通用公共方法，例如获取专业列表，获取渠道列表，根据专业id获取专业名称，根据渠道id获取渠道名称
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-10 17:33:06
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-10 17:35:31
 */

import Channel from "../db/models/Channel";
import Major from "../db/models/Major";

// 根据专业Id获取专业Name
export const getMajorNameById = async (id) => {
	const res = await Major.findOne({ majorId: id });
	return res ? res.majorName : null;
};

// 根据渠道Id获取渠道Name
export const getChannelNameById = async (id) => {
	const res = await Channel.findOne({ channelId: id });
	return res ? res.channelName : null;
};

// 获取渠道
export const getChannelList = async () => {
	const res = await Channel.find();
	return res;
};

// 获取专业
export const getMajorList = async () => {
	const res = await Major.find();
	return res;
};