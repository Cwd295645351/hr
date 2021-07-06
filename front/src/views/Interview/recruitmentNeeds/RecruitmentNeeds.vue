<!--
 * @Description: 招聘需求
 * @Version: 
 * @Author: Chen
 * @Date: 2021-03-13 14:37:51
 * @LastEditors: Chen
 * @LastEditTime: 2021-07-06 23:14:22
-->
<template>
    <div class="originNums">
        <div class="search-box">
            <el-form :inline="true">
                <el-form-item size="small">
                    <el-button type="primary" @click="search(1)" size="small"
                        >查询</el-button
                    >
                    <el-button v-show="addLineTag == false" @click="addLine"
                        >新增</el-button
                    >
                    <el-button v-show="addLineTag == true" @click="addCruitment"
                        >保存</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <div class="main">
            <el-table
                :data="tableData"
                border
                class="table-box"
                max-height="730"
                style="width: 100%"
                :loading="loading"
                v-loading="loading"
            >
                <el-table-column align="center" label="登记日期">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-date-picker
                                v-model="newLine.date"
                                type="date"
                                size="small"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                clearable
                            ></el-date-picker>
                        </div>
                        <div v-else>{{ scope.row.date }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="专业">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-select
                                v-model="newLine.majorId"
                                placeholder="请选择专业"
                                size="small"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in majorOptions"
                                    :key="item + '_newLine_' + index"
                                    :label="item.majorName"
                                    :value="item.majorId"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.majorName }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="部门">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                v-model="newLine.apartment"
                                size="small"
                                placeholder="请输入部门"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>{{ scope.row.apartment }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="性质">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-select
                                v-model="newLine.property"
                                size="small"
                                placeholder="请选择性质"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in propertyOptions"
                                    :key="item + '_propertyOptions_' + index"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.property }}</div>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="人数">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                v-model="newLine.num"
                                size="small"
                                placeholder="请输入人数"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>{{ scope.row.num }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="具体要求">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                type="textarea"
                                v-model="newLine.demand"
                                autosize
                                placeholder="请输入具体要求"
                            ></el-input>
                        </div>
                        <div v-else>{{ scope.row.demand }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="希望到岗时间">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-date-picker
                                v-model="newLine.hopeArrivalTime"
                                type="date"
                                size="small"
                                value-format="yyyy-MM-dd"
                                :picker-options="beginDateOptions"
                                placeholder="选择日期"
                                clearable
                            ></el-date-picker>
                        </div>
                        <div v-else>{{ scope.row.hopeArrivalTime }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="实际到岗时间">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-date-picker
                                v-model="newLine.actualArrivalTime"
                                type="date"
                                size="small"
                                :picker-options="endDateOptions"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                clearable
                            ></el-date-picker>
                        </div>
                        <div v-else>{{ scope.row.actualArrivalTime }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="招聘周期">
                    <template slot-scope="scope">
                        <div>{{ scope.row.recruitmentTime }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="进度">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                v-model="newLine.schedule"
                                size="small"
                                placeholder="请输入进度"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>{{ scope.row.schedule }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="remark"
                    label="备注"
                    width="130"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                type="textarea"
                                autosize
                                placeholder="请输入备注"
                                v-model="newLine.remark"
                            ></el-input>
                        </div>
                        <div class="remark" v-else>
                            <el-tooltip
                                :content="scope.row.remark"
                                popper-class="remark-tooltip"
                                placement="top"
                            >
                                <pre>{{ scope.row.remark }}</pre>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="90">
                    <template slot-scope="scope">
                        <div v-if="addLineTag == false || scope.$index > 0">
                            <el-link
                                @click="editInfo(scope.row)"
                                type="info"
                                class="modify"
                                >修改</el-link
                            >
                            <el-link @click="deleteData(scope.row)" type="info"
                                >删除</el-link
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
            title="修改需求"
            :before-close="handleClose"
            :visible.sync="operateDialogTag"
            direction="rtl"
            ref="drawer"
        >
            <div>
                <my-form
                    ref="editLine"
                    :editLine="editLine"
                    :propertyOptions="propertyOptions"
                    :majorOptions="majorOptions"
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
    getCruitmentList,
    addCruitment,
    editCruitment,
    deleteCruitment
} from "../../../../apis/interview/cruitmentNeeds";
import myForm from "./form";
import { getMajorList } from "../../../../apis/common";
export default {
    components: { myForm },
    data() {
        const _this = this;
        return {
            // 用户id
            userId: "",
            // 开始时间限制条件
            beginDateOptions: {
                disabledDate(time) {
                    if (_this.newLine.hopeArrivalTime != "") {
                        return (
                            time.getTime() >
                            new Date(_this.newLine.hopeArrivalTime).getTime()
                        );
                    } else {
                        return false;
                    }
                }
            },
            // 结束时间限制条件
            endDateOptions: {
                disabledDate(time) {
                    if (_this.newLine.hopeArrivalTime != "") {
                        return (
                            time.getTime() <
                            new Date(_this.newLine.hopeArrivalTime).getTime()
                        );
                    } else {
                        return false;
                    }
                }
            },
            // 表格loading
            loading: false,
            // 表格数据
            tableData: [],
            // 表格总数
            pageIndex: 0,
            pageSize: 10,
            total: 0,
            // 新增标志,true为正在新增，false为已保存
            addLineTag: false,
            // 修改招聘需求数侧拉
            operateDialogTag: false,
            // 新增一行
            newLine: {},
            // 编辑信息
            editLine: {},
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
            ]
        };
    },
    created() {},
    mounted() {
        const userInfo = this.$tools.getUserInfo();
        this.userId = userInfo.userId;
        this.getMajorList();
        this.search(1);
    },
    methods: {
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
        // 获取招聘需求列表
        async search(index) {
            this.pageIndex = index;
            if (this.addLineTag) {
                this.addLineTag = false;
                this.newLine = {};
                this.tableData.shift();
            }
            this.loading = true;
            const params = {
                userId: this.userId,
                pageIndex: index,
                pageSize: this.pageSize
            };
            const {
                data: { data, retCode, message }
            } = await getCruitmentList(params);
            this.loading = false;
            if (retCode === 0) {
                console.log(data);
                this.tableData = data.datas.map((item) => {
                    if (item.actualArrivalTime && item.hopeArrivalTime) {
                        item.recruitmentTime =
                            (new Date(item.actualArrivalTime) -
                                new Date(item.hopeArrivalTime)) /
                                86400000 +
                            "天";
                    } else {
                        item.recruitmentTime = "";
                    }
                    return item;
                });
                this.total = data.total;
            } else {
                this.$message.error(message);
            }
        },
        // 新增一行
        addLine() {
            this.addLineTag = true;
            this.newLine = {
                date: "",
                majorId: "",
                apartment: "",
                property: "",
                num: "",
                demand: "",
                hopeArrivalTime: "",
                actualArrivalTime: "",
                recruitmentTime: "",
                schedule: "",
                remark: ""
            };
            this.tableData.unshift(this.newLine);
        },
        // 修改面试流程
        editInfo(row) {
            this.operateDialogTag = true;
            this.editLine = JSON.parse(JSON.stringify(row));
        },
        // 删除数据
        async deleteData(row) {
            this.$confirm("此操作将永久删除该需求, 是否继续?", "提示", {
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
                    } = await deleteCruitment(params);
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
        // 保存新增
        async addCruitment() {
            this.loading = true;
            const params = JSON.parse(JSON.stringify(this.newLine));
            params.userId = this.userId;
            try {
                const {
                    data: { data, retCode, message }
                } = await addCruitment(params);
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
            // console.log("新增数据", this.newLine);
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
                } = await editCruitment(params);
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
.originNums {
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
            .modify {
                padding-right: 5px;
                border-right: 1px solid #c5c5c5;
                margin-right: 5px;
            }
            .status {
                color: #fff;
                border-radius: 4px;
                &.join {
                    background: #fdb13f;
                }
                &.employ {
                    background: #ff4d4d;
                }
                &.faced {
                    background: #a64dff;
                }
                &.attendInterview {
                    background: #4d4dff;
                }
                &.pass {
                    background: #ffa64d;
                }
                &.hire {
                    background: #9b9b9b;
                }
                &.refuse {
                    background: #85b96f;
                }
            }
            .major {
                color: #fff;
                border-radius: 4px;
                &.architecture {
                    background: #4da6ff;
                }
                &.structure {
                    background: #4d4dff;
                }
                &.drainage {
                    background: #ff4d4d;
                }
                &.HVAC {
                    background: #1ee08f;
                }
                &.projectAssistant {
                    background: #ffa64d;
                }
                &.marketingSpecialist {
                    background: #a64dff;
                }
                &.finance {
                    background: #ffff4d;
                }
                &.BIM {
                    background: #00d1d1;
                }
                &.electricity {
                    background: #ff4dff;
                }
            }
            .phone-interview-situation {
                height: 100px;
                text-align: left;
            }
            .remark {
                height: 100px;
                display: flex;
                align-items: center;
                text-align: left;
            }
        }
        .page {
            margin-top: 10px;
            text-align: right;
        }
    }
}
.remark-tooltip {
    width: 278px;
    line-height: 1.5;
    font-size: 14px;
    background: #828181 !important;
}
</style>



