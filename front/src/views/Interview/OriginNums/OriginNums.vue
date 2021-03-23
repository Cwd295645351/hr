<!--
 * @Description: 初始简历数
 * @Version: 
 * @Author: Chen
 * @Date: 2021-03-13 14:37:51
 * @LastEditors: Chen
 * @LastEditTime: 2021-03-13 19:45:15
-->
<template>
    <div class="originNums">
        <div class="search-box">
            <el-form :inline="true" :model="searchCondition">
                <el-form-item size="small" label="起止日期:">
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
                <el-form-item size="small" label="专业:">
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
                <el-form-item size="small">
                    <el-button @click="getOriginNumsList" size="small"
                        >查询</el-button
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
            >
                <el-table-column prop="date" align="center" label="日期">
                </el-table-column>
                <el-table-column prop="channelName" align="center" label="渠道">
                </el-table-column>
                <el-table-column prop="majorName" align="center" label="专业">
                </el-table-column>
                <el-table-column prop="num" align="center" label="总数">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {
    getOriginNumsList,
    addOriginNums,
    editOriginNums,
    deleteOriginNums
} from "../../../../apis/interview/statistics";
import { getMajorList } from "../../../../apis/common";
export default {
    data() {
        const _this = this;
        return {
            // 用户id
            userId: "",
            // 表格loading
            loading: false,
            // 表格数据
            tableData: [],
            // 表格总数
            total: 0,
            // 搜索条件
            searchCondition: {
                beginDate: "", // 开始日期
                endDate: "", // 结束日期
                majorId: "" // 专业
            },
            // 专业数组
            majorOptions: [],
            // 开始时间限制条件
            beginDateOptions: {
                disabledDate(time) {
                    if (_this.searchCondition.endDate != "") {
                        return time.getTime() > _this.searchCondition.endDate;
                    } else {
                        return false;
                    }
                }
            },
            // 结束时间限制条件
            endDateOptions: {
                disabledDate(time) {
                    if (_this.searchCondition.beginDate != "") {
                        return time.getTime() < _this.searchCondition.beginDate;
                    } else {
                        return false;
                    }
                }
            }
        };
    },
    created() {},
    mounted() {
        const userInfo = this.$tools.getUserInfo();
        this.userId = userInfo.userId;
        this.getMajorList();
        this.getOriginNumsList();
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
        // 获取初始简历列表
        async getOriginNumsList() {
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
            const params = {
                userId: this.userId,
                beginDate: beginDate,
                endDate: endDate,
                majorId: this.searchCondition.majorId
            };
            const {
                data: { data, retCode, message }
            } = await getOriginNumsList(params);
            if (retCode === 0) {
                console.log(data);
                this.tableData = data.datas;
            } else {
                this.$message.error(message);
            }
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
        /deep/ .el-date-editor.el-input__inner {
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
</style>



