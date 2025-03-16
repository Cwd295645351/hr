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
					"一级招聘渠道",
					"二级招聘渠道",
					"候选人姓名",
					"英文姓名",
					"性别",
					"电话",
					"邮箱",
					"所在城市",
					"毕业学校",
					"学校性质",
					"专业",
					"学历",
					"全日制",
					"毕业时间",
					"在职",
					"主要工作经历（公司&岗位名称）",
					"应聘部门",
					"应聘职位",
					"HKGAI/科大",
					"类别",
					"一面信息",
					"",
					"",
					"",
					"",
					"二面信息",
					"",
					"",
					"",
					"",
					"三面信息",
					"",
					"",
					"",
					"",
					"四面信息",
					"",
					"",
					"",
					"",
					"到面",
					"跟进事项",
					"后续跟进人员",
					"入职部门",
					"Offer 岗位",
					"直属上级",
					"base",
					"入职时间",
					"试用期满时间",
					"离职时间",
					"简历",
					"备注",
				];
				const multiHeader2 = [
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					"面试形式",
					"面试日期",
					"面试时间",
					"面试官",
					'面试评价',
					"面试形式",
					"面试日期",
					"面试时间",
					"面试官",
					'面试评价',
					"面试形式",
					"面试日期",
					"面试时间",
					"面试官",
					'面试评价',
					"面试形式",
					"面试日期",
					"面试时间",
					"面试官",
					'面试评价',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
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
					"S1:S2",
					"T1:T2",
					"U1:U2",
					"V1:V2",
					"W1:AA1",
					"AB1:AF1",
					"AG1:AK1",
					"AL1:AP1",
					"AQ1:AQ2",
					"AR1:AR2",
					"AS1:AS2",
					"AT1:AT2",
					"AU1:AU2",
					"AV1:AV2",
					"AW1:AW2",
					"AX1:AX2",
					"AY1:AY2",
					"AZ1:AZ2",
					"BA1:BA2",
					"BB1:BB2",
				];
				const filterVal = [
					'date',
					'statusName',
					'channelName',
					'subChannelName',
					"name",
					"EnglishName",
					"sex",
					"phoneNum",
					"email",
					"city",
					"school",
					"schoolPropertyName",
					"major",
					"degreeName",
					"isFullTime",
					"graduationDate",
					"isWork",
					"experience",
					"apartmentName",
					"jobName",
					"companyName",
					"statusName", // 状态需要特殊映射
					"schedules.0.modeName",
					"schedules.0.interviewDate",
					"schedules.0.interviewTime",
					"schedules.0.interviewerName",
					"schedules.0.interviewerCommitment",
					"schedules.1.modeName",
					"schedules.1.interviewDate",
					"schedules.1.interviewTime",
					"schedules.1.interviewerName",
					"schedules.1.interviewerCommitment",
					"schedules.2.modeName",
					"schedules.2.interviewDate",
					"schedules.2.interviewTime",
					"schedules.2.interviewerName",
					"schedules.2.interviewerCommitment",
					"schedules.3.modeName",
					"schedules.3.interviewDate",
					"schedules.3.interviewTime",
					"schedules.3.interviewerName",
					"schedules.3.interviewerCommitment",
					"isArrivalInterview",
					"todoList",
					"followUp",
					"joinApartmentName",
					"joinJobName",
					"manager",
					"base",
					"joinDate",
					"trialDate",
					"leaveDate",
					"fileList",
					"remark", 
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

			return jsonData.map((data) =>
				filterVal.map((property) => {
					if (property.includes(".")) {
						// 面试日程才有多级
						const arr = property.split(".");
						return data[arr[0]]?.[+arr[1]]?.[arr[2]];
					} else {
						return data[property];
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
			FileReader.prototype.readAsBinaryString = function (f) {
				var binary = "";
				var rABS = false; //是否将文件读取为二进制字符串
				var pt = this;
				var wb; //读取完成的数据
				var outdata;
				var reader = new FileReader();
				reader.onload = function (e) {
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
							major: item["专业"] || "",
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
		},
		// 处理导出状态映射
		handleExportStatus(stageId, statusId, schedules) {
			switch (stageId) {
				case 1:
					return '简历筛选'
				case 2:
					const currentTime = Date.now()
					if (schedules.length > 0) {
						const lastSchedule = schedules[schedules.length - 1]
						const interviewDateTime = this.combineDateAndTimeWithCST(lastSchedule.interviewDate, lastSchedule.interviewTime)
						if (interviewDateTime > currentTime) {
							switch (statusId) {
								case 'attendInterview':
								case 'firstInterview':
									return '待一面'
								case 'secondInterview':
									return '待二面'
								case 'thirdInterview':
									return '待三面'
								case 'forthInterview':
									return '待四面'
							}
						} else {
							return '等待面试评语'
						}
					}

				case 3:
					if (statusId !== 'offerConfirm') return '谈Offer'
					return '办理签证'
				case 5:
					return '已入职'
				case 6:
					switch (statusId) {
						// 面试未通过，视为淘汰
						case 2:
						case 5:
						case 8:
						case 10:
						case 12:
						case 15:
							return '淘汰'
						// 面试未应约、爽约、拒Offer、Offer毁约视为候选人放弃
						case 1:
						case 3:
						case 4:
						case 6:
						case 7:
						case 9:
						case 11:
						case 13:
						case 14:
						case 16:
							return '候选人放弃'
						case 0:
							return '人才库'
					}
			}
		},
		combineDateAndTimeWithCST(dateStr, timeStr) {
			// 解析 UTC 日期字符串
			const date = new Date(dateStr);

			// 将 UTC 时间转换为北京时间
			date.setUTCHours(date.getUTCHours() + 8);

			// 解析北京时间字符串
			const [hours, minutes] = timeStr.split(':').map(Number);

			// 设置北京时间
			date.setHours(hours, minutes, 0, 0);

			return date.getTime(); // 返回时间戳（毫秒）
		}

	}
};

export default importMixin;
