/*
 * @Description: JWT令牌
 * @Version:
 * @Author:
 * @Date: 2021-01-03 23:23:56
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-17 23:52:49
 */
import crypto from "crypto";

// 密钥
const SECRET_KEY = "15641#!#0.SAFAasd";

// jwt头部
const header = {
	alg: "HS256",
	typ: "JWT"
};
const headStr = new Buffer.from(JSON.stringify(header)).toString("base64");
// jwt载荷
const payload = {
	// jwt签发者
	iss: "hr-manage",
	// 接收jwt的一方
	aud: "all",
	// jwt的过期时间，这个过期时间必须要大于签发时间
	exp: "",
	// jwt的签发时间
	iat: ""
};
let jwtToken = "";

// 生成JWT
function createJWT(username) {
	let date = new Date();
	payload.iat = date.getTime();
	payload.exp = payload.iat + 360000;
	payload.name = username;

	const payloadStr = new Buffer.from(JSON.stringify(payload)).toString(
		"base64"
	);

	// jwt签证
	const encodedString = headStr + "." + payloadStr;
	let sha256 = crypto.createHmac("sha256", SECRET_KEY);
	const signature = sha256.update(encodedString).digest("hex");

	// 生成完成token
	jwtToken = `${headStr}.${payloadStr}.${signature}`;
	return jwtToken;
}

// 校验token
function validateJWT(token) {
	let nowDate = new Date();
	if (nowDate < jwt.exp) {
		return false;
	}
	if (token === jwtToken) {
		return true;
	}
}

export default {
	createJWT,
	validateJWT
};
