/*
 * @Description: 登录接口相关数据库操作
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-03 22:16:09
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-11 23:45:20
 */

// 预防xss攻击
import xss from "xss";

import genPassword from "../utils/cryp";
import User from "../db/models/User";

const login = async (username, password) => {
	username = xss(username);
	password = xss(genPassword(password)); // 对密码进行加密
	const res = await User.findOne({
		username: username,
		password: password
	});
	if (res) {
		return res;
	} else {
		return null;
	}
};

export default login;
