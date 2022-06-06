<!--
 * @Description: 
 * @Version: 
 * @Author: 
 * @Date: 2022-02-21 22:41:06
 * @LastEditors: Chen
 * @LastEditTime: 2022-06-06 23:12:49
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
                :school985="school985"
                :school211="school211"
                @operate="handleData"
                @editData="editData"
                @copyData="copyData"
                @deleteData="deleteData"
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
        <el-drawer
            title="修改面试情况"
            :before-close="handleClose"
            :visible.sync="editInterviewShow"
            direction="rtl"
            ref="drawer"
        >
            <div>
                <my-form
                    v-if="editInterviewShow"
                    ref="editLine"
                    :edit-line="editLine"
                    :channel-options="channelOptions"
                    :job-options="jobOptions"
                    :interviewer-options="interviewerOptions"
                    :school-property="schoolProperty"
                    :school985="school985"
                    :school211="school211"
                    :degrees="degrees"
                    :modes="modes"
                    :types="types"
                    :status-options="statusOptions"
                ></my-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="submitEditInterviewee"
                        :loading="btnLoading"
                        >{{ btnLoading ? "提交中 ..." : "确 定" }}</el-button
                    >
                </div>
            </div>
        </el-drawer>

        <el-dialog title="面试日程" :visible.sync="showDialog" width="280px">
            <el-form
                :model="operateInfo"
                label-position="right"
                label-width="70px"
            >
                <el-form-item label="面试形式">
                    <el-select
                        v-model="operateInfo.modeId"
                        size="small"
                        placeholder="请选择面试形式"
                    >
                        <el-option
                            v-for="(item, index) in modes"
                            :key="item.name + '_' + index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="面试日期">
                    <el-date-picker
                        v-model="operateInfo.interviewDate"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        clearable
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="面试时间">
                    <el-time-select
                        v-model="operateInfo.interviewTime"
                        size="small"
                        placeholder="选择时间"
                        :picker-options="{
                            start: '09:00',
                            step: '00:15',
                            end: '20:00'
                        }"
                        clearable
                    ></el-time-select>
                </el-form-item>
                <el-form-item label="面试官">
                    <el-select
                        v-model="operateInfo.interviewerId"
                        placeholder="请选择面试官"
                        multiple
                        size="small"
                    >
                        <el-option
                            v-for="(item, index) in interviewerOptions"
                            :key="item.name + '_' + index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="showDialog = false"
                    >取消</el-button
                >
                <el-button type="primary" size="small" @click="submitInterview"
                    >确定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="去人才库"
            :visible.sync="fireDialogShow"
            width="280px"
        >
            <el-form
                :model="operateInfo"
                label-position="right"
                label-width="70px"
            >
                <el-form-item label="原因">
                    <el-select
                        v-model="fireInfo.statusId"
                        size="small"
                        placeholder="请选择原因"
                    >
                        <el-option
                            v-for="(item, index) in fireOptions"
                            :key="item.name + '_' + index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="fireDialogShow = false"
                    >取消</el-button
                >
                <el-button type="primary" size="small" @click="submitFire"
                    >确定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="提醒信息"
            :visible.sync="showNoticeDialog"
            width="280px"
        >
            <el-form
                :model="operateInfo"
                label-position="right"
                label-width="70px"
            >
                <el-form-item label="提醒日期">
                    <el-date-picker
                        v-model="noticeInfo.noticeDate"
                        type="date"
                        size="small"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        clearable
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="提醒内容">
                    <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入备注"
                        v-model="noticeInfo.noticeStr"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="showNoticeDialog = false"
                    >取消</el-button
                >
                <el-button type="primary" size="small" @click="submitNotice"
                    >确定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="入职信息"
            :visible.sync="showJoinDialog"
            width="280px"
        >
            <el-form
                :model="operateInfo"
                label-position="right"
                label-width="70px"
            >
                <el-form-item label="入职时间">
                    <el-date-picker
                        v-model="joinInfo.joinDate"
                        type="date"
                        size="small"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        clearable
                    ></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="showJoinDialog = false"
                    >取消</el-button
                >
                <el-button type="primary" size="small" @click="submitJoin"
                    >确定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    addInterviewee,
    editInterviewee,
    deleteInterviewee,
    changeSchedule,
    getInterviewList,
    exportInterviewData
} from "../../../../../apis/interview/interview";
import MyTable from "./Table.vue";
import MyForm from "./Form.vue";
import exportMixin from "./importFile";
export default {
    mixins: [exportMixin],
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
        // 985名单
        school985: { type: Array, default: () => [] },
        // 211名单
        school211: { type: Array, default: () => [] },
        // 阶段-状态数组
        statusOptions: { type: Array, default: () => [] },
        // 是否展示按钮组
        showRadio: { type: Boolean, default: false }
    },
    components: { MyTable, MyForm },

    data() {
        let _this = this;
        return {
            // 简历推送开始日期限制条件
            beginDateOptions: {
                disabledDate(time) {
                    if (_this.searchInfo.endDate) {
                        return time.getTime() > _this.searchInfo.endDate;
                    } else {
                        return false;
                    }
                }
            },
            // 简历推送结束日期限制条件
            endDateOptions: {
                disabledDate(time) {
                    if (_this.searchInfo.beginDate) {
                        return time.getTime() < _this.searchInfo.beginDate;
                    } else {
                        return false;
                    }
                }
            },
            // 面试开始日期限制条件
            interviewBeginDateOptions: {
                disabledDate(time) {
                    if (_this.searchInfo.interviewEndDate) {
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
                    if (_this.searchInfo.interviewBeginDate) {
                        return (
                            time.getTime() < _this.searchInfo.interviewBeginDate
                        );
                    } else {
                        return false;
                    }
                }
            },
            btnLoading: false, // 按钮loading
            editInterviewShow: false,
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
            editLine: {}, // 编辑数据
            tableDatas: [], // 简历表格数据
            tableLoading: false, // 表格loading
            pageIndex: 0, // 页码
            pageSize: 10, // 每页数量
            total: 0, // 总数
            tableStatus: "view", // 表格状态：view=查看，add=新增
            operateInfo: {}, // 正在操作的对象
            showDialog: false, // 弹窗显示
            noticeInfo: {}, // 强提醒内容
            showNoticeDialog: false, // 强提醒弹窗显示
            joinInfo: "", // 入职时间内容,
            showJoinDialog: false, // 入职时间弹窗显示
            noticeList: [], // 强提醒队列
            fireInfo: {}, // 去人才库内容
            fireOptions: [], // 去人才库下拉选项
            fireDialogShow: false // 去人才库弹窗
        };
    },

    created() {},
    watch: {
        stageId: {
            handler(id) {
                if (id != 6) {
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
                } else {
                    this.search(1);
                }
            },
            immediate: true
        },
        statusOptions(option) {
            if (this.stageId != 6) {
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
            } else {
                this.search(1);
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
                this.totalJobs = [];
                options.forEach((item) => {
                    item.jobs.forEach((ite) => {
                        const obj = {
                            ...ite,
                            id: item.apartmentId + "-" + ite.id
                        };
                        this.totalJobs.push(obj);
                    });
                });
            },
            immediate: true
        }
    },
    computed: {},

    mounted() {},
    beforeDestroy() {
        this.noticeList.forEach((item) => {
            item.close();
        });
        this.noticeList = [];
    },

    methods: {
        // 查询
        async search(index) {
            if (this.tableStatus == "add") {
                this.tableStatus = "view";
                this.newLine = {};
                this.tableDatas.shift();
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
            let interviewBeginDate = "",
                interviewEndDate = "";
            if (this.searchInfo.interviewBeginDate) {
                interviewBeginDate =
                    this.searchInfo.interviewBeginDate.toISOString();
            }
            if (this.searchInfo.interviewEndDate) {
                interviewEndDate =
                    this.searchInfo.interviewEndDate.toISOString();
            }
            this.tableLoading = true;
            const params = {
                userId: this.userId,
                statusId: this.statusId,
                stageId: this.stageId,
                beginDate: beginDate,
                endDate: endDate,
                interviewBeginDate: interviewBeginDate,
                interviewEndDate: interviewEndDate,
                jobId: this.searchInfo.jobId,
                name: this.searchInfo.name,
                pageIndex: index,
                pageSize: this.pageSize
            };
            const {
                data: { data, retCode, message }
            } = await getInterviewList(params);

            console.log(data);

            this.tableLoading = false;
            this.noticeList.forEach((item) => {
                item.close();
            });
            this.noticeList = [];
            if (retCode === 0) {
                // console.log("查询结果", data);
                this.tableDatas = data.datas.map((item) => {
                    item.schedules.forEach((ite) => {
                        ite.interviewDate = this.$dayjs(
                            new Date(ite.interviewDate)
                        ).format("YYYY-MM-DD");
                        ite.interviewerName = ite.interviewerName.reduce(
                            (curr, prev) => {
                                return curr + "," + prev;
                            }
                        );
                    });
                    return item;
                });
                const nowDate = new Date();
                if (this.statusId == "attendInterview") {
                    if (nowDate.getHours() >= 17 && nowDate.getHours() < 24) {
                        // 17点到19点之间才提醒
                        const arr = this.tableDatas.filter(
                            (item) =>
                                this.$dayjs(item.noticeDate).format("MM-DD") ==
                                this.$dayjs(nowDate).format("MM-DD")
                        );
                        arr.forEach((item) => {
                            const notifyObj = this.$notify({
                                title: item.name,
                                duration: 0,
                                message: item.noticeStr,
                                position: "bottom-right"
                            });
                            this.noticeList.push(notifyObj);
                        });
                    }
                }
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
                remindDate: "",
                remark: "",
                noticeStr: "",
                noticeDate: "",
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
        // 面试日程提交
        async submitInterview() {
            const operateInfo = this.operateInfo;
            const params = {
                id: operateInfo.id,
                userId: this.userId,
                statusId: operateInfo.statusId,
                stageId: 2,
                type: operateInfo.type,
                schedulesInfo: {
                    modeId: operateInfo.modeId,
                    interviewDate: operateInfo.interviewDate.toISOString(),
                    interviewTime: operateInfo.interviewTime,
                    interviewerId: operateInfo.interviewerId,
                    order: operateInfo.order
                }
            };
            const {
                data: { retCode, message }
            } = await changeSchedule(params);

            if (retCode === 0) {
                this.showDialog = false;
                this.$message.success("执行成功");
                this.search(this.pageIndex);
            } else {
                this.$message.error(message);
            }
        },
        // 去人才库弹窗结果提交
        async submitFire() {
            const fireInfo = this.fireInfo;
            const params = {
                id: fireInfo.id,
                userId: this.userId,
                statusId: fireInfo.statusId,
                type: fireInfo.type
            };
            const {
                data: { retCode, message }
            } = await changeSchedule(params);

            if (retCode === 0) {
                this.fireDialogShow = false;
                this.$message.success("执行成功");
                this.search(this.pageIndex);
            } else {
                this.$message.error(message);
            }
        },
        // 设置强提醒
        async submitNotice() {
            const params = {
                userId: this.userId,
                ...this.noticeInfo
            };
            const {
                data: { retCode, message }
            } = await changeSchedule(params);

            if (retCode === 0) {
                this.showNoticeDialog = false;
                this.$message.success("执行成功");
                this.search(this.pageIndex);
            } else {
                this.$message.error(message);
            }
        },
        // 入职时间提交
        async submitJoin() {
            const joinInfo = this.joinInfo;
            const params = {
                userId: this.userId,
                id: joinInfo.id,
                statusId: joinInfo.statusId,
                stageId: 3,
                type: joinInfo.type,
                joinDate: this.$dayjs(joinInfo.joinDate).format("YYYY-MM-DD")
            };
            try {
                const {
                    data: { retCode, message }
                } = await changeSchedule(params);

                if (retCode === 0) {
                    this.showJoinDialog = false;
                    this.$message.success("执行成功");
                    this.search(this.pageIndex);
                } else {
                    this.$message.error(message);
                }
            } catch (err) {
                console.log(err);
            }
        },
        /*
         表格操作
         type: 操作类型： 0=去约面，1=去一面，2=去二面，3=去三面，4=录用，5=已联系，
                         6=发offer，7=通过，8=接受，9=到岗，10=去人才库,
                         11=设置提醒, 12=到面
         */
        async handleData({ data, type }) {
            let params = {
                id: data.id,
                userId: this.userId,
                type: type
            };
            switch (type) {
                case 0:
                    params.stageId = 2;
                    params.statusId = "attendInterview";
                    break;
                case 1:
                    this.operateInfo = {
                        id: data.id,
                        modeId: "",
                        interviewDate: "",
                        interviewTime: "",
                        interviewerId: [],
                        type: type,
                        order: 1,
                        statusId: "firstInterview"
                    };
                    this.showDialog = true;
                    break;
                case 2:
                    this.operateInfo = {
                        id: data.id,
                        modeId: "",
                        interviewDate: "",
                        interviewTime: "",
                        interviewerId: [],
                        type: type,
                        order: 2,
                        statusId: "secondInterview"
                    };
                    this.showDialog = true;
                    break;
                case 3:
                    this.operateInfo = {
                        id: data.id,
                        modeId: "",
                        interviewDate: "",
                        interviewTime: "",
                        interviewerId: [],
                        type: type,
                        order: 3,
                        statusId: "thirdInterview"
                    };
                    this.showDialog = true;
                    break;
                case 4:
                    params.stageId = 3;
                    params.statusId = "employ";
                    break;
                case 5:
                    params.stageId = 3;
                    params.statusId = "contacted";
                    break;
                case 6:
                    this.joinInfo = {
                        joinDate: data.joinDate,
                        id: data.id,
                        type: type,
                        stageId: 3,
                        statusId: "offerApproval"
                    };
                    this.showJoinDialog = true;
                    break;
                case 7:
                    params.stageId = 3;
                    params.statusId = "offerConfirm";
                    break;
                case 8:
                    params.stageId = 4;
                    params.statusId = "joining";
                    break;
                case 9:
                    params.stageId = 5;
                    params.statusId = "join";
                    break;
                case 11:
                    this.noticeInfo = {
                        noticeStr: data.noticeStr,
                        noticeDate: data.noticeDate,
                        id: data.id,
                        type: type
                    };
                    this.showNoticeDialog = true;
                    break;
                case 12:
                    console.log(data.isArrivalInterview);
                    params.isArrivalInterview = data.isArrivalInterview;
                    break;
            }
            const types = [1, 2, 3, 6, 10, 11];
            if (!types.includes(type)) {
                const {
                    data: { retCode, message }
                } = await changeSchedule(params);

                if (retCode === 0) {
                    this.$message.success("执行成功");
                    this.search(this.pageIndex);
                } else {
                    this.$message.error(message);
                }
            } else if (type == 10) {
                // 去人才库的单独处理
                this.fireHandle(data, params);
            }
        },
        // 去人才库处理
        async fireHandle(data, params) {
            switch (data.statusId) {
                case "pass":
                    params.statusId = 0;
                    break;
                case "attendInterview":
                    params.statusId = 1;
                    break;
                case "firstInterview":
                    this.fireInfo = {
                        ...params,
                        statusId: ""
                    };
                    this.fireOptions = [
                        { id: 2, name: "一面未通过" },
                        { id: 3, name: "一面爽约" },
                        { id: 4, name: "二面未应约" }
                    ];
                    this.fireDialogShow = true;
                    return;
                case "secondInterview":
                    this.fireInfo = {
                        ...params,
                        statusId: ""
                    };
                    this.fireOptions = [
                        { id: 5, name: "二面未通过" },
                        { id: 6, name: "二面爽约" },
                        { id: 7, name: "三面未应约" }
                    ];
                    this.fireDialogShow = true;
                    return;
                case "thirdInterview":
                    this.fireInfo = {
                        ...params,
                        statusId: ""
                    };
                    this.fireOptions = [
                        { id: 8, name: "三面未通过" },
                        { id: 9, name: "三面爽约" }
                    ];
                    this.fireDialogShow = true;
                    return;
                case "employ":
                    params.statusId = 10;
                    break;
                case "contacted":
                    params.statusId = 11;
                    break;
                case "offerApproval":
                    params.statusId = 12;
                    break;
                case "offerConfirm":
                    params.statusId = 13;
                    break;
                case "joining":
                    params.statusId = 14;
                    break;
            }
            const {
                data: { retCode, message }
            } = await changeSchedule(params);

            if (retCode === 0) {
                this.$message.success("执行成功");
                this.search(this.pageIndex);
            } else {
                this.$message.error(message);
            }
        },
        // 修改候选人信息
        async submitEditInterviewee() {
            let fileList = [];
            this.editLine.fileList.forEach((item) => {
                if (item.status === "success") {
                    let url = "",
                        name = "";
                    if (item.url) {
                        url = item.url;
                        name = item.name;
                    } else {
                        url = item.response.path;
                        name = item.response.name;
                    }
                    fileList.push({
                        name: name,
                        url: url
                    });
                }
            });
            this.editLine.fileList = fileList;
            this.btnLoading = true;
            const params = JSON.parse(JSON.stringify(this.editLine));
            params.userId = this.userId;

            if (
                params.statusId == "1-pass" ||
                params.statusId == "2-attendInterview"
            ) {
                params.schedules = [];
            }
            params.schedules = params.schedules
                .filter((item) => item.interviewDate)
                .map((item) => {
                    if (item.interviewDate) {
                        item.interviewDate = this.$dayjs(
                            item.interviewDate,
                            "YYYY-MM-DD"
                        ).toISOString();
                    }
                    return item;
                });
            try {
                const {
                    data: { data, retCode, message }
                } = await editInterviewee(params);
                this.btnLoading = false;
                if (retCode === 0) {
                    this.editInterviewShow = false;
                    this.editLine.fileList = [];
                    this.$message.success(message);
                    this.search(this.pageIndex);
                } else {
                    this.$message.error(message);
                }
            } catch (err) {
                console.error(err);
                this.btnLoading = false;
            }
        },
        // 复制数据
        copyData(row) {
            this.tableStatus = "add";
            this.newLine = {
                stageId: this.stageId,
                statusId: this.statusId,
                date: row.date,
                apartmentId: row.apartmentId,
                jobId: row.jobId,
                typeId: "",
                channelId: row.channelId,
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
                remindDate: "",
                remark: "",
                noticeStr: "",
                noticeDate: "",
                joinRemark: "",
                hideTag: "0",
                isDelete: false
            };
            this.tableDatas.unshift(this.newLine);
            this.tableDatas = JSON.parse(JSON.stringify(this.tableDatas));
        },
        // 删除数据
        async deleteData(row) {
            this.$confirm("此操作将永久删除该候选人, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    const params = {
                        userId: this.userId,
                        id: row.id
                    };
                    const {
                        data: { data, retCode, message }
                    } = await deleteInterviewee(params);
                    if (retCode === 0) {
                        this.search(this.pageIndex);
                        this.$message.success(message);
                    } else {
                        this.$message.error(message);
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 编辑数据
        editData(data) {
            this.editInterviewShow = true;
            this.editLine = JSON.parse(JSON.stringify(data));
        },
        // 关闭抽屉
        handleClose(done) {
            if (this.btnLoading) {
                return;
            }
            this.$confirm("是否未保存修改就退出？")
                .then(async (_) => {
                    done();
                })
                .catch((_) => {});
        },
        cancelForm() {
            this.btnLoading = false;
            this.editInterviewShow = false;
        },
        // 导出数据
        async exportData() {
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
            let interviewBeginDate = "",
                interviewEndDate = "";
            if (this.searchInfo.interviewBeginDate) {
                interviewBeginDate =
                    this.searchInfo.interviewBeginDate.toISOString();
            }
            if (this.searchInfo.interviewEndDate) {
                interviewEndDate =
                    this.searchInfo.interviewEndDate.toISOString();
            }
            const params = {
                userId: this.userId,
                beginDate: beginDate,
                endDate: endDate,
                interviewBeginDate: interviewBeginDate,
                interviewEndDate: interviewEndDate,
                jobId: this.searchInfo.jobId,
                name: this.searchInfo.name
            };
            const {
                data: { data, retCode, message }
            } = await exportInterviewData(params);
            if (retCode === 0) {
                console.log("查询结果", data);
                const changeData = data.datas.map(item => {
                    
                    return item;
                })
                this.getExcel_city(changeData);
            } else {
                this.$message.error(message);
            }
        }
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
