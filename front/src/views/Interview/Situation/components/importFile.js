/*
 * @Description: 导入导出文件逻辑
 * @Version:
 * @Author:Chen
 * @Date: 2022-01-22 09:07:30
 * @LastEditors: Chen
 * @LastEditTime: 2022-01-22 09:57:36
 */

const { export_json_to_excel } = require("../../../../excel/Export2Excel");
var importMixin = {
	methods: {
		//导出方法
		getExcel_city(res) {
			require.ensure([], () => {
				const tHeader = [
					"登记日期",
					"专业",
					"档案编号",
					"性质",
					"招聘渠道",
					"姓名",
					"联系方式",
					"邮箱",
					"当前简历状态",
					"入职日期",
					"入职部门",
					"入职备注",
					"电话面试情况",
					"备注",
					"面试日期",
					"面试形式",
					"面试官",
					"面试时间"
				];
				const filterVal = [
					"date",
					"majorName",
					"NO",
					"property",
					"channelName",
					"name",
					"phoneNum",
					"email",
					"statusName",
					"joinDate",
					"apartment",
					"joinRemark",
					"phoneInterviewSituation",
					"remark",
					"schedules.date",
					"schedules.form",
					"schedules.interviewer",
					"schedules.time"
				];
				const list = res;
				const data = this.formatJson(filterVal, list);
				var filename =
					"候选人信息-" +
					this.$dayjs(new Date()).format("YYYYMMDDHHmmss");
				export_json_to_excel(tHeader, data, filename);
			});
		},
		//格式化
		formatJson(filterVal, jsonData) {
			// return jsonData.map((v) => filterVal.map((j) => v[j]));

			return jsonData.map((v) =>
				filterVal.map((j) => {
					if (j.includes(".")) {
						const arr = j.split(".");
						return v[arr[0]][arr[1]];
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
					/* var sheet = wb.Sheets[wb.SheetNames[0]];
                    if (
                        sheet.A1.v != "序号" ||
                        sheet.B1.v != "渠道" ||
                        sheet.C1.v != "姓名" ||
                        sheet.D1.v != "联系方式" ||
                        sheet.E1.v != "简历情况" ||
                        sheet.F1.v != "电话沟通情况" ||
                        sheet.G1.v != "面试时间" ||
                        sheet.H1.v != "面试官" ||
                        sheet.I1.v != "录用结果" ||
                        sheet.J1.v != "备注" 
                    ) {
                        _this.$message({
                            type: "warning",
                            message: "模板格式错误，请重新上传！"
                        });
                        return;
                    } */
					outdata = XLSX.utils.sheet_to_json(
						wb.Sheets[wb.SheetNames[0]]
					);
					// outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）

					let arr = [];

					for (let i = 1; i <= 34; ) {
						let dates = outdata[i];
						let morningData = outdata[i + 1];
						let afternoonData = outdata[i + 2];

						// 遍历早上的数据
						for (let key in morningData) {
							let date = dates[key];
							if (key != "__EMPTY") {
								let lineData = morningData[key];
								// 查找当前人数
								let res = lineData.split("；");
								res.forEach((item) => {
									let resData = item.split(" ");

									let name = resData[1].slice(
										0,
										resData[1].indexOf("（")
									);

									let info = resData[1].slice(
										resData[1].indexOf("（") + 1,
										resData[1].indexOf("）")
									);
									let infoArr = info.split("，");
									let majorName = infoArr[0];
									let majorId = _this.filterMajor(majorName);
									let property = infoArr[1];
									let form = infoArr[2];
									let interviewer = infoArr[3];

									let obj = {
										userId: _this.userId,
										date: _this
											.$dayjs(new Date())
											.format("YYYY-MM-DD"),
										name: name,
										majorId: majorId,
										majorName: majorName,
										property: property,
										phoneNum: "",
										email: "",
										channelId: "",
										channelName: "",
										statusId: "",
										statusName: "",
										joinDate: "",
										schedules: {
											date: date,
											time: resData[0],
											interviewer: interviewer,
											form: form
										},
										phoneInterviewSituation: "",
										remark: ""
									};
									arr.push(obj);
								});
							}
						}
						// 遍历下午的数据
						for (let key in afternoonData) {
							if (key != "__EMPTY") {
								let date = dates[key];
								let lineData = afternoonData[key];
								// 查找当前人数
								let res = lineData.split("；");
								res.forEach((item) => {
									let resData = item.split(" ");
									let time = resData[0];
									let hour = 12 + +time.slice(0, 1);
									time = hour + time.slice(1);

									let name = resData[1].slice(
										0,
										resData[1].indexOf("（")
									);

									let info = resData[1].slice(
										resData[1].indexOf("（") + 1,
										resData[1].indexOf("）")
									);
									let infoArr = info.split("，");
									let majorName = infoArr[0];
									let majorId = _this.filterMajor(majorName);
									let property = infoArr[1];
									let form = infoArr[2];
									let interviewer = infoArr[3];

									let obj = {
										userId: _this.userId,
										date: _this
											.$dayjs(new Date())
											.format("YYYY-MM-DD"),
										name: name,
										majorId: majorId,
										majorName: majorName,
										property: property,
										phoneNum: "",
										email: "",
										channelId: "",
										channelName: "",
										statusId: "",
										statusName: "",
										joinDate: "",
										schedules: {
											date: date,
											time: time,
											interviewer: interviewer,
											form: form
										},
										phoneInterviewSituation: "",
										remark: ""
									};
									arr.push(obj);
								});
							}
						}

						i = i + 3;
					}
					console.log(arr);

					importInterviewee(arr).then((res) => {
						// console.log(res);
						_this.search(1);
					});
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
		// 过滤状态
		filterStatus(obj, interviewResult, jobResult) {
			if (jobResult != undefined) {
				if (jobResult.includes("入职")) {
					obj.statusId = "join";
					obj.statusName = "已入职";
				} else if (jobResult.includes("拒")) {
					obj.statusId = "refuseOffer";
					obj.statusName = "拒Offer";
				} else if (jobResult.includes("不录用")) {
					obj.statusId = "noHire";
					obj.statusName = "不录用";
				}
			} else {
				if (interviewResult.includes("不录用")) {
					obj.statusId = "noHire";
					obj.statusName = "不录用";
				} else if (interviewResult.includes("爽约")) {
					obj.statusId = "breakPromise";
					obj.statusName = "爽约";
				}
			}
		},
		// 过滤专业
		filterMajor(majorName) {
			switch (majorName) {
				case "建筑":
					return "architecture";
				case "结构":
					return "structure";
				case "给排水":
					return "drainage";
				case "暖通":
					return "HVAC";
				case "项目助理":
					return "projectAssistant";
				case "市场专员":
					return "marketingSpecialist";
				case "财务":
					return "finance";
				case "BIM":
					return "BIM";
				case "电气":
					return "electricity";
				case "绿建":
					return "greenBuilding";
			}
		},
		// 过滤渠道
		filterChanel(channelName, obj) {
			let channelId = "others";
			if (channelName != undefined) {
				if (channelName.includes("BOSS")) {
					channelId = "boss";
					channelName = "BOSS直聘";
				} else if (channelName.includes("北极星")) {
					channelId = "gcjob";
					channelName = "北极星工程招聘";
				} else if (channelName.includes("猎聘")) {
					channelId = "liepin";
					channelName = "猎聘";
				} else if (channelName.includes("云招聘")) {
					channelId = "yunzhaopin";
					channelName = "云招聘";
				} else if (channelName.includes("智联招聘")) {
					channelId = "zhaopin";
					channelName = "智联招聘";
				} else if (
					channelName.includes("建筑英才网") &&
					channelName.includes("搜索")
				) {
					channelId = "buildHRSearch";
					channelName = "建筑英才网(搜索)";
				} else if (channelName.includes("建筑英才网")) {
					channelId = "buildHRDeliver";
					channelName = "建筑英才网(投递)";
				} else if (
					channelName.includes("前程无忧") &&
					channelName.includes("搜索")
				) {
					channelId = "51jobSearch";
					channelName = "前程无忧(搜索)";
				} else if (channelName.includes("前程无忧")) {
					channelId = "51jobDeliver";
					channelName = "前程无忧(投递)";
				} else if (
					channelName.includes("双选会") ||
					channelName.includes("校招")
				) {
					channelId = "doubleElection";
					channelName = "双选会";
				} else if (
					channelName.includes("邮箱") ||
					channelName.includes("自荐")
				) {
					channelName = "邮箱投递";
					if (obj.remark != undefined) {
						obj.remark = channelName + "\n" + obj.remark;
					} else {
						obj.remark = channelName;
					}
					channelId = "mailDelivery";
				} else if (
					channelName.includes("内推") ||
					channelName.includes("内部推荐")
				) {
					channelName = "内部推荐";
					channelId = "internalRecommended";
				}
			} else {
				channelName = "其他";
				channelId = "others";
			}
			obj.channelName = channelName;
			obj.channelId = channelId;
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
		}
	}
};

export default importMixin;
