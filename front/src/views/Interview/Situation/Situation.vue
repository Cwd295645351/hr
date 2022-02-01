<!--
 * @Description: 面试情况
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2022-01-31 11:53:34
-->
<template>
    <div class="situation">
        <div class="searchBar">
            <el-form :inline="true" :model="searchCondition">
                <el-form-item size="small" label="日期">
                    <el-date-picker
                        v-model="searchCondition.beginDate"
                        type="date"
                        placeholder="选择开始日期"
                        :picker-options="beginDateOptions"
                        clearable
                    ></el-date-picker
                    >~
                    <el-date-picker
                        v-model="searchCondition.endDate"
                        type="date"
                        placeholder="选择结束日期"
                        :picker-options="endDateOptions"
                        clearable
                    ></el-date-picker>
                </el-form-item>
                <el-form-item size="small" label="专业">
                    <el-select
                        v-model="searchCondition.majorId"
                        placeholder="请选择专业"
                        clearable
                    >
                        <el-option
                            v-for="(item, index) in majorOptions"
                            :key="item + '_' + index"
                            :label="item.majorName"
                            :value="item.majorId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="渠道">
                    <el-select
                        v-model="searchCondition.channelId"
                        placeholder="请选择渠道"
                        clearable
                    >
                        <el-option
                            v-for="(item, index) in channelOptions"
                            :key="item + '_' + index"
                            :label="item.channelName"
                            :value="item.channelId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="姓名">
                    <el-input
                        v-model="searchCondition.name"
                        placeholder="请输入姓名"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item size="small" label="手机">
                    <el-input
                        v-model="searchCondition.phoneNum"
                        placeholder="请输入手机号"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item size="small" label="邮箱">
                    <el-input
                        v-model="searchCondition.email"
                        placeholder="请输入邮箱"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item size="small" label="状态">
                    <el-select
                        v-model="searchCondition.statusId"
                        multiple
                        collapse-tags
                        placeholder="请选择状态"
                        clearable
                    >
                        <el-option
                            v-for="(item, index) in statusOptions"
                            :key="item + '_' + index"
                            :label="item.statusName"
                            :value="item.statusId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small">
                    <el-button type="primary" @click="search(1)"
                        >查询</el-button
                    >
                    <el-button v-show="tableStatus == 'view'" @click="addLine"
                        >新增</el-button
                    >
                    <el-button
                        v-show="tableStatus == 'add'"
                        @click="addInterviewee"
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
        <div class="main">
            <my-table
                :table-data="tableData"
                :new-line="newLine"
                :table-status="tableStatus"
                :major-options="majorOptions"
                :channel-options="channelOptions"
                :status-options="statusOptions"
                :property-options="propertyOptions"
                @deleteData="deleteData"
                @editData="editData"
            ></my-table>
            <div class="page">
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
            :visible.sync="operateDialogTag"
            direction="rtl"
            ref="drawer"
        >
            <div>
                <my-form
                    ref="editLine"
                    :editLine="editLine"
                    :majorOptions="majorOptions"
                    :channelOptions="channelOptions"
                    :statusOptions="statusOptions"
                    :propertyOptions="propertyOptions"
                    :formOptions="formOptions"
                ></my-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="submitEditInterviewee"
                        :loading="loading"
                        >{{ loading ? "提交中 ..." : "确 定" }}</el-button
                    >
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import myForm from "./form";
import Table from "./components/Table.vue";
import {
    getMajorList,
    getStatusList,
    getChannelList
} from "../../../../apis/common";
import { HOST } from "../../../../apis/InterviewUrlConfig";
import {
    getInterviewList,
    addInterviewee,
    importInterviewee,
    editInterviewee,
    deleteInterviewee
} from "../../../../apis/interview/interview";
import importHandle from "./components/importFile";
export default {
    components: {
        "my-form": myForm,
        "my-table": Table
    },
    mixins: [importHandle],
    data() {
        let that = this;
        return {
            HOST: HOST,
            // 抽屉打开标志
            operateDialogTag: false,
            // 表格状态：view=查看，add=新增
            tableStatus: "view",
            loading: false,
            userId: "",
            // 开始时间限制条件
            beginDateOptions: {
                disabledDate(time) {
                    if (that.searchCondition.endDate != "") {
                        return time.getTime() > that.searchCondition.endDate;
                    } else {
                        return false;
                    }
                }
            },
            // 结束时间限制条件
            endDateOptions: {
                disabledDate(time) {
                    if (that.searchCondition.beginDate != "") {
                        return time.getTime() < that.searchCondition.beginDate;
                    } else {
                        return false;
                    }
                }
            },
            // 渠道数组
            channelOptions: [],
            // 当前简历状态数组
            statusOptions: [],
            // 专业数组
            majorOptions: [],
            // 性质数组
            propertyOptions: [
                {
                    label: "社招",
                    value: "社招"
                },
                {
                    label: "校招",
                    value: "校招"
                },
                {
                    label: "实习",
                    value: "实习"
                }
            ],
            formOptions: [
                {
                    label: "视频",
                    value: "视频"
                },
                {
                    label: "现场",
                    value: "现场"
                },
                {
                    label: "其它",
                    value: "其它"
                }
            ],
            // 更多信息框tag
            popTag: false,
            // 搜索条件
            searchCondition: {
                beginDate: "", // 开始日期
                endDate: "", // 结束日期
                name: "", // 姓名
                majorId: "", // 专业
                channelId: "", // 渠道,
                phoneNum: "", // 手机号
                email: "", // 邮箱
                statusId: []
            },
            pageIndex: 0,
            pageSize: 10,
            total: 0,
            // 当前更多搜索条件
            currentMoreInfo: {
                pass: false, // 是否通过部门筛选
                attendInterview: false, // 是否已约面
                faced: false, // 是否到面
                employ: false, // 是否录用
                join: false // 是否入职
            },
            // 表格数据
            tableData: [],
            // 默认新增行
            newLine: {},
            // 修改行
            editLine: {}
        };
    },

    mounted() {
        const userInfo = this.$tools.getUserInfo();
        this.userId = userInfo.userId;
        this.getMajorList();
        this.getStatusList();
        this.getChannelList();
        this.search(1);
    },
    created() {},
    methods: {
        async exportData() {
            const params = {
                userId: this.userId,
                beginDate: "",
                endDate: "",
                name: "",
                majorId: "",
                channelId: "",
                phoneNum: "",
                email: "",
                statusId: "",
                pageIndex: 0,
                pageSize: 99999
            };
            const {
                data: { data, retCode, message }
            } = await getInterviewList(params);
            if (retCode === 0) {
                console.log("查询结果", data);
                this.getExcel_city(data.datas);
            } else {
                this.$message.error(message);
            }
        },
        // 获取专业列表
        async getMajorList() {
            const {
                data: { data, retCode, message }
            } = await getMajorList();
            if (retCode === 0) {
                this.majorOptions = data;
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
        // 获取渠道列表
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
        // 搜索
        async search(index) {
            this.pageIndex = index;
            if (this.tableStatus == "add") {
                this.tableStatus = "view";
                this.newLine = {};
                this.tableData.shift();
            }
            this.loading = true;
            let beginDate = "",
                endDate = "";
            if (this.searchCondition.beginDate) {
                beginDate = this.$dayjs(this.searchCondition.beginDate).format(
                    "YYYY-MM-DD"
                );
            }
            if (this.searchCondition.endDate) {
                endDate = this.$dayjs(this.searchCondition.endDate).format(
                    "YYYY-MM-DD"
                );
            }
            /* this.tableData = this.tableData.map((item) => {
                item.isPassScreening = item.isPassScreening ? "是" : "否";
                item.isAttendInterview = item.isAttendInterview ? "是" : "否";
                item.isFace = item.isFace ? "是" : "否";
                item.isEmploy = item.isEmploy ? "是" : "否";
                item.isJoin = item.isJoin ? "是" : "否";
                return item;
            }); */
            const params = {
                userId: this.userId,
                beginDate: beginDate,
                endDate: endDate,
                name: this.searchCondition.name,
                majorId: this.searchCondition.majorId,
                channelId: this.searchCondition.channelId,
                phoneNum: this.searchCondition.phoneNum,
                email: this.searchCondition.email,
                statusId: this.searchCondition.statusId,
                pageIndex: index,
                pageSize: this.pageSize
            };
            // console.log("搜索条件为：", params);
            const {
                data: { data, retCode, message }
            } = await getInterviewList(params);
            this.loading = false;
            if (retCode === 0) {
                this.tableData = data.datas;
                this.total = data.total;
                // console.log("查询结果", data);
            } else {
                this.$message.error(message);
            }
        },
        // 新增一行
        addLine() {
            this.tableStatus = "add";
            this.newLine = {
                date: "",
                majorId: "",
                name: "",
                phoneNum: "",
                email: "",
                channelId: "",
                property: "",
                statusId: "",
                joinDate: "",
                phoneInterviewSituation: "",
                remark: "",
                schedules: {
                    date: "",
                    time: "",
                    form: "",
                    interviewer: ""
                },
                fileList: [],
                NO: "",
                apartment: "",
                joinRemark: "",
                hideTag: "0",
                isDelete: false
            };
            this.tableData.unshift(this.newLine);
            this.tableData = JSON.parse(JSON.stringify(this.tableData));
        },
        // 保存新增
        async addInterviewee() {
            this.loading = true;

            const params = JSON.parse(JSON.stringify(this.newLine));
            params.userId = this.userId;
            try {
                const {
                    data: { data, retCode, message }
                } = await addInterviewee(params);
                this.loading = false;
                if (retCode === 0) {
                    this.$message.success(message);
                    this.tableStatus = "view";
                    this.search(1);
                } else {
                    this.$message.error(message);
                }
            } catch (err) {
                console.error(err);
                this.loading = false;
            }
            // console.log("新增数据", this.newLine);
        },
        // 修改面试流程
        editData(row) {
            this.operateDialogTag = true;
            this.editLine = JSON.parse(JSON.stringify(row));
        },
        // 删除数据
        async deleteData(row) {
            this.$confirm("此操作将永久删除该面试者, 是否继续?", "提示", {
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
                        this.search(1);
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
        // 提交编辑面试者
        async submitEditInterviewee() {
            // 整理文件列表
            let fileList = [];
            this.editLine.fileList.forEach((item) => {
                console.log(item);
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

            this.loading = true;
            const params = JSON.parse(JSON.stringify(this.editLine));
            params.userId = this.userId;
            if (params.statusId == "pass") {
                params.schedules = {
                    date: "",
                    time: "",
                    interviewer: "",
                    form: ""
                };
            }
            try {
                const {
                    data: { data, retCode, message }
                } = await editInterviewee(params);
                this.loading = false;
                if (retCode === 0) {
                    this.operateDialogTag = false;
                    this.editLine.fileList = [];
                    this.$message.success(message);
                    this.search(this.pageIndex);
                } else {
                    this.$message.error(message);
                }
            } catch (err) {
                console.error(err);
                this.loading = false;
            }
        },
        // 关闭抽屉
        handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm("是否未保存修改就退出？")
                .then(async (_) => {
                    done();
                })
                .catch((_) => {});
        },
        cancelForm() {
            this.loading = false;
            this.operateDialogTag = false;
        }
    }
};
</script>

<style lang="less" scoped>
.situation {
    margin: 15px;
    .searchBar {
        .el-form {
            display: flex;
            align-items: center;
            .el-form-item {
                margin-left: 10px;
                /deep/ .el-form-item__label {
                    padding-right: 5px;
                }
                .more-button {
                    cursor: pointer;
                }
                .more-button:hover {
                    color: #999;
                    text-decoration: underline;
                }
            }
        }
    }
}
.main {
    /deep/ .el-input--small .el-input__inner,
    /deep/ .el-date-editor.el-input,
    /deep/ .el-date-editor.el-input__inner {
        width: 140px;
    }
    
    .page {
        margin-top: 10px;
        text-align: right;
    }
}
/deep/ .upload-demo {
    //文件上传组件
    display: inline-block;
    margin-left: 10px;
}
</style>
<style lang="less">
.popBox {
    padding: 0;
    .more-info {
        .topbar {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: bold;
            padding: 10px;
            background: #eee;
            .operation {
                display: flex;
                div {
                    margin-right: 5px;
                    cursor: pointer;
                }
            }
        }

        .el-form-item {
            margin: 0;
        }
    }
}
.phone-situation-tooltip {
    width: 278px;
    line-height: 1.5;
    font-size: 14px;
    background: #828181 !important;
}
</style>
