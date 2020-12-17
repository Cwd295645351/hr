<!--
 * @Description: 面试情况
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2020-12-17 23:00:46
-->
<template>
    <div class="situation">
        <div class="searchBar">
            <el-form :inline="true" :model="searchCondition">
                <el-form-item size="small" label="起止日期:">
                    <el-date-picker
                        v-model="searchCondition.beginDate"
                        type="date"
                        placeholder="选择开始日期"
                        :picker-options="beginDateOptions"
                        clearable
                    ></el-date-picker>~
                    <el-date-picker
                        v-model="searchCondition.endDate"
                        type="date"
                        placeholder="选择结束日期"
                        :picker-options="endDateOptions"
                        clearable
                    ></el-date-picker>
                </el-form-item>
                <el-form-item size="small" label="专业:">
                    <el-select v-model="searchCondition.major" placeholder="请选择专业" clearable>
                        <el-option
                            v-for="(item, index) in majorOptions"
                            :key="item + '_' + index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="渠道:">
                    <el-select v-model="searchCondition.channel" placeholder="请选择渠道" clearable>
                        <el-option
                            v-for="(item, index) in regionOptions"
                            :key="item + '_' + index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="姓名:">
                    <el-input v-model="searchCondition.name" placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item size="small" label="手机号:">
                    <el-input v-model="searchCondition.phoneNum" placeholder="请输入手机号" clearable></el-input>
                </el-form-item>
                <el-form-item size="small" label="邮箱:">
                    <el-input v-model="searchCondition.email" placeholder="请输入邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-popover
                        placement="bottom"
                        popper-class="popBox"
                        v-model="popTag"
                        width="250"
                        trigger="click"
                        @hide="hideHandle"
                    >
                        <div class="more-info">
                            <div class="topbar">
                                <div class="tip">更多信息</div>
                                <div class="operation">
                                    <div @click="cancelMoreInfo">取消</div>
                                    <div @click="clearMoreInfo">重置</div>
                                    <div @click="confirmMoreInfo">确认</div>
                                </div>
                            </div>
                            <el-form ref="moreInfo" :model="currentMoreInfo" label-width="80px">
                                <el-form-item size="small" label="通过初筛">
                                    <el-switch
                                        v-model="
                                            currentMoreInfo.isPassScreening
                                        "
                                    ></el-switch>
                                </el-form-item>
                                <el-form-item size="small" label="参加面试">
                                    <el-switch
                                        v-model="
                                            currentMoreInfo.isAttendInterview
                                        "
                                    ></el-switch>
                                </el-form-item>
                                <el-form-item size="small" label="是否到面">
                                    <el-switch v-model="currentMoreInfo.isFace"></el-switch>
                                </el-form-item>
                                <el-form-item size="small" label="是否录用">
                                    <el-switch v-model="currentMoreInfo.isEmploy"></el-switch>
                                </el-form-item>
                                <el-form-item size="small" label="是否入职">
                                    <el-switch v-model="currentMoreInfo.isJoin"></el-switch>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="more-button" slot="reference">更多</div>
                        <!-- <el-link slot="reference" type="info">更多</el-link> -->
                    </el-popover>
                </el-form-item>
                <el-form-item size="small">
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button v-show="addLineTag == false" @click="addLine">新增</el-button>
                    <el-button v-show="addLineTag == true" @click="saveLine">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="main">
            <el-table :data="tableData" style="width: 100%" max-height="730" v-loading="loading">
                <el-table-column fixed="left" align="center" label="日期" width="160">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
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
                <el-table-column fixed="left" align="center" label="专业" width="160">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
                            <el-select
                                v-model="newLine.majorId"
                                placeholder="请选择专业"
                                size="small"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in majorOptions"
                                    :key="item + '_newLine_' + index"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.majorName }}</div>
                    </template>
                </el-table-column>
                <el-table-column fixed="left" align="center" label="姓名" width="160">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
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
                <el-table-column align="center" label="手机号" width="160">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
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
                <el-table-column align="center" label="邮箱" width="180">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
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
                <el-table-column align="center" label="渠道" width="160">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
                            <el-select
                                v-model="newLine.channelId"
                                size="small"
                                placeholder="请选择渠道"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in regionOptions"
                                    :key="item + '_regionOptions_' + index"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.channelName }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否通过部门筛选" width="150">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
                            <el-switch v-model="newLine.isPassScreening"></el-switch>
                        </div>
                        <div v-else>{{ scope.row.isPassScreening ? "是" : "否" }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否参加面试" width="130">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
                            <el-switch v-model="newLine.isAttendInterview"></el-switch>
                        </div>
                        <div v-else>{{ scope.row.isAttendInterview ? "是" : "否" }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="面试信息">
                    <el-table-column width="160" align="center" label="日期">
                        <template slot-scope="scope">
                            <div v-if="scope.row.addLineTag">
                                <el-date-picker
                                    v-if="newLine.isAttendInterview"
                                    v-model="newLine.interviewInfo.date"
                                    type="date"
                                    size="small"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期"
                                    clearable
                                ></el-date-picker>
                            </div>
                            <div v-else>{{ scope.row.interviewInfo.date }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column width="160" align="center" label="时间">
                        <template slot-scope="scope">
                            <div v-if="scope.row.addLineTag">
                                <el-time-select
                                    v-if="newLine.isAttendInterview"
                                    v-model="newLine.interviewInfo.time"
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
                            <div v-else>{{ scope.row.interviewInfo.time }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column width="160" align="center" label="性质">
                        <template slot-scope="scope">
                            <div v-if="scope.row.addLineTag">
                                <el-select
                                    v-if="newLine.isAttendInterview"
                                    v-model="newLine.interviewInfo.property"
                                    placeholder="选择性质"
                                    size="small"
                                    clearable
                                >
                                    <el-option
                                        v-for="(item, index) in propertyOptions"
                                        :key="
                                            item + '_propertyOptions_' + index
                                        "
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                            <div v-else>{{ scope.row.interviewInfo.property }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column width="160" align="center" label="面试形式">
                        <template slot-scope="scope">
                            <div v-if="scope.row.addLineTag">
                                <el-select
                                    v-if="newLine.isAttendInterview"
                                    v-model="newLine.interviewInfo.form"
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
                            <div v-else>{{ scope.row.interviewInfo.form }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column width="160" align="center" label="面试官">
                        <template slot-scope="scope">
                            <div v-if="scope.row.addLineTag">
                                <el-input
                                    v-if="newLine.isAttendInterview"
                                    v-model="newLine.interviewInfo.interviewer"
                                    size="small"
                                    placeholder="请输入面试官"
                                    clearable
                                ></el-input>
                            </div>
                            <div v-else>{{ scope.row.interviewInfo.interviewer }}</div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="是否到面" width="90">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag"></div>
                        <div v-else>{{ scope.row.isFace ? "是" : "否" }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否录用" width="90">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag"></div>
                        <div v-else>{{ scope.row.isEmploy ? "是" : "否" }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否入职" width="90">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag"></div>
                        <div v-else>{{ scope.row.isJoin ? "是" : "否" }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="电话面试情况" width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
                            <el-input
                                type="textarea"
                                autosize
                                placeholder="请输入电话面试情况"
                                v-model="newLine.phoneInterviewSituation"
                            ></el-input>
                        </div>
                        <div v-else>
                            <pre>{{ scope.row.phoneInterviewSituation }}</pre>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="remark" label="备注" width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag">
                            <el-input
                                type="textarea"
                                autosize
                                placeholder="请输入备注"
                                v-model="newLine.remark"
                            ></el-input>
                        </div>
                        <div v-else>
                            <pre>{{ scope.row.remark }}</pre>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="相关材料" width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.addLineTag"></div>
                        <!-- <div v-else>{{ scope.row.relatedMaterials }}</div> -->
                        <div v-else>
                            <a href="/files/test-pdf.pdf" target="_blank">11</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="100">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.addLineTag">
                            <el-link @click="editInfo(scope.row)" type="info" class="modify">修改</el-link>
                            <el-link @click="deleteData(scope.row)" type="info">删除</el-link>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
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
                    :editLine="editLine"
                    :majorOptions="majorOptions"
                    :regionOptions="regionOptions"
                    :propertyOptions="propertyOptions"
                    :formOptions="formOptions"
                ></my-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="$refs.drawer.closeDrawer()"
                        :loading="loading"
                    >{{ loading ? "提交中 ..." : "确 定" }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import myForm from "./form";
export default {
    components: {
        "my-form": myForm
    },
    data() {
        let that = this;
        return {
            // 抽屉打开标志
            operateDialogTag: false,
            // 新增标志,true为正在新增，false为已保存
            addLineTag: false,
            loading: false,
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
            regionOptions: [
                {
                    label: "BOSS",
                    value: "1"
                },
                {
                    label: "建筑英才网(投递)",
                    value: "2"
                },
                {
                    label: "建筑英才网(搜索)",
                    value: "3"
                }
            ],
            // 专业数组
            majorOptions: [
                {
                    label: "建筑",
                    value: "1"
                },
                {
                    label: "结构",
                    value: "2"
                },
                {
                    label: "给排水",
                    value: "3"
                },
                {
                    label: "弱电",
                    value: "4"
                },
                {
                    label: "暖通",
                    value: "5"
                },
                {
                    label: "项目助理",
                    value: "6"
                },
                {
                    label: "市场",
                    value: "7"
                },
                {
                    label: "财务",
                    value: "8"
                }
            ],
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
                major: "", // 专业
                channel: "", // 渠道,
                phoneNum: "", // 手机号
                email: "", // 邮箱
                moreInfo: {
                    isPassScreening: false, // 是否通过部门筛选
                    isAttendInterview: false, // 是否参加面试
                    isFace: false, // 是否到面
                    isEmploy: false, // 是否录用
                    isJoin: false // 是否入职
                }
            },
            // 当前更多搜索条件
            currentMoreInfo: {
                isPassScreening: false, // 是否通过部门筛选
                isAttendInterview: false, // 是否参加面试
                isFace: false, // 是否到面
                isEmploy: false, // 是否录用
                isJoin: false // 是否入职
            },
            // 表格数据
            tableData: [
                {
                    date: "2016-05-02",
                    majorId: "5",
                    majorName: "暖通",
                    name: "王小虎",
                    phoneNum: "12345678910",
                    email: "223456789@163.com",
                    channelId: "3",
                    channelName: "建筑英才网（搜索）",
                    isPassScreening: true,
                    isAttendInterview: true,
                    interviewInfo: {
                        date: "2020-11-20",
                        time: "16:30",
                        property: "校招",
                        form: "现场",
                        interviewer: "张工"
                    },
                    isFace: true,
                    isEmploy: true,
                    isJoin: false,
                    phoneInterviewSituation: "谈吐还行，条理清晰",
                    remark: "逻辑清楚，不罗嗦，干净利落",
                    fileList: [
                        {
                            name: "food.jpeg",
                            url:
                                "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                        },
                        {
                            name: "food2.jpeg",
                            url:
                                "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                        }
                    ]
                },
                {
                    date: "2016-05-02",
                    majorId: "5",
                    majorName: "暖通",
                    name: "王小虎",
                    phoneNum: "12345678910",
                    email: "223456789@163.com",
                    channelId: "3",
                    channelName: "建筑英才网（搜索）",
                    isPassScreening: true,
                    isAttendInterview: true,
                    interviewInfo: {
                        date: "2020-11-20",
                        time: "16:30",
                        property: "校招",
                        form: "现场",
                        interviewer: "张工"
                    },
                    isFace: true,
                    isEmploy: true,
                    isJoin: false,
                    phoneInterviewSituation: "谈吐还行，条理清晰",
                    remark: "逻辑清楚，不罗嗦，干净利落",
                    fileList: []
                },
                {
                    date: "2016-05-02",
                    majorId: "5",
                    majorName: "暖通",
                    name: "王小虎",
                    phoneNum: "12345678910",
                    email: "223456789@163.com",
                    channelId: "3",
                    channelName: "建筑英才网（搜索）",
                    isPassScreening: true,
                    isAttendInterview: true,
                    interviewInfo: {
                        date: "2020-11-20",
                        time: "16:30",
                        property: "校招",
                        form: "现场",
                        interviewer: "张工"
                    },
                    isFace: true,
                    isEmploy: true,
                    isJoin: false,
                    phoneInterviewSituation: "谈吐还行，条理清晰",
                    remark: "逻辑清楚，不罗嗦，干净利落",
                    fileList: []
                }
            ],
            // 默认新增行
            newLine: {},
            // 修改行
            editLine: {
                addLineTag: "",
                date: "", // 日期
                major: "", // 专业
                name: "", // 姓名
                phoneNum: "", // 手机号
                email: "", // 邮箱
                channel: "", // 渠道
                isPassScreening: false, // 是否通过部门筛选
                isAttendInterview: false, // 是否参加面试
                isFace: false, // 是否到面
                isEmploy: false, // 是否录用
                isJoin: false, // 是否入职
                phoneInterviewSituation: "", // 电话面试情况
                remark: "", // 备注
                interviewInfo: {
                    date: "", // 面试日期
                    time: "", // 面试时间
                    property: "", // 性质
                    form: "", // 面试形式
                    interviewer: "" // 面试官
                }
            }
        };
    },
    mounted() {
        this.search();
    },
    created() {},
    methods: {
        // 搜索
        search() {
            this.loading = true;
            let beginDate = "",
                endDate = "";
            if (this.searchCondition.beginDate) {
                beginDate = this.$moment(this.searchCondition.beginDate).format(
                    "YYYY-MM-DD"
                );
            }
            if (this.searchCondition.endDate) {
                endDate = this.$moment(this.searchCondition.endDate).format(
                    "YYYY-MM-DD"
                );
            }
            console.log("搜索条件为：", this.searchCondition);
            /* this.tableData = this.tableData.map((item) => {
        item.isPassScreening = item.isPassScreening ? "是" : "否";
        item.isAttendInterview = item.isAttendInterview ? "是" : "否";
        item.isFace = item.isFace ? "是" : "否";
        item.isEmploy = item.isEmploy ? "是" : "否";
        item.isJoin = item.isJoin ? "是" : "否";
        return item;
      }); */
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        // 取消更多条件框
        cancelMoreInfo() {
            this.popTag = false;
        },
        // 清空更多条件
        clearMoreInfo() {
            this.currentMoreInfo = {
                isPass: false,
                isInterview: false,
                isFaceInterview: false,
                isEmployment: false,
                isEntry: false
            };
        },
        // 更多条件框隐藏时的回调方法
        hideHandle() {
            if (event.target.innerText != "确认") {
                this.currentMoreInfo = JSON.parse(
                    JSON.stringify(this.searchCondition.moreInfo)
                );
            }
        },
        // 确认更多信息
        confirmMoreInfo() {
            this.searchCondition.moreInfo = JSON.parse(
                JSON.stringify(this.currentMoreInfo)
            );
            this.popTag = false;
        },
        // 新增
        addLine() {
            this.addLineTag = true;
            this.newLine = {
                addLineTag: true,
                date: "",
                major: "",
                name: "",
                phoneNum: "",
                email: "",
                channel: "",
                isPassScreening: false,
                isAttendInterview: false,
                isFace: false,
                isEmploy: false,
                isJoin: false,
                phoneInterviewSituation: "",
                remark: "",
                interviewInfo: {
                    date: "",
                    time: "",
                    property: "",
                    form: "",
                    interviewer: ""
                },
                fileList: []
            };
            this.tableData.unshift(this.newLine);
        },
        // 保存新增
        saveLine() {
            this.loading = true;
            this.addLineTag = false;
            this.tableData[0].addLineTag = false;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        // 修改面试流程
        editInfo(row) {
            this.operateDialogTag = true;
            this.editLine = JSON.parse(JSON.stringify(row));
        },
        // 删除数据
        deleteData(row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm("是否保存修改？")
                .then((_) => {
                    this.loading = true;
                    this.timer = setTimeout(() => {
                        done();
                        // 动画关闭需要一定的时间
                        setTimeout(() => {
                            this.loading = false;
                        }, 400);
                    }, 2000);
                })
                .catch((_) => {});
        },
        cancelForm() {
            this.loading = false;
            this.operateDialogTag = false;
            clearTimeout(this.timer);
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
    .modify {
        padding-right: 5px;
        border-right: 1px solid #c5c5c5;
        margin-right: 5px;
    }
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
/* .el-popper .popper__arrow::after {
  border-bottom-color: #eee !important;
} */
</style>
