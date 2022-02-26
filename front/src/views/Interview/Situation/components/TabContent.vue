<!--
 * @Description: 
 * @Version: 
 * @Author: 
 * @Date: 2022-02-21 22:41:06
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-27 00:14:06
-->
<template>
    <div class="tab-content">
        <el-radio-group
            class="status-group"
            v-if="showRadio"
            :key="stageId"
            size="small"
            v-model="statusId"
        >
            <el-radio-button
                v-for="(item, index) in statusArr"
                :key="item.id + index"
                :label="item.id"
                >{{ item.name }}</el-radio-button
            >
        </el-radio-group>
        <div class="table-search-content">
            <div class="searchBar">
                <el-form :inline="true" :model="searchInfo">
                    <el-form-item size="small" label="简历推送日期">
                        <el-date-picker
                            v-model="searchInfo.beginDate"
                            type="date"
                            placeholder="选择开始日期"
                            :picker-options="beginDateOptions"
                            clearable
                        ></el-date-picker
                        >~
                        <el-date-picker
                            v-model="searchInfo.endDate"
                            type="date"
                            placeholder="选择结束日期"
                            :picker-options="endDateOptions"
                            clearable
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item size="small" label="职位">
                        <el-select
                            v-model="searchInfo.jobId"
                            filterable
                            placeholder="请选择职位"
                            clearable
                        >
                            <el-option
                                v-for="(item, index) in totalJobs"
                                :key="item + '_' + index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="small" label="姓名">
                        <el-input
                            v-model="searchInfo.name"
                            placeholder="请输入姓名"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        v-if="
                            statusId !== 'pass' &&
                            statusId !== 'attendInterview'
                        "
                        size="small"
                        label="面试日期"
                    >
                        <el-date-picker
                            v-model="searchInfo.interviewBeginDate"
                            type="date"
                            placeholder="选择开始日期"
                            :picker-options="interviewBeginDateOptions"
                            clearable
                        ></el-date-picker
                        >~
                        <el-date-picker
                            v-model="searchInfo.interviewEndDate"
                            type="date"
                            placeholder="选择结束日期"
                            :picker-options="interviewEndDateOptions"
                            clearable
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item size="small">
                        <el-button type="primary" @click="search(1)"
                            >查询</el-button
                        >
                        <el-button
                            v-if="
                                statusId == 'pass' ||
                                statusId == 'attendInterview'
                            "
                            v-show="tableStatus == 'view'"
                            @click="addData"
                            >新增</el-button
                        >
                        <el-button
                            v-show="tableStatus == 'add'"
                            @click="saveData"
                            >保存</el-button
                        >
                        <el-button @click="exportData">导出</el-button>
                        <!-- <el-upload
                        class="upload-demo"
                        action
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :show-file-list="false"
                        :limit="1"
                        :auto-upload="false"
                    >
                        <el-button size="small" type="primary">上传</el-button>
                    </el-upload> -->
                    </el-form-item>
                </el-form>
            </div>
            <my-table
                class="table-container"
                v-loading="tableLoading"
                :key="statusId"
                :stage-id="stageId"
                :status-id="statusId"
                :table-status="tableStatus"
                :new-line="newLine"
                :table-datas="tableDatas"
                :channel-options="channelOptions"
                :job-options="jobOptions"
                :interviewer-options="interviewerOptions"
                :school-property="schoolProperty"
                :degrees="degrees"
                :modes="modes"
                :types="types"
            ></my-table>
            <div class="page-container">
                <el-pagination
                    @size-change="changePageSize"
                    @current-change="changePageIndex"
                    :current-page="pageIndex"
                    background
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {
    addInterviewee,
    getInterviewList
} from "../../../../../apis/interview/interview";
import MyTable from "./Table.vue";
export default {
    props: {
        // 用户id
        userId: { type: String, default: "" },
        // 面试阶段：1=初筛，2=面试，3=录用，4=待入职，5=到岗，6=人才库
        stageId: { type: Number, default: 1 },
        // 招聘渠道数组
        channelOptions: { type: Array, default: () => [] },
        // 部门职位数组
        jobOptions: { type: Array, default: () => [] },
        // 面试官数组
        interviewerOptions: { type: Array, default: () => [] },
        // 学校性质数组
        schoolProperty: { type: Array, default: () => [] },
        // 学历数组
        degrees: { type: Array, default: () => [] },
        // 面试形式数组
        modes: { type: Array, default: () => [] },
        // 类别数组
        types: { type: Array, default: () => [] },
        // 阶段-状态数组
        statusOptions: { type: Array, default: () => [] },
        // 是否展示按钮组
        showRadio: { type: Boolean, default: false }
    },
    components: { MyTable },

    data() {
        let _this = this;
        return {
            // 简历推送开始日期限制条件
            beginDateOptions: {
                disabledDate(time) {
                    if (_this.searchInfo.endDate != "") {
                        return time.getTime() > _this.searchInfo.endDate;
                    } else {
                        return false;
                    }
                }
            },
            // 简历推送结束日期限制条件
            endDateOptions: {
                disabledDate(time) {
                    if (_this.searchInfo.beginDate != "") {
                        return time.getTime() < _this.searchInfo.beginDate;
                    } else {
                        return false;
                    }
                }
            },
            // 面试开始日期限制条件
            interviewBeginDateOptions: {
                disabledDate(time) {
                    if (_this.searchInfo.interviewEndDate != "") {
                        return (
                            time.getTime() > _this.searchInfo.interviewEndDate
                        );
                    } else {
                        return false;
                    }
                }
            },
            // 面试结束日期限制条件
            interviewEndDateOptions: {
                disabledDate(time) {
                    if (_this.searchInfo.interviewBeginDate != "") {
                        return (
                            time.getTime() < _this.searchInfo.interviewBeginDate
                        );
                    } else {
                        return false;
                    }
                }
            },
            statusId: "", // 简历状态
            statusArr: [], // 状态数组
            // 搜索条件
            searchInfo: {
                beginDate: "", // 简历推送开始日期
                endDate: "", //简历推送结束日期
                jobId: "", // 职位id
                name: "", // 姓名
                interviewBeginDate: "", // 面试开始日期
                interviewEndDate: "" // 面试结束日期
            },
            totalJobs: [], // 所有职位列表
            newLine: {}, // 新增数据
            tableDatas: [], // 简历表格数据
            tableLoading: false,
            pageIndex: 0,
            pageSize: 10,
            total: 0,
            tableStatus: "view" // 表格状态：view=查看，add=新增
        };
    },

    created() {},
    watch: {
        stageId: {
            handler(id) {
                const statusObj = this.statusOptions.find(
                    (item) => item.stageId == id
                );
                if (statusObj) {
                    this.statusId = statusObj.status[0].id;
                    this.statusArr = statusObj.status;
                    this.search(1);
                } else {
                    this.statusArr = [];
                }
            },
            immediate: true
        },
        statusOptions(option) {
            const statusObj = option.find(
                (item) => item.stageId == this.stageId
            );
            if (statusObj) {
                this.statusId = statusObj.status[0].id;
                this.statusArr = statusObj.status;
                this.search(1);
            } else {
                this.statusArr = [];
            }
        },
        statusId(statusId) {
            this.tableDatas = [];
            this.pageSize = 10;
            this.pageIndex = 0;
            this.search(1);
        },
        jobOptions: {
            handler(options) {
                this.totalJobs = options.reduce((prev, curr) => {
                    return prev.concat(curr.jobs);
                }, []);
            },
            immediate: true
        }
    },
    computed: {},

    mounted() {},

    methods: {
        // 查询
        async search(index) {
            if (this.tableStatus == "add") {
                this.tableStatus = "view";
                this.newLine = {};
                this.tableData.shift();
            }
            let beginDate = "",
                endDate = "";
            if (this.searchInfo.beginDate) {
                beginDate = this.$dayjs(this.searchInfo.beginDate).format(
                    "YYYY-MM-DD"
                );
            }
            if (this.searchInfo.endDate) {
                endDate = this.$dayjs(this.searchInfo.endDate).format(
                    "YYYY-MM-DD"
                );
            }
            this.tableLoading = true;
            const params = {
                userId: this.userId,
                beginDate: beginDate,
                statusId: this.statusId,
                stageId: this.stageId,
                endDate: endDate,
                name: this.searchInfo.name,
                pageIndex: index,
                pageSize: this.pageSize
            };
            const {
                data: { data, retCode, message }
            } = await getInterviewList(params);

            this.tableLoading = false;
            if (retCode === 0) {
                // console.log("查询结果", data);
                this.tableDatas = data.datas;
                this.total = data.total;
            } else {
                this.$message.error(message);
            }
        },
        // 更换每页大小
        changePageSize(size) {
            this.pageSize = size;
            this.pageIndex = 0;
            this.search(1);
        },
        // 翻页
        changePageIndex(index) {
            this.pageIndex = index;
            this.search(index);
        },
        // 新增
        addData() {
            this.tableStatus = "add";
            this.newLine = {
                stageId: this.stageId,
                statusId: this.statusId,
                date: "",
                apartmentId: "",
                jobId: "",
                typeId: "",
                channelId: "",
                name: "",
                sex: "",
                phoneNum: "",
                email: "",
                city: "",
                school: "",
                schoolPropertyId: "",
                degreeId: "",
                isFullTime: "",
                graduationDate: "",
                isWork: "",
                joinDate: "",
                schedules: [],
                isArrivalInterview: "",
                fileList: [],
                remark: "",
                joinRemark: "",
                hideTag: "0",
                isDelete: false
            };
            this.tableDatas.unshift(this.newLine);
            this.tableDatas = JSON.parse(JSON.stringify(this.tableDatas));
        },
        // 保存数据
        async saveData() {
            const params = JSON.parse(JSON.stringify(this.newLine));
            params.userId = this.userId;
            try {
                const {
                    data: { data, retCode, message }
                } = await addInterviewee(params);
                if (retCode === 0) {
                    this.$message.success(message);
                    this.tableStatus = "view";
                    this.search(1);
                } else {
                    this.$message.error(message);
                }
            } catch (err) {
                console.error(err);
            }
        },
        // 导出数据
        exportData() {}
    }
};
</script>
<style scoped lang='less'>
.tab-content {
    height: 100%;
    width: 100%;
    padding: 20px;
    border: 1px solid #ddd;
    border-width: 0 1px 1px;
    display: flex;
    flex-direction: column;
    .status-group {
        margin-bottom: 20px;
        text-align: left;
    }
    .table-search-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        .searchBar {
            text-align: left;
        }
        .table-container {
            flex: 1;
        }
        .page-container {
            margin-top: 10px;
            text-align: right;
        }
    }
}
</style>
