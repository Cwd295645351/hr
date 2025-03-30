

import dayjs from "dayjs";
const { export_json_to_excel } = require("../../../../excel/Export2Excel");
// 导出excel
export function getDownloadData(res) {
	require.ensure([], () => {
		const multiHeader = [
			"候选人姓名",
			"英文姓名",
			"应聘职位",
			"岗位",
			"HKGAI/科大",
			"招聘进度",
			"简历上载时间",
			"一面时间",
			"一面面试官",
			"一面意见",
			"二面时间",
			"二面面试官",
			"二面意见",
			"跟进事项",
			"三面时间",
			"三面面试官",
			"三面意见",
			"后续跟进人员",
			"入职时间",
			"试用期满时间",
			"离职时间",
			"简历",
			"来源",
		];
		const multiHeader2 = [];
		const merges = [];
		const filterVal = [
			"name",
			"EnglishName",
			"apartmentName",
			"jobName",
			"companyName",
			"statusName", // 状态需要特殊映射
			"date",
			"schedules.0.interviewDate",
			"schedules.0.interviewerName",
			"schedules.0.interviewerCommitment",
			"schedules.1.interviewDate",
			"schedules.1.interviewerName",
			"schedules.1.interviewerCommitment",
			"todoList",
			"schedules.2.interviewDate",
			"schedules.2.interviewerName",
			"schedules.2.interviewerCommitment",
			"followUp",
			"joinDate",
			"trialDate",
			"leaveDate",
			"fileList",
			"channelName", // 来源要结合一级渠道和二级渠道
		];
		const list = res;
		const data = formatJson(filterVal, list);
		var filename =
			"候选人信息-" +
			dayjs(new Date()).format("YYYYMMDDHHmmss");
		export_json_to_excel({
			multiHeader,
			multiHeader2,
			data,
			filename,
			merges
		});
	});
}

//格式化
function formatJson(filterVal, jsonData) {
	// return jsonData.map((v) => filterVal.map((j) => v[j]));

	return jsonData.map((data) =>
		filterVal.map((property) => {
			if (property.includes(".")) {
				// 面试日程才有多级
				const arr = property.split(".");
				return arr[2] === 'interviewDate' ? dayjs(data[arr[0]]?.[+arr[1]]?.[arr[2]]).format('YYYY-MM-DD') : data[arr[0]]?.[+arr[1]]?.[arr[2]];
			} else if (property === "statusName") {
				// 状态需要特殊映射
				return handleExportStatus(data.stageId, data.statusId, data.schedules);
			} else if (property === "channelName") {
				// 来源要结合一级渠道和二级渠道
				return `${data.channelName}（${data.subChannelName}）`;
			} else if (property === 'joinDate') {
				// 入职时间内容不导出
				return ''
			} else {
				return data[property];
			}
		})
	);
}

// 处理导出状态映射
function handleExportStatus(stageId, statusId, schedules) {
	switch (stageId) {
		case 1:
			return '简历筛选'
		case 2:
			const currentTime = Date.now()
			if (schedules.length > 0) {
				const lastSchedule = schedules[schedules.length - 1]
				const interviewDateTime = combineDateAndTimeWithCST(lastSchedule.interviewDate, lastSchedule.interviewTime)
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
			} else {
				return '待一面'
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
}

function combineDateAndTimeWithCST(dateStr, timeStr) {
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

