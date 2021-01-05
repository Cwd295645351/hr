/*
 * @Description: 面试情况表相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-05 22:39:09
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 23:47:57
 */

import xss from "xss";

import Interviewees from "../db/models/Interviewees";

const xssData = (data) => {
	if (typeof data == "string" || typeof data == "number") {
		return xss(data);
	} else {
		for (let key in data) {
			data[key] = xssData(data[key]);
        }
        return data;
	}
};

export const getList = async () => {
	const res = await Interviewees.find();
	return res;
};

export const addInterviewee = async (data) => {
	xssData(data);
	console.log("test:", data);
	const res = await Interviewees.create(data);
	// console.log("res", res);
	return res;
};
