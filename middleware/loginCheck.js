/*
 * @Description: 登录状态检查中间件
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-05 21:18:19
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 23:52:38
 */

import retModel from "../model/resModel";

const loginCheck = async (ctx, next) => {
	if (ctx.session.token) {
		await next();
		return;
	}
	ctx.body = new retModel.ErrorModel(null, "未登录");
};

export default loginCheck;
