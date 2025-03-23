import dayjs from "dayjs";
import { generateWeekReportApi } from "../../../../../apis/interview/interview"
const { export_json_to_excel } = require("../../../../excel/Export2Excel");

export const generateWeekReport = async (params) => {
    const {
        data: { data, retCode, message }
    } = await generateWeekReportApi(params)
    if (retCode === 0) {
        const multiHeader = ['职位', '推送简历', '邀约一面', '一面到面', '一面通过', '邀约二面', '二面到面', '二面通过', '邀约三面', '三面到面', '三面通过', '录用谈 Offer', '发电子 Offer', '待入职', '已入职',]
        const multiHeader2 = [];
        const exportData = data.totalData.map((item, index) => {
            const { jobName, pushResume, inviteOne, attendInterviewOne, onePass, inviteTwo, attendInterviewTwo, twoPass, inviteThree, attendInterviewThree, threePass, offer, electronicOffer, waitEntry, entry } = item;
            return [jobName ?? '无职位', pushResume, inviteOne, attendInterviewOne, onePass, inviteTwo, attendInterviewTwo, twoPass, inviteThree, attendInterviewThree, threePass, offer, electronicOffer, waitEntry, entry]
        })
        exportData.push([])
        const weekData = data.weekData
        exportData.push(['当前时间总量'], [`推荐简历：${weekData.pushResume}；\n面试：${weekData.interview}；\n谈薪：${weekData.talkSalary}；\noffer：${weekData.offer}`])
        var filename = "周报-" + dayjs(new Date()).format("YYYYMMDDHHmmss");
        export_json_to_excel({ multiHeader, multiHeader2, data: exportData, filename });
    }
}