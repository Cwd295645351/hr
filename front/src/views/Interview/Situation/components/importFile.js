/*
 * @Description: 导入导出文件逻辑
 * @Version:
 * @Author:Chen
 * @Date: 2022-01-22 09:07:30
 * @LastEditors: Chen
 * @LastEditTime: 2022-06-08 23:42:45
 */

const { export_json_to_excel } = require("../../../../excel/Export2Excel");
import stageMap from "./stageMap";
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
					"AG1:AG2"
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

					outdata.forEach((item) => {});

					/* importInterviewee(arr).then((res) => {
                        // console.log(res);
                        _this.search(1);
                    });  */
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
		}
	}
};

export default importMixin;
