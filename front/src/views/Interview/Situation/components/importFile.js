/*
 * @Description: 导入导出文件逻辑
 * @Version:
 * @Author:Chen
 * @Date: 2022-01-22 09:07:30
 * @LastEditors: Chen
 * @LastEditTime: 2022-06-16 22:40:26
 */

const { export_json_to_excel } = require("../../../../excel/Export2Excel");

import { importInterviewee } from "../../../../../apis/interview/interview";
import stageMap from "./stageMap";
import apartments from "./jobs";
import configs from "./config";
import channelMap from "./channelMap";
import interviewers from "./interviewers";
var importMixin = {
	methods: {
		//导出方法
		getExcel_city(res) {
			require.ensure([], () => {
				const multiHeader = [
					"简历推送日期",
					"状态",
					"应聘部门",
					"应聘职位",
					"类别",
					"招聘渠道",
					"姓名",
					"性别",
					"电话",
					"邮箱",
					"所在城市",
					"毕业学校",
					"学校性质",
					"学历",
					"全日制",
					"毕业时间",
					"在职",
					"通知日期",
					"一面信息",
					"",
					"",
					"",
					"二面信息",
					"",
					"",
					"",
					"三面信息",
					"",
					"",
					"",
					"到面",
					"相关材料",
					"入职时间",
					"备注"
				];
				const multiHeader2 = [
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"面试形式",
					"面试日期",
					"面试时间",
					"面试官",
					"面试形式",
					"面试日期",
					"面试时间",
					"面试官",
					"面试形式",
					"面试日期",
					"面试时间",
					"面试官",
					"",
					"",
					"",
					""
				];
				const merges = [
					"A1:A2",
					"B1:B2",
					"C1:C2",
					"D1:D2",
					"E1:E2",
					"F1:F2",
					"G1:G2",
					"H1:H2",
					"I1:I2",
					"J1:J2",
					"K1:K2",
					"L1:L2",
					"M1:M2",
					"N1:N2",
					"O1:O2",
					"P1:P2",
					"Q1:Q2",
					"R1:R2",
					"S1:V1",
					"W1:Z1",
					"AA1:AD1",
					"AE1:AE2",
					"AF:AF2",
					"AG1:AG2",
					"AH1:AH2"
				];
				const filterVal = [
					"date",
					"statusName",
					"apartmentName",
					"jobName",
					"typeName",
					"channelName",
					"name",
					"sex",
					"phoneNum",
					"email",
					"city",
					"school",
					"schoolPropertyName",
					"degreeName",
					"isFullTime",
					"graduationDate",
					"isWork",
					"remindDate",
					"schedules.0.modeName",
					"schedules.0.interviewDate",
					"schedules.0.interviewTime",
					"schedules.0.interviewerName",
					"schedules.1.modeName",
					"schedules.1.interviewDate",
					"schedules.1.interviewTime",
					"schedules.1.interviewerName",
					"schedules.2.modeName",
					"schedules.2.interviewDate",
					"schedules.2.interviewTime",
					"schedules.2.interviewerName",
					"isArrivalInterview",
					"fileList",
					"joinDate",
					"remark"
				];
				const list = res;
				const data = this.formatJson(filterVal, list);
				var filename =
					"候选人信息-" +
					this.$dayjs(new Date()).format("YYYYMMDDHHmmss");
				export_json_to_excel({
					multiHeader,
					multiHeader2,
					data,
					filename,
					merges
				});
			});
		},
		//格式化
		formatJson(filterVal, jsonData) {
			// return jsonData.map((v) => filterVal.map((j) => v[j]));

			return jsonData.map((v) =>
				filterVal.map((j) => {
					if (j.includes(".")) {
						const arr = j.split(".");
						return v[arr[0]]?.[+arr[1]]?.[arr[2]];
					} else {
						return v[j];
					}
				})
			);
		},
		//导入文件时处理方法
		handleChange(file, fileList) {
			this.fileTemp = file.raw;
			if (this.fileTemp) {
				if (/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
					this.importfxx(this.fileTemp);
				} else {
					this.$message({
						type: "warning",
						message: "附件格式错误，请重新上传！"
					});
				}
			} else {
				this.$message({
					type: "warning",
					message: "请上传附件！"
				});
			}
			fileList.pop();
		},
		importfxx(obj) {
			let _this = this;
			let inputDOM = this.$refs.inputer;
			// 通过DOM取文件数据

			this.file = event.currentTarget.files[0];

			var rABS = false; //是否将文件读取为二进制字符串
			var f = this.file;

			var reader = new FileReader();
			//if (!FileReader.prototype.readAsBinaryString) {
			FileReader.prototype.readAsBinaryString = function(f) {
				var binary = "";
				var rABS = false; //是否将文件读取为二进制字符串
				var pt = this;
				var wb; //读取完成的数据
				var outdata;
				var reader = new FileReader();
				reader.onload = function(e) {
					var bytes = new Uint8Array(reader.result);
					var length = bytes.byteLength;
					for (var i = 0; i < length; i++) {
						binary += String.fromCharCode(bytes[i]);
					}
					//如果没有在main.js中引入，则此处需要引入，用于解析excel
					var XLSX = require("xlsx");
					if (rABS) {
						wb = XLSX.read(btoa(fixdata(binary)), {
							//手动转化
							type: "base64"
						});
					} else {
						wb = XLSX.read(binary, {
							type: "binary"
						});
					}
					outdata = XLSX.utils.sheet_to_json(
						wb.Sheets[wb.SheetNames[0]]
					);
					// outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）

					let arr = [];
					console.log(outdata, "======", wb.Sheets[wb.SheetNames[0]]);

					outdata.forEach((item) => {
						const obj = {
							schedules: [],
							fileList: [],
							stageId: 0,
							stageName: "",
							statusId: "",
							statusName: item["状态"] || "",
							date: _this.$dayjs(new Date()).format("YYYY-MM-DD"),
							apartmentId: 0,
							apartmentName: item["应聘部门"] || "",
							jobId: 0,
							jobName: item["应聘职位"] || "",
							typeId: 0,
							typeName: item["类别"] || "",
							channelId: "",
							channelName: item["招聘渠道"] || "",
							name: item["姓名"],
							sex: item["性别"] === "男" ? 1 : 0,
							phoneNum: item["电话"] || "",
							email: item["邮箱"] || "",
							city: item["所在城市"] || "",
							school: item["毕业学校"] || "",
							schoolPropertyId: 0,
							schoolPropertyName: item["学校性质"] || "",
							degreeId: 0,
							degreeName: item["学历"] || "",
							isFullTime: item["全日制"] === "是" ? 1 : 0,
							graduationDate: item["毕业时间"] || "",
							isWork: item["在职"] === "是" ? 1 : 0,
							joinDate: item["入职时间"] || "",
							isArrivalInterview: item["到面"] === "是" ? 1 : 0,
							remindDate: item["通知日期"] || "",
							remark: item["备注"] || "",
							noticeStr: "",
							noticeDate: "",
							joinRemark: "",
							hideTag: "0",
							isDelete: false,
							userId: _this.userId
						};
						_this.handleImportData(obj, item);
						arr.push(obj);
					});

					importInterviewee(arr).then((res) => {
						// console.log(res);
						_this.search(1);
					});
					console.log(arr);
					return arr;
				};
				reader.readAsArrayBuffer(f);
			};
			if (rABS) {
				reader.readAsArrayBuffer(f);
			} else {
				reader.readAsBinaryString(f);
			}
		},
		// 超出最大上传文件数量时的处理方法
		handleExceed() {
			this.$message({
				type: "warning",
				message: "超出最大上传文件数量的限制！"
			});
			return;
		},
		// 移除文件的操作方法
		handleRemove(file, fileList) {
			this.fileTemp = null;
		},
		// 处理导入数据，将中文转化成对应的id
		handleImportData(item, originData) {
			stageMap.forEach((stage) => {
				const status = stage.status.find(
					(ite) => ite.name === item.statusName
				);
				if (status) {
					item.statusId = status.id;
					item.stageName = stage.stageName;
					item.stageId = stage.stageId;
				}
			});
			apartments.forEach((apartment) => {
				const job = apartment.jobs.find(
					(ite) => ite.name === item.jobName
				);
				if (job) {
					item.jobId = job.id;
					item.apartmentId = apartment.apartmentId;
					item.apartmentName = apartment.apartmentName;
				}
			});
			item.typeId =
				configs.type.find((ite) => ite.name === item.typeName)?.id ||
				"";
			item.schoolPropertyId =
				configs.schoolProperty.find(
					(ite) => ite.name === item.schoolPropertyName
				)?.id || "";
			item.degreeId =
				configs.degree.find((ite) => ite.name === item.degreeName)
					?.id || "";
			item.channelId = channelMap[item.channelName] || "";
			if (originData["面试官"]) {
				// 一面信息
				const obj = {
					interviewDate: new Date(
						originData["面试日期"]
					).toISOString(),
					interviewTime: originData["面试时间"],
					interviewerId: originData["面试官"]
						.split(",")
						.map((ite) => {
							return interviewers.find(
								(interviewer) => interviewer.name === ite
							).id;
						}),
					interviewerName: originData["面试官"].split(","),
					modeId:
						configs.mode.find(
							(ite) => ite.name === originData["面试形式"]
						)?.id || 0,
					modeName: originData["面试形式"],
					order: 1
				};
				item.schedules.push(obj);
			}
			if (originData["面试官_1"]) {
				// 一面信息
				const obj = {
					interviewDate: new Date(
						originData["面试日期_1"]
					).toISOString(),
					interviewTime: originData["面试时间_1"],
					interviewerId: originData["面试官_1"]
						.split(",")
						.map((ite) => {
							return interviewers.find(
								(interviewer) => interviewer.name === ite
							).id;
						}),
					interviewerName: originData["面试官_1"].split(","),
					modeId:
						configs.mode.find(
							(ite) => ite.name === originData["面试形式_1"]
						)?.id || 0,
					modeName: originData["面试形式_1"],
					order: 1
				};
				item.schedules.push(obj);
			}
			if (originData["面试官_2"]) {
				// 一面信息
				const obj = {
					interviewDate: new Date(
						originData["面试日期_2"]
					).toISOString(),
					interviewTime: originData["面试时间_2"],
					interviewerId: originData["面试官_2"]
						.split(",")
						.map((ite) => {
							return interviewers.find(
								(interviewer) => interviewer.name === ite
							).id;
						}),
					interviewerName: originData["面试官_2"].split(","),
					modeId:
						configs.mode.find(
							(ite) => ite.name === originData["面试形式_2"]
						)?.id || 0,
					modeName: originData["面试形式_2"],
					order: 1
				};
				item.schedules.push(obj);
			}
		}
	}
};

export default importMixin;
