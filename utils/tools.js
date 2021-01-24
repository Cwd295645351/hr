/*
 * @Description: 公共方法
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:21:47
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-24 22:32:35
 */

const tools = {
	// 获取用户信息
	getInfo: () => {
		const userInfo = sessionStorage.getItem("userInfo")
			? JSON.parse(sessionStorage.getItem("userInfo"))
			: null;
		return userInfo || null;
	},
	// 获取心跳时间
	getExpire: () => {
		const expire = sessionStorage.getItem("expireAt")
			? JSON.parse(sessionStorage.getItem("expireAt"))
			: 0;
		return expire || 0;
	}
};

export default tools;
