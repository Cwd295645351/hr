/*
 * @Description: 公共路由
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-10 22:39:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-04-24 12:18:56
 */
import Router from "koa-router";
import {
	getMajorList,
	getChannelList,
	getStatusList
} from "../controller/common";
import { SuccessModel, ErrorModel } from "../model/resModel";
import toPdf from "office-to-pdf";
import path from "path";
import fs from "fs";

const router = Router({
	prefix: "/api/common"
});

// 获取专业列表
router.get("/getMajorList", async (ctx, next) => {
	const res = await getMajorList();
	if (res.length > 0) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel("", "获取失败");
	}
});

// 获取渠道列表
router.get("/getChannelList", async (ctx, next) => {
	const res = await getChannelList();
	if (res.length > 0) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel("", "获取失败");
	}
});

// 获取状态列表
router.get("/getStatusList", async (ctx, next) => {
	const res = await getStatusList();
	if (res.length > 0) {
		ctx.body = new SuccessModel(res, "获取成功");
	} else {
		ctx.body = new ErrorModel("", "获取失败");
	}
});

// 上传文件
router.post("/uploadFile", async (ctx, next) => {
	const DOC_ARRAY = ["doc", "docx"];
	const files = ctx.request.files.file;
	const fileFormat = files.path.split(".");

	if (DOC_ARRAY.includes(fileFormat[1])) {
		// 文件是word
		let path1 = path.join(__dirname, "../", files.path);
		const res = {
			path: `${fileFormat[0]}.pdf`,
			name: `${files.name.split(".")[0]}.pdf`
		};
		fs.readFile(path1, function (err, result) {
			if (err) {
				console.log("读取失败", err);
			} else {
				toPdf(result).then(
					(pdfBuffer) => {
						fs.writeFileSync(
							path1.split(".")[0] + ".pdf",
							pdfBuffer
						);
					},
					(err) => {
						console.log("写入失败", err);
					}
				);
			}
		});
		res.path = res.path.slice(6);
		ctx.body = res;
	} else {
		files.path = files.path.slice(6);
		ctx.body = JSON.stringify(files);
	}
});

export default router;
