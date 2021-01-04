/*
 * @Description: 登录接口
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-03 22:16:09
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-04 23:57:33
 */

// 预防xss攻击
// import xss from "xss";

import genPassword from "../utils/cryp";
import User from "../db/models/User";
import JWT from "../utils/jwt";

const login = async (username, password) => {
	password = genPassword(password); // 对密码进行加密
	console.log(password);
	// JWT();
	const res = await User.findOne({
		username: username,
		password: password
	});
	if (res) {
		const retData = {
			username: username,
			token: JWT.createJWT(username)
		};
		return retData;
	} else {
		return null;
	}
	// return res;
};

export default login;
