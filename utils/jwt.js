/*
 * @Description: JWT令牌
 * @Version:
 * @Author:
 * @Date: 2021-01-03 23:23:56
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-03 23:51:39
 */
import crypto from "crypto";

// 密钥
const SECRET_KEY = "15641#!#0.SAFAasd";

const header = {
	typ: "JWT",
	alg: "HS256"
};

const headStr = new Buffer.from(JSON.stringify(header)).toString("base64");
console.log(headStr);

const payload = {
	sub: "1234567890",
	name: "John Doe",
	admin: true
};
const payloadStr = new Buffer.from(JSON.stringify(payload)).toString("base64");
console.log(payloadStr);

const encodedString = headStr + "." + payloadStr;

let sha256 = crypto.createHmac("sha256", SECRET_KEY);
const signature = sha256.update(encodedString).digest("hex");
console.log(signature);

function test() {
	return `${headStr}.${payloadStr}.${signature}`;
}

export default test;
