/*
 * @Description: 通用公共方法，例如获取专业列表，获取渠道列表，根据专业id获取专业名称，根据渠道id获取渠道名称
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-10 17:33:06
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-01 11:06:13
 */

import Channel from "../db/models/Channel";
import Major from "../db/models/Major";
import Status from "../db/models/Status";

// 根据专业Id获取专业Name
export const getMajorNameById = async (id) => {
	const res = await Major.findOne({ majorId: id }, { _id: 0, majorName: 1 });
	return res && res.majorName || null;
};

// 根据渠道Id获取渠道Name
export const getChannelNameById = async (id) => {
	const res = await Channel.findOne(
		{ channelId: id },
		{ _id: 0, channelName: 1 }
	);
	return res && res.channelName || null;
};

// 根据状态Id获取渠道Name
export const getStatusNameById = async (id) => {
	const res = await Status.findOne(
		{ statusId: id },
		{ _id: 0, statusName: 1 }
	);
	return res && res.statusName || null;
};

// 获取渠道
export const getChannelList = async () => {
	const res = await Channel.find(
		{},
		{ _id: 0, channelId: 1, channelName: 1 }
	).sort({
		sort: 1
	});
	return res;
};

// 获取专业
export const getMajorList = async () => {
	const res = await Major.find({}, { _id: 0, majorId: 1, majorName: 1 }).sort(
		{
			sort: 1
		}
	);
	return res;
};

// 获取状态
export const getStatusList = async () => {
	const res = await Status.find(
		{},
		{ _id: 0, statusId: 1, statusName: 1 }
	).sort({
		sort: 1
	});
	return res;
};
