<!--
 * @Description: 面试情况
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2022-01-31 10:50:51
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
                    <el-button v-show="addLineTag == false" @click="addLine"
                        >新增</el-button
                    >
                    <el-button
                        v-show="addLineTag == true"
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
            <el-table
                :data="tableData"
                style="width: 100%"
                border
                class="table-box"
                max-height="730"
                v-loading="loading"
            >
                <el-table-column align="center" label="日期" width="95">
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
                <el-table-column align="center" label="专业" width="80">
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
                        <div
                            :class="[
                                'major',
                                {
                                    architecture:
                                        scope.row.majorId == 'architecture'
                                },
                                { structure: scope.row.majorId == 'structure' },
                                { drainage: scope.row.majorId == 'drainage' },
                                {
                                    weakElectric:
                                        scope.row.majorId == 'weakElectric'
                                },
                                { HVAC: scope.row.majorId == 'HVAC' },
                                {
                                    projectAssistant:
                                        scope.row.majorId == 'projectAssistant'
                                },
                                {
                                    marketingSpecialist:
                                        scope.row.majorId ==
                                        'marketingSpecialist'
                                },
                                { finance: scope.row.majorId == 'finance' },
                                { BIM: scope.row.majorId == 'BIM' },
                                {
                                    electricity:
                                        scope.row.majorId == 'electricity'
                                },
                                {
                                    greenBuilding:
                                        scope.row.majorId == 'greenBuilding'
                                },
                                {
                                    front: scope.row.majorId == 'front'
                                },
                                {
                                    landScape: scope.row.majorId == 'landScape'
                                },
                                {
                                    hr: scope.row.majorId == 'hr'
                                }
                            ]"
                            v-else
                        >
                            {{ scope.row.majorName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="60" align="center" label="性质">
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
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
                        <div v-if="scope.$index == 0 && addLineTag == true">
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
                        <div v-if="scope.$index == 0 && addLineTag == true">
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
                        <div v-if="scope.$index == 0 && addLineTag == true">
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
                        <div v-if="scope.$index == 0 && addLineTag == true">
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
                <el-table-column
                    align="center"
                    label="当前简历状态"
                    width="100"
                >
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
                        <div
                            :class="[
                                'status',
                                { join: scope.row.statusId == 'join' },
                                { employ: scope.row.statusId == 'employ' },
                                { faced: scope.row.statusId == 'faced' },
                                {
                                    attendInterview:
                                        scope.row.statusId == 'attendInterview'
                                },
                                { pass: scope.row.statusId == 'pass' },
                                { refuse: scope.row.statusId == 'refuseOffer' },
                                { joining: scope.row.statusId == 'joining' },
                                {
                                    contacted: scope.row.statusId == 'contacted'
                                },

                                {
                                    hire:
                                        scope.row.statusId == 'breakPromise' ||
                                        scope.row.statusId == 'noHire' ||
                                        scope.row.statusId ==
                                            'breachContract' ||
                                        scope.row.statusId == 'noAnswer'
                                }
                            ]"
                            v-else
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
                                addLineTag == true &&
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
                                addLineTag == true &&
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
                        <div v-if="scope.$index == 0 && addLineTag == true">
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
                            <div v-if="scope.$index == 0 && addLineTag == true">
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
                            <div v-if="scope.$index == 0 && addLineTag == true">
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
                            <div v-if="scope.$index == 0 && addLineTag == true">
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
                            <div v-if="scope.$index == 0 && addLineTag == true">
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
                <el-table-column
                    align="center"
                    label="电话面试情况"
                    width="200"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.$index == 0 && addLineTag == true">
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
                                <pre>{{
                                    scope.row.phoneInterviewSituation
                                }}</pre>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="相关材料" width="100">
                    <template slot-scope="scope">
                        <div
                            v-if="scope.$index == 0 && addLineTag == true"
                        ></div>
                        <!-- <div v-else>{{ scope.row.relatedMaterials }}</div> -->
                        <div v-else>
                            <div
                                v-for="item in scope.row.fileList"
                                :key="item.url"
                            >
                                <a :href="item.url" target="_blank">{{
                                    item.name
                                }}</a>
                            </div>
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
        "my-form": myForm
    },
    mixins: [importHandle],
    data() {
        let that = this;
        return {
            HOST: HOST,
            // 抽屉打开标志
            operateDialogTag: false,
            // 新增标志,true为正在新增，false为已保存
            addLineTag: false,
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
            if (this.addLineTag) {
                this.addLineTag = false;
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
            this.addLineTag = true;
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
        // 修改面试流程
        editInfo(row) {
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
                background: #ff7473;
            }
            &.employ {
                background: #56a902;
            }
            &.faced {
                background: #47b8e0;
            }
            &.attendInterview {
                background: #58c9b9;
            }
            &.pass {
                background: #a593e0;
            }
            &.hire {
                background: #6e7783;
            }
            &.refuse {
                background: #ffc952;
            }
            &.joining {
                background: #af4034;
            }
            &.contacted {
                background: #a5dff9;
            }
        }
        .major {
            color: #fff;
            border-radius: 4px;
            &.architecture {
                background: #ff9933;
            }
            &.structure {
                background: #0099cc;
            }
            &.drainage {
                background: #99cc00;
            }
            &.HVAC {
                background: #ff6666;
            }
            &.projectAssistant {
                background: #ff6600;
            }
            &.marketingSpecialist {
                background: #009966;
            }
            &.finance {
                background: #ffcc33;
            }
            &.BIM {
                background: #666999;
            }
            &.electricity {
                background: #cc9999;
            }
            &.greenBuilding {
                background: #cc3399;
            }
            &.front {
                background: #009999;
            }
            &.landScape {
                background: #66cccc;
            }
            &.hr {
                background: #cc3333;
            }
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
