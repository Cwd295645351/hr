<!--
 * @Description: 招聘需求
 * @Version: 
 * @Author: Chen
 * @Date: 2021-03-13 14:37:51
 * @LastEditors: ChenWeidong
 * @LastEditTime: 2022-03-28 15:48:37
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
                <el-table-column align="center" label="优先级">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-select
                                v-model="newLine.priority"
                                size="small"
                                placeholder="请选择优先级"
                                clearable
                            >
                                <el-option label="高" :value="1"></el-option>
                                <el-option label="中" :value="2"></el-option>
                                <el-option label="低" :value="3"></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.priorityName }}</div>
                    </template>
                </el-table-column>
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
                <el-table-column align="center" label="部门">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-select
                                v-model="newLine.apartmentId"
                                placeholder="请选择部门"
                                size="small"
                            >
                                <el-option
                                    v-for="(item, index) in jobOptions"
                                    :key="item + '_apartment_' + index"
                                    :label="item.apartmentName"
                                    :value="item.apartmentId"
                                ></el-option>
                            </el-select>
                        </div>
                        <div
                            class="major"
                            :style="{
                                'background-color':
                                    majorsColor[scope.row.apartmentId]
                            }"
                            v-else
                        >
                            {{ scope.row.apartmentName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="岗位">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-select
                                v-model="newLine.jobId"
                                placeholder="请选择岗位"
                                size="small"
                            >
                                <el-option
                                    v-for="(item, index) in jobs"
                                    :key="item + '_jobOptions_' + index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div
                            class="major"
                            :style="{
                                'background-color':
                                    majorsColor[scope.row.apartmentId]
                            }"
                            v-else
                        >
                            {{ scope.row.jobName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="薪酬范围" width="140">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                v-model="newLine.salaryMin"
                                class="money"
                                size="small"
                                placeholder="请输入"
                                clearable
                            ></el-input
                            >-
                            <el-input
                                v-model="newLine.salaryMax"
                                size="small"
                                class="money"
                                placeholder="请输入"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>
                            {{ scope.row.salaryMin }} -
                            {{ scope.row.salaryMax }} K
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="类别">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-select
                                v-model="newLine.typeId"
                                size="small"
                                placeholder="请选择类别"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in types"
                                    :key="item + '_typesOptions_' + index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.typeName }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用人经理">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-select
                                v-model="newLine.interviewerId"
                                size="small"
                                placeholder="请选择用人经理"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in interviewerOptions"
                                    :key="item + '_interviewerOptions_' + index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.interviewerName }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="地点">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-select
                                v-model="newLine.cityId"
                                size="small"
                                placeholder="请选择地点"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in citiesOptions"
                                    :key="item + '_cityOptions_' + index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.cityName }}</div>
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
                <el-table-column align="center" label="JD">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
                            <el-input
                                type="textarea"
                                v-model="newLine.demand"
                                autosize
                                placeholder="请输入JD"
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
                            <el-select
                                v-model="newLine.scheduleId"
                                size="small"
                                placeholder="请选择类别"
                                clearable
                            >
                                <el-option
                                    label="开放中"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="已关闭"
                                    :value="2"
                                ></el-option>
                                <el-option label="暂停" :value="3"></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.scheduleName }}</div>
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
                    :job-options="jobOptions"
                    :interviewer-options="interviewerOptions"
                    :cities-options="citiesOptions"
                    :types="types"
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
import {
    getJobList,
    getConfig,
    getInterviewerList,
    getCityList
} from "../../../../apis/common";
export default {
    components: { myForm },
    data() {
        const _this = this;
        return {
            userId: "", // 用户id
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
            loading: false, // 表格loading
            tableData: [], // 表格数据
            pageIndex: 0, // 页码
            pageSize: 10, // 每页大小
            total: 0, // 表格总数
            addLineTag: false, // 新增标志,true为正在新增，false为已保存
            operateDialogTag: false, // 修改招聘需求数侧拉
            newLine: {}, // 新增一行
            editLine: {}, // 编辑信息
            interviewerOptions: [], // 面试官数组
            jobOptions: [], // 应聘部门-职位数组
            citiesOptions: [], // 城市数据
            types: [], // 类别数据
            // 专业颜色
            majorsColor: {
                0: "#ff9933",
                1: "#0099cc",
                2: "#99cc00",
                3: "#cc9999",
                4: "#ffcc33",
                5: "#009999"
            }
        };
    },
    created() {},
    computed: {
        // 招聘职位
        jobs() {
            const apartmentId = this.newLine.apartmentId;
            return apartmentId !== ""
                ? this.jobOptions[this.newLine.apartmentId].jobs
                : [];
        }
    },
    mounted() {
        const userInfo = this.$tools.getUserInfo();
        this.userId = userInfo.userId;
        this.getJobList();
        this.getConfig();
        this.getInterviewerList();
        this.getCityList();
        this.search(1);
    },
    methods: {
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
        // 获取配置
        async getConfig() {
            const {
                data: { data, retCode, message }
            } = await getConfig();
            if (retCode === 0) {
                this.types = data.type;
            } else {
                this.$message.error(message);
            }
        },
        // 获取面试官列表
        async getInterviewerList() {
            const {
                data: { data, retCode, message }
            } = await getInterviewerList(true);
            if (retCode === 0) {
                this.interviewerOptions = data;
            } else {
                this.$message.error(message);
            }
        },
        // 获取面试官列表
        async getCityList() {
            const {
                data: { data, retCode, message }
            } = await getCityList();
            if (retCode === 0) {
                this.citiesOptions = data;
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
                    if (item.actualArrivalTime && item.date) {
                        item.recruitmentTime =
                            (new Date(item.actualArrivalTime) -
                                new Date(item.date)) /
                                86400000 +
                            "天";
                    } else {
                        item.recruitmentTime = "";
                    }
                    switch (item.scheduleId) {
                        case 1:
                            item.scheduleName = "开放中";
                            break;
                        case 2:
                            item.scheduleName = "已关闭";
                            break;
                        case 3:
                            item.scheduleName = "暂停";
                            break;
                    }
                    switch (item.priority) {
                        case 1:
                            item.priorityName = "高";
                            break;
                        case 2:
                            item.priorityName = "中";
                            break;
                        case 3:
                            item.priorityName = "低";
                            break;
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
                apartmentId: "",
                apartmentName: "",
                jobId: "",
                jobName: "",
                salaryMin: "",
                salaryMax: "",
                typeId: "",
                typeName: "",
                interviewerId: "",
                interviewerName: "",
                cityId: "",
                cityName: "",
                num: "",
                demand: "",
                hopeArrivalTime: "",
                actualArrivalTime: "",
                recruitmentTime: "",
                scheduleId: "",
                priority: "",
                remark: "",
                isDelete: false
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
            const params = JSON.parse(JSON.stringify(this.newLine));
            params.userId = this.userId;
            const num = Number(params.num);
            if (params.num == "" || isNaN(num)) {
                this.$message.error("人数必须是数字");
                return;
            }
            params.num = num;
            this.loading = true;
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
            const num = Number(params.num);
            if (params.num == "" || isNaN(num)) {
                this.$message.error("人数必须是数字");
                return;
            }
            params.num = num;
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
            .major {
                color: #fff;
                border-radius: 4px;
            }
            .remark {
                // height: 100px;
                display: flex;
                align-items: center;
                text-align: left;
            }
            .money {
                width: 80px;
                /deep/.el-input__inner {
                    width: 100%;
                }
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



