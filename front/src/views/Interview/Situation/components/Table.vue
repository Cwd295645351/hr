<!--
 * @Description: 表格控件
 * @Version: 1.0.1
 * @Author: Chen
 * @Date: 2022-01-31 11:05:20
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-01 11:02:45
-->
!<template>
    <div class="">
        <el-table
            :data="tableData"
            style="width: 100%"
            border
            class="table-box"
            max-height="730"
        >
            <el-table-column align="center" label="日期" width="95">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
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
            <el-table-column align="center" label="专业" width="80">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
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
                    <div
                        class="major"
                        :style="{
                            'background-color': majorsColor[scope.row.majorId]
                        }"
                        v-else
                    >
                        {{ scope.row.majorName }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="60" align="center" label="性质">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
                        <el-select
                            v-model="newLine.property"
                            placeholder="选择性质"
                            size="small"
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
                    <div v-else>
                        {{ scope.row.property }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="渠道" width="130">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
                        <el-select
                            v-model="newLine.channelId"
                            size="small"
                            placeholder="请选择渠道"
                            clearable
                        >
                            <el-option
                                v-for="(item, index) in channelOptions"
                                :key="item + '_channelOptions_' + index"
                                :label="item.channelName"
                                :value="item.channelId"
                            ></el-option>
                        </el-select>
                    </div>
                    <div v-else>{{ scope.row.channelName }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="姓名" width="80">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
                        <el-input
                            v-model="newLine.name"
                            size="small"
                            placeholder="请输入姓名"
                            clearable
                        ></el-input>
                    </div>
                    <div v-else>{{ scope.row.name }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="手机号" width="110">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
                        <el-input
                            v-model="newLine.phoneNum"
                            size="small"
                            placeholder="请输入手机号"
                            clearable
                        ></el-input>
                    </div>
                    <div v-else>{{ scope.row.phoneNum }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="邮箱" width="160">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
                        <el-input
                            v-model="newLine.email"
                            size="small"
                            placeholder="请输入邮箱"
                            clearable
                        ></el-input>
                    </div>
                    <div v-else>{{ scope.row.email }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="当前简历状态" width="100">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
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
                    <div
                        class="status"
                        v-else
                        :style="{
                            'background-color': statusColor[scope.row.statusId]
                        }"
                    >
                        {{ scope.row.statusName }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="入职时间" width="95">
                <template slot-scope="scope">
                    <div
                        v-if="
                            scope.$index == 0 &&
                            tableStatus == 'add' &&
                            (scope.row.statusId == 'join' ||
                                scope.row.statusId == 'joining')
                        "
                    >
                        <el-date-picker
                            v-model="newLine.joinDate"
                            type="date"
                            size="small"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            clearable
                        ></el-date-picker>
                    </div>
                    <div
                        v-else-if="
                            scope.row.statusId == 'join' ||
                            scope.row.statusId == 'joining'
                        "
                    >
                        {{ scope.row.joinDate }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="入职部门" width="95">
                <template slot-scope="scope">
                    <div
                        v-if="
                            scope.$index == 0 &&
                            tableStatus == 'add' &&
                            (scope.row.statusId == 'join' ||
                                scope.row.statusId == 'joining')
                        "
                    >
                        <el-input
                            v-model="newLine.apartment"
                            size="small"
                            placeholder="请输入部门"
                            clearable
                        ></el-input>
                    </div>
                    <div
                        v-else-if="
                            scope.row.statusId == 'join' ||
                            scope.row.statusId == 'joining'
                        "
                    >
                        {{ scope.row.apartment }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="remark"
                label="备注"
                width="130"
            >
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
                        <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入备注"
                            v-model="newLine.remark"
                        ></el-input>
                    </div>
                    <div class="remark" v-else>
                        {{ scope.row.remark }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="面试信息">
                <el-table-column width="95" align="center" label="日期">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && tableStatus == 'add'">
                            <el-date-picker
                                v-if="
                                    newLine.statusId &&
                                    newLine.statusId != 'pass' &&
                                    newLine.statusId != 'noAnswer'
                                "
                                v-model="newLine.schedules.date"
                                type="date"
                                size="small"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                clearable
                            ></el-date-picker>
                        </div>
                        <div v-else>{{ scope.row.schedules.date }}</div>
                    </template>
                </el-table-column>
                <el-table-column width="60" align="center" label="时间">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && tableStatus == 'add'">
                            <el-time-select
                                v-if="
                                    newLine.statusId &&
                                    newLine.statusId != 'pass' &&
                                    newLine.statusId != 'noAnswer'
                                "
                                v-model="newLine.schedules.time"
                                size="small"
                                placeholder="选择时间"
                                :picker-options="{
                                    start: '08:00',
                                    step: '00:15',
                                    end: '20:00'
                                }"
                                clearable
                            ></el-time-select>
                        </div>
                        <div v-else>{{ scope.row.schedules.time }}</div>
                    </template>
                </el-table-column>

                <el-table-column width="60" align="center" label="面试形式">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && tableStatus == 'add'">
                            <el-select
                                v-if="
                                    newLine.statusId &&
                                    newLine.statusId != 'pass' &&
                                    newLine.statusId != 'noAnswer'
                                "
                                v-model="newLine.schedules.form"
                                placeholder="选择面试形式"
                                size="small"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in formOptions"
                                    :key="item + '_formOptions_' + index"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.schedules.form }}</div>
                    </template>
                </el-table-column>
                <el-table-column width="80" align="center" label="面试官">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && tableStatus == 'add'">
                            <el-input
                                v-if="
                                    newLine.statusId &&
                                    newLine.statusId != 'pass' &&
                                    newLine.statusId != 'noAnswer'
                                "
                                v-model="newLine.schedules.interviewer"
                                size="small"
                                placeholder="请输入面试官"
                                clearable
                            ></el-input>
                        </div>
                        <div v-else>
                            {{ scope.row.schedules.interviewer }}
                        </div>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="电话面试情况" width="200">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'">
                        <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入电话面试情况"
                            v-model="newLine.phoneInterviewSituation"
                        ></el-input>
                    </div>
                    <div class="phone-interview-situation" v-else>
                        <el-tooltip
                            :content="scope.row.phoneInterviewSituation"
                            popper-class="phone-situation-tooltip"
                            placement="top"
                        >
                            <pre>{{ scope.row.phoneInterviewSituation }}</pre>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>

            <el-table-column align="center" label="相关材料" width="100">
                <template slot-scope="scope">
                    <div v-if="scope.$index == 0 && tableStatus == 'add'"></div>
                    <!-- <div v-else>{{ scope.row.relatedMaterials }}</div> -->
                    <div v-else>
                        <div v-for="item in scope.row.fileList" :key="item.url">
                            <a :href="item.url" target="_blank">{{
                                item.name
                            }}</a>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="90">
                <template slot-scope="scope">
                    <div v-if="tableStatus == 'view' || scope.$index > 0">
                        <el-link
                            @click="editData(scope.row)"
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
    </div>
</template>

<script>
export default {
    props: {
        // 表格状态：view=查看，add=新增
        tableStatus: { type: String, default: "view" },
        // 新增数据
        newLine: { type: Object, default: () => {} },
        // 表格数据
        tableData: { type: Array, default: () => [] },
        // 渠道数组
        channelOptions: { type: Array, default: () => [] },
        // 当前简历状态数组
        statusOptions: { type: Array, default: () => [] },
        // 专业数组
        majorOptions: { type: Array, default: () => [] },
        // 性质数组
        propertyOptions: { type: Array, default: () => [] }
    },
    data() {
        return {
            // 状态颜色
            statusColor: {
                pass: "#a593e0", // 通过初筛
                noAnswer: "#6e7783", // 未应约
                attendInterview: "#58c9b9", // 已约面
                breakPromise: "#6e7783", // 爽约
                faced: "#47b8e0", // 已到面
                noHire: "#6e7783", // 不录用
                employ: "#56a902", // 意向录用，待联系
                contacted: "#a5dff9", // 已联系，待回复
                refuseOffer: "#ffc952", // 拒Offer
                joining: "#af4034", // 待入职
                breachContract: "#6e7783", // 毁约
                join: "#ff7473" // 已入职
            },
            // 专业颜色
            majorsColor: {
                architecture: "#ff9933",
                structure: "#0099cc",
                drainage: "#99cc00",
                HVAC: "#ff6666",
                projectAssistant: "#ff6600",
                marketingSpecialist: "#009966",
                finance: "#ffcc33",
                BIM: "#666999",
                electricity: "#cc9999",
                greenBuilding: "#cc3399",
                front: "#009999",
                landScape: "#66cccc",
                hr: "#cc3333"
            }
        };
    },

    created() {},

    mounted() {},

    methods: {
        // 编辑表格
        editData(row) {
            this.$emit("editData", row);
        },
        // 删除表格
        deleteData(row) {
            this.$emit("deleteData", row);
        }
    }
};
</script>
<style scoped lang='less'>
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
    .phone-interview-situation {
        height: 86px;
        text-align: left;
    }
    .remark {
        display: flex;
        align-items: center;
        text-align: left;
    }
}
</style>
