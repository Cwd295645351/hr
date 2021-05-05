<!--
 * @Description: 入职信息
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-04-24 22:40:18
 * @LastEditors: Chen
 * @LastEditTime: 2021-05-05 21:49:59
-->
<template>
    <div class="joinInfo">
        <div class="search-box">
            <el-form :inline="true">
                <el-form-item size="small">
                    <el-button type="primary" @click="search(1)" size="small"
                        >查询</el-button
                    >
                    <el-button v-show="addLineTag == false" @click="addLine"
                        >新增</el-button
                    >
                    <el-button v-show="addLineTag == true" @click="addData"
                        >保存</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <div class="main">
            <el-table
                :data="tableData"
                class="table-box"
                max-height="730"
                :cell-style="rowStyle"
                style="width: 100%"
                :loading="loading"
                v-loading="loading"
            >
                <el-table-column align="center" label="档案编号">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                size="small"
                                placeholder="请输入档案编号"
                                v-model="newLine.NO"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>{{ scope.row.NO }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="当前简历状态">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-select
                                v-model="newLine.statusId"
                                size="small"
                                placeholder="请选择简历状态"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in statusOptions"
                                    :key="item + '_statusOptions_' + index"
                                    :label="item.statusName"
                                    :value="item.statusId"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>
                            {{ scope.row.statusName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="入职日期">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-date-picker
                                v-model="newLine.joinDate"
                                type="date"
                                size="small"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                clearable
                            ></el-date-picker>
                        </div>
                        <div v-else>{{ scope.row.joinDate }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="性质">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                size="small"
                                placeholder="请输入性质"
                                v-model="newLine.joinProperty"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>{{ scope.row.joinProperty }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="部门">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                size="small"
                                placeholder="请输入性质"
                                v-model="newLine.apartment"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>{{ scope.row.apartment }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                size="small"
                                placeholder="请输入性质"
                                v-model="newLine.name"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="手机号">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                size="small"
                                placeholder="请输入性质"
                                v-model="newLine.phoneNum"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>{{ scope.row.phoneNum }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="备注">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                type="textarea"
                                autosize
                                placeholder="请输入备注"
                                v-model="newLine.joinRemark"
                            ></el-input>
                        </div>
                        <div class="remark" v-else>
                            {{ scope.row.joinRemark }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="150">
                    <template slot-scope="scope">
                        <div v-if="addLineTag == false || scope.$index > 0">
                            <el-link
                                @click="editInfo(scope.row)"
                                type="info"
                                class="modify"
                                >修改</el-link
                            >
                            <el-link @click="hideData(scope.row)" type="info"
                                >隐藏</el-link
                            >
                        </div>
                    </template>
                </el-table-column>
            </el-table>
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
            title="修改入职信息"
            :before-close="handleClose"
            :visible.sync="operateDialogTag"
            direction="rtl"
            ref="drawer"
        >
            <div>
                <my-form
                    ref="editLine"
                    :editLine="editLine"
                    :statusOptions="statusOptions"
                ></my-form>
                <div class="demo-drawer__footer">
                    <el-button :disable="loading" @click="cancelForm"
                        >取 消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="submitEdit"
                        :loading="loading"
                        >{{ loading ? "提交中 ..." : "确 定" }}</el-button
                    >
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import {
    getJoinInfoList,
    addJoinInfo,
    editJoinInfo,
    hideJoinInfo
} from "../../../../apis/interview/joinInfo";
import { getStatusList } from "../../../../apis/common";
import myForm from "./form";
export default {
    components: { myForm },
    data() {
        const _this = this;
        return {
            // 用户id
            userId: "",
            // 表格loading
            loading: false,
            // 当前简历状态数组
            statusOptions: [],
            // 表格数据
            tableData: [],
            // 新增一行标志
            addLineTag: false,
            // 默认新增行
            newLine: {},
            // 表格总数
            pageIndex: 0,
            pageSize: 10,
            total: 0,
            // 修改初始简历数侧拉
            operateDialogTag: false,
            // 编辑信息
            editLine: {}
        };
    },
    created() {},
    mounted() {
        const userInfo = this.$tools.getUserInfo();
        this.userId = userInfo.userId;
        this.getStatusList();
        this.search(1);
    },
    methods: {
        rowStyle({ row, column, rowIndex, columnIndex }) {
            console.log(row, column, rowIndex, columnIndex);
            if (row.statusName === "毁约") {
                return "background: #ff6666";
            } else {
                if (row.statusName === "已入职") {
                    return "background: #ffcc99";
                } else {
                    return "background: rgb(180,198,231)";
                }
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
        // 获取初始简历列表
        async search(index) {
            this.pageIndex = index;
            this.loading = true;
            if (this.addLineTag) {
                this.addLineTag = false;
                this.newLine = {};
                this.tableData.shift();
            }
            const params = {
                userId: this.userId,
                pageIndex: index,
                pageSize: this.pageSize
            };
            const {
                data: { data, retCode, message }
            } = await getJoinInfoList(params);
            this.loading = false;
            if (retCode === 0) {
                console.log(data);
                this.tableData = data.datas;
                this.total = data.total;
            } else {
                this.$message.error(message);
            }
        },
        // 新增一行
        addLine() {
            this.addLineTag = true;
            this.newLine = {
                name: "",
                phoneNum: "",
                joinDate: "",
                NO: "",
                joinProperty: "",
                statusId: "",
                apartment: "",
                joinRemark: "",
                hideTag: "0"
            };
            this.tableData.unshift(this.newLine);
        },
        // 确认新增
        async addData() {
            this.loading = true;

            const params = JSON.parse(JSON.stringify(this.newLine));
            params.userId = this.userId;

            try {
                const {
                    data: { data, retCode, message }
                } = await addJoinInfo(params);
                this.loading = false;
                if (retCode === 0) {
                    this.$message.success(message);
                    this.addLineTag = false;
                    this.search(1);
                } else {
                    this.$message.error(message);
                }
            } catch (err) {
                console.error(err);
                this.loading = false;
            }
        },
        // 修改面试流程
        editInfo(row) {
            this.operateDialogTag = true;
            this.editLine = JSON.parse(JSON.stringify(row));
        },
        // 隐藏数据
        async hideData(row) {
            this.$confirm("此操作将隐藏该信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    const params = {
                        userId: this.userId,
                        id: row.id,
                        isFromInfo: false
                    };
                    if (row.updatedAt) {
                        // 数据存在面试表
                        params.isFromInfo = true;
                    }
                    const {
                        data: { data, retCode, message }
                    } = await hideJoinInfo(params);
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
                        message: "已取消隐藏"
                    });
                });
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
        // 确认编辑
        async submitEdit() {
            const params = JSON.parse(JSON.stringify(this.editLine));
            params.userId = this.userId;
            try {
                const {
                    data: { data, retCode, message }
                } = await editJoinInfo(params);
                this.loading = false;
                if (retCode === 0) {
                    this.operateDialogTag = false;
                    this.$message.success(message);
                    this.search(1);
                } else {
                    this.$message.error(message);
                }
            } catch (err) {
                console.error(err);
                this.loading = false;
            }
        },
        cancelForm() {
            this.loading = false;
            this.operateDialogTag = false;
        }
    }
};
</script>
<style scoped lang='less'>
.joinInfo {
    margin: 15px;
    .search-box {
        text-align: left;
    }
    .main {
        /deep/ .el-input--small .el-input__inner,
        /deep/ .el-date-editor.el-input,
        /deep/ .el-date-editor.el-input__inner,
        .el-input {
            width: 140px;
        }
        .table-box {
            color: #333;
            .modify {
                padding-right: 5px;
                border-right: 1px solid #c5c5c5;
                margin-right: 5px;
            }
            .remark {
                // height: 100px;
                display: flex;
                align-items: center;
                text-align: left;
            }
        }
        .page {
            margin-top: 10px;
            text-align: right;
        }
        /deep/ .el-table th{
            background: #ccc !important;
            color: #666;
        }
        /deep/ .el-link.el-link--info {
            color: #333;
        }
    }
}
</style>