<!--
 * @Description: 面试情况
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-27 15:21:56
-->
<template>
    <div class="situation">
        <el-tabs v-model="activeTab" class="situation-tab-boxs" type="card">
            <el-tab-pane label="初筛简历" name="1">
                <tab-content
                    v-if="activeTab == '1'"
                    :user-id="userId"
                    :stageId="1"
                    :channel-options="channelOptions"
                    :job-options="jobOptions"
                    :interviewer-options="interviewerOptions"
                    :school-property="schoolProperty"
                    :school211="school211"
                    :companies="companies"
                    :school985="school985"
                    :degrees="degrees"
                    :modes="modes"
                    :types="types"
                    :status-options="statusOptions"
                ></tab-content>
            </el-tab-pane>
            <el-tab-pane label="面试" name="2">
                <tab-content
                    v-if="activeTab == '2'"
                    :user-id="userId"
                    :stageId="2"
                    :channel-options="channelOptions"
                    :job-options="jobOptions"
                    :interviewer-options="interviewerOptions"
                    :school-property="schoolProperty"
                    :school211="school211"
                    :companies="companies"
                    :school985="school985"
                    :degrees="degrees"
                    :modes="modes"
                    :types="types"
                    :status-options="statusOptions"
                    :show-radio="true"
                ></tab-content>
            </el-tab-pane>
            <el-tab-pane label="录用" name="3">
                <tab-content
                    v-if="activeTab == '3'"
                    :user-id="userId"
                    :stageId="3"
                    :channel-options="channelOptions"
                    :job-options="jobOptions"
                    :interviewer-options="interviewerOptions"
                    :school-property="schoolProperty"
                    :school211="school211"
                    :companies="companies"
                    :school985="school985"
                    :degrees="degrees"
                    :modes="modes"
                    :types="types"
                    :status-options="statusOptions"
                    :show-radio="true"
                ></tab-content>
            </el-tab-pane>
            <el-tab-pane label="待入职" name="4">
                <tab-content
                    v-if="activeTab == '4'"
                    :user-id="userId"
                    :stageId="4"
                    :channel-options="channelOptions"
                    :job-options="jobOptions"
                    :interviewer-options="interviewerOptions"
                    :school-property="schoolProperty"
                    :school211="school211"
                    :companies="companies"
                    :school985="school985"
                    :degrees="degrees"
                    :modes="modes"
                    :types="types"
                    :status-options="statusOptions"
                ></tab-content>
            </el-tab-pane>
            <el-tab-pane label="到岗" name="5">
                <tab-content
                    v-if="activeTab == '5'"
                    :user-id="userId"
                    :stageId="5"
                    :channel-options="channelOptions"
                    :job-options="jobOptions"
                    :interviewer-options="interviewerOptions"
                    :school-property="schoolProperty"
                    :school211="school211"
                    :companies="companies"
                    :school985="school985"
                    :degrees="degrees"
                    :modes="modes"
                    :types="types"
                    :status-options="statusOptions"
                ></tab-content>
            </el-tab-pane>
            <el-tab-pane label="人才库" name="6">
                <tab-content
                    v-if="activeTab == '6'"
                    :user-id="userId"
                    :stageId="6"
                    :channel-options="channelOptions"
                    :job-options="jobOptions"
                    :interviewer-options="interviewerOptions"
                    :school-property="schoolProperty"
                    :school211="school211"
                    :companies="companies"
                    :school985="school985"
                    :degrees="degrees"
                    :modes="modes"
                    :types="types"
                    :status-options="statusOptions"
                ></tab-content>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
			title="未提供评价面试官数据"
			:visible.sync="interviewerDialogShow"
			width="600px"
		>
			<el-table
				:data="notEvaluateInterviewerList"
				style="width: 100%"
				border
				max-height="300px"
			>
				<el-table-column
					prop="interviewer"
					label="面试官"
					width="180"
				/>
				<el-table-column prop="interviewee" label="候选人" />
			</el-table>
		</el-dialog>
    </div>
</template>

<script>
import TabContent from "./components/TabContent.vue";
import {
    getConfig,
    getJobList,
    getInterviewerList,
    getChannelList,
    getStatusList,
    getNotEvaluateList
} from "../../../../apis/common";
export default {
    components: { TabContent },
    mixins: [],
    data() {
        return {
            userId: "",
            activeTab: "1", // 当前tab： 1=初筛，2=面试，3=录用，4=待入职，5=到岗，6=人才库
            channelOptions: [], // 招聘渠道数组
            jobOptions: [], // 应聘部门-职位数组
            interviewerOptions: [], // 面试官数组
            schoolProperty: [], // 学校性质
            degrees: [], // 学历
            modes: [], // 面试形式
            types: [], // 类别
            school985: [], // 985学校名单
            school211: [], // 211学校名单
            companies: [], // 劳动合同签署公司
            statusOptions: [], // 阶段-状态数组
            interviewerDialogShow: false, // 面试官弹窗显示
            notEvaluateInterviewerList: []
        };
    },

    mounted() {
        const userInfo = this.$tools.getUserInfo();
        this.userId = userInfo.userId;
        this.getConfig();
        this.getChannelList();
        this.getInterviewerList();
        this.getJobList();
        this.getStatusList();
        this.getNotEvaluateList();
    },
    created() {},
    methods: {
        async getChannelList() {
            const {
                data: { data, retCode, message }
            } = await getChannelList();
            if (retCode === 0) {
                this.channelOptions = data;
            } else {
                this.$message.error(message);
            }
        },
        // 获取配置
        async getConfig() {
            const {
                data: { data, retCode, message }
            } = await getConfig();
            if (retCode === 0) {
                this.schoolProperty = data.schoolProperty;
                this.degrees = data.degree;
                this.modes = data.mode;
                this.types = data.type;
                this.school985 = data._985;
                this.school211 = data._211;
                this.companies = data.companies;
            } else {
                this.$message.error(message);
            }
        },
        // 获取面试官列表
        async getInterviewerList() {
            const {
                data: { data, retCode, message }
            } = await getInterviewerList();
            if (retCode === 0) {
                this.interviewerOptions = data;
            } else {
                this.$message.error(message);
            }
        },
        // 获取职位列表
        async getJobList() {
            const {
                data: { data, retCode, message }
            } = await getJobList();
            if (retCode === 0) {
                this.jobOptions = data;
            } else {
                this.$message.error(message);
            }
        },
        // 获取状态列表
        async getStatusList() {
            const {
                data: { data, retCode, message }
            } = await getStatusList();
            if (retCode === 0) {
                this.statusOptions = data;
            } else {
                this.$message.error(message);
            }
        },
        // 获取未评价列表
		async getNotEvaluateList() {
			const {
				data: { data, retCode, message }
			} = await getNotEvaluateList(this.userId)
			if (retCode === 0) {
				console.log(data)
                this.notEvaluateInterviewerList = data
                if (data.length > 0) {
                    this.interviewerDialogShow = true
                }
			} else {
				this.$message.error(message)
			}
		}
    }
};
</script>

<style lang="less" scoped>
.situation {
    padding: 20px;
    height: 100%;
    width: 100%;
}
</style>
<style lang="less">
.situation-tab-boxs {
    height: 100%;
    width: 100%;
    .el-tabs__header {
        margin: 0;
    }
    .el-tabs__content {
        height: calc(100% - 41px);
        width: 100%;
        .el-tab-pane {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
