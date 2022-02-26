/*
 * @Description: 通用公共方法，例如获取专业列表，获取渠道列表，根据专业id获取专业名称，根据渠道id获取渠道名称
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-10 17:33:06
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-26 22:56:33
 */

// 招聘渠道
import Channel from "../db/models/Channel";
// 招聘配置
import Config from "../db/models/Config";
// 状态
import Status from "../db/models/Status";
// 职位
import Job from "../db/models/Jobs";
// 面试官
import Interviewer from "../db/models/Interviewer";

// 获取所有招聘渠道
export const getChannelList = async () => {
	const res = await Channel.find({}, { _id: 0, id: 1, name: 1 }).sort({
		sort: 1
	});
	return res;
};

// 根据渠道id获取渠道name
export const getChannelNameById = async (id) => {
	const res = await Channel.findOne({ id: id }, { _id: 0, name: 1 });
	return (res && res.name) || null;
};

// 获取所有配置
export const getConfig = async () => {
	const res = await Config.find({}, { _id: 0 });
	if (res) {
		const config = res[0];
		config.degree.sort((a, b) => {
			return a.sort - b.sort;
		});
		config.mode.sort((a, b) => {
			return a.sort - b.sort;
		});
		config.schoolProperty.sort((a, b) => {
			return a.sort - b.sort;
		});
		config.type.sort((a, b) => {
			return a.sort - b.sort;
		});
		return config;
	} else {
		return null;
	}
};

// 获取所有状态
export const getStatusList = async () => {
	const res = await Status.find({}, { _id: 0, stageId: 1, status: 1 }).sort({
		sort: 1
	});
	return res;
};

// 根据状态Id获取状态Name
export const getStatusNameById = async (stageId, statusId) => {
	const res = await Status.findOne({ stageId: stageId }, { _id: 0, status: 1 });
	if (res) {
		return res.status.find(item => item.id == statusId).name;
	} else {
		return null;
	}
};

// 获取职位列表
export const getJobList = async () => {
	const res = await Job.find(
		{},
		{ _id: 0, apartmentId: 1, apartmentName: 1, jobs: 1 }
	).sort({
		sort: 1
	});
	res.forEach((item) => {
		item.jobs.sort((a, b) => {
			return a.sort - b.sort;
		});
	});
	return res;
};

// 根据部门id，职位id获取部门名称、职位名称
export const getJobName = async (apartmentId, jobId) => {
	// 先找到部门，再过滤职位
	const apartment = await Job.findOne(
		{ apartmentId: apartmentId },
		{ _id: 0, apartmentName: 1, jobs: 1 }
	);
	if (apartment) {
		const jobName = apartment.jobs.find((item) => item.id == jobId).name;
		if (jobName) {
			return {
				apartmentName: apartment.apartmentName,
				jobName
			};
		} else {
			return null;
		}
	} else {
		return null;
	}
};

// 获取所有面试官列表
export const getInterviewerList = async () => {
	const res = await Interviewer.find(
		{ onWork: true },
		{ _id: 0, id: 1, name: 1 }
	).sort({ sort: 1 });
	return res;
};

// 根据面试官id查找面试官名称
export const getInterviewerName = async (id) => {
	const res = await Interviewer.findOne({ id: id }, { _id: 0, name: 1 });
	return (res && res.name) || null;
};
