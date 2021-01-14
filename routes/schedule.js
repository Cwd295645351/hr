/*
 * @Description: 面试日程路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-15 00:17:20
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-15 00:29:37
 */
import Router from "koa-router";
import { getSchedule } from "../controller/schedule";
import { SuccessModel, ErrorModel } from "../model/resModel";

const router = Router({
	prefix: "/api/situation"
});

router.post("/getSchedule", async (ctx, next) => {});

export default router;
