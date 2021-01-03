/*
 * @Description: md5加密
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-03 23:09:04
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-03 23:15:34
 */
import crypto from "crypto";

// 密钥
const SECRET_KEY = "15641#!#0.SAFAasd";

// md5加密
function md5(content) {
	let md5 = crypto.createHash("md5");
	return md5.update(content).digest("hex");
}

// 加密函数
function genPassword(password) {
	const str = `password=${password}&key=${SECRET_KEY}`;
	return md5(str);
}

export default genPassword;
