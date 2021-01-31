<!--
 * @Description: 面试情况
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-31 16:34:07
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
                <el-form-item size="small" label="渠道:">
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
                <el-form-item size="small" label="姓名:">
                    <el-input
                        v-model="searchCondition.name"
                        placeholder="请输入姓名"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item size="small" label="手机号:">
                    <el-input
                        v-model="searchCondition.phoneNum"
                        placeholder="请输入手机号"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item size="small" label="邮箱:">
                    <el-input
                        v-model="searchCondition.email"
                        placeholder="请输入邮箱"
                        clearable
                    ></el-input>
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
                            <el-form
                                ref="status"
                                :model="currentMoreInfo"
                                label-width="80px"
                            >
                                <el-form-item size="small" label="通过初筛">
                                    <el-switch
                                        v-model="currentMoreInfo.pass"
                                    ></el-switch>
                                </el-form-item>
                                <el-form-item size="small" label="已约面">
                                    <el-switch
                                        v-model="
                                            currentMoreInfo.attendInterview
                                        "
                                    ></el-switch>
                                </el-form-item>
                                <el-form-item size="small" label="是否到面">
                                    <el-switch
                                        v-model="currentMoreInfo.faced"
                                    ></el-switch>
                                </el-form-item>
                                <el-form-item size="small" label="是否录用">
                                    <el-switch
                                        v-model="currentMoreInfo.employ"
                                    ></el-switch>
                                </el-form-item>
                                <el-form-item size="small" label="是否入职">
                                    <el-switch
                                        v-model="currentMoreInfo.join"
                                    ></el-switch>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="more-button" slot="reference">更多</div>
                        <!-- <el-link slot="reference" type="info">更多</el-link> -->
                    </el-popover>
                </el-form-item>
                <el-form-item size="small">
                    <el-button type="primary" @click="search(1)">查询</el-button>
                    <el-button v-show="addLineTag == false" @click="addLine"
                        >新增</el-button
                    >
                    <el-button
                        v-show="addLineTag == true"
                        @click="addInterviewee"
                        >保存</el-button
                    >
                    <el-upload
                        class="upload-demo"
                        action
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :show-file-list="false"
                        :limit="1"
                        :auto-upload="false"
                    >
                        <el-button size="small" type="primary"
                            >批量上传</el-button
                        >
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <div class="main">
            <el-table
                :data="tableData"
                style="width: 100%"
                border
                max-height="730"
                v-loading="loading"
            >
                <el-table-column
                    align="center"
                    label="日期"
                    width="95"
                >
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
                <el-table-column
                    align="center"
                    label="专业"
                    width="80"
                >
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
                <el-table-column
                    align="center"
                    label="姓名"
                    width="80"
                >
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
                                v-model="newLine.status"
                                size="small"
                                placeholder="请选择简历状态"
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in statusOptions"
                                    :key="item + '_statusOptions_' + index"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-else>{{ scope.row.statusName }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="remark"
                    show-overflow-tooltip
                    label="备注"
                    width="220"
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
                        <div v-else>
                            <pre>{{ scope.row.remark }}</pre>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="面试信息">
                    <el-table-column width="95" align="center" label="日期">
                        <template slot-scope="scope">
                            <div v-if="scope.$index == 0 && addLineTag == true">
                                <el-date-picker
                                    v-if="
                                        newLine.status &&
                                        newLine.status != 'pass'
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
                                        newLine.status &&
                                        newLine.status != 'pass'
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

                    <el-table-column
                        width="60"
                        align="center"
                        label="面试形式"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.$index == 0 && addLineTag == true">
                                <el-select
                                    v-if="
                                        newLine.status &&
                                        newLine.status != 'pass'
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
                    <el-table-column width="150" align="center" label="面试官">
                        <template slot-scope="scope">
                            <div v-if="scope.$index == 0 && addLineTag == true">
                                <el-input
                                    v-if="
                                        newLine.status &&
                                        newLine.status != 'pass'
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
                    show-overflow-tooltip
                    width="220"
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
                        <div v-else>
                            <pre>{{ scope.row.phoneInterviewSituation }}</pre>
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
                            <a href="/files/test-pdf.pdf" target="_blank">11</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="100">
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
import { getMajorList, getChannelList } from "../../../../apis/common";
import {
    getInterviewList,
    addInterviewee,
    importInterviewee,
    editInterviewee,
    deleteInterviewee
} from "../../../../apis/interview/interview";
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
            statusOptions: [
                {
                    label: "通过初筛",
                    value: "pass"
                },
                {
                    label: "已约面",
                    value: "attendInterview"
                },
                {
                    label: "已到面",
                    value: "faced"
                },
                {
                    label: "已录用",
                    value: "employ"
                },
                {
                    label: "已入职",
                    value: "join"
                }
            ],
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
                status: {
                    pass: false, // 是否通过部门筛选
                    attendInterview: false, // 是否已约面
                    faced: false, // 是否到面
                    employ: false, // 是否录用
                    join: false // 是否入职
                }
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
        this.getChannelList();
        this.search(1);
    },
    created() {},
    methods: {
        //导入文件时处理方法
        handleChange(file, fileList) {
            this.fileTemp = file.raw;
            if (this.fileTemp) {
                if (/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
                    this.importfxx(this.fileTemp);
                } else {
                    this.$message({
                        type: "warning",
                        message: "附件格式错误，请重新上传！"
                    });
                }
            } else {
                this.$message({
                    type: "warning",
                    message: "请上传附件！"
                });
            }
            fileList.pop();
        },
        importfxx(obj) {
            let _this = this;
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据

            this.file = event.currentTarget.files[0];

            var rABS = false; //是否将文件读取为二进制字符串
            var f = this.file;

            var reader = new FileReader();
            //if (!FileReader.prototype.readAsBinaryString) {
            FileReader.prototype.readAsBinaryString = function (f) {
                var binary = "";
                var rABS = false; //是否将文件读取为二进制字符串
                var pt = this;
                var wb; //读取完成的数据
                var outdata;
                var reader = new FileReader();
                reader.onload = function (e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    //如果没有在main.js中引入，则此处需要引入，用于解析excel
                    var XLSX = require("xlsx");
                    if (rABS) {
                        wb = XLSX.read(btoa(fixdata(binary)), {
                            //手动转化
                            type: "base64"
                        });
                    } else {
                        wb = XLSX.read(binary, {
                            type: "binary"
                        });
                    }
                    /* var sheet = wb.Sheets[wb.SheetNames[0]];
                    if (
                        sheet.A1.v != "序号" ||
                        sheet.B1.v != "渠道" ||
                        sheet.C1.v != "姓名" ||
                        sheet.D1.v != "联系方式" ||
                        sheet.E1.v != "简历情况" ||
                        sheet.F1.v != "电话沟通情况" ||
                        sheet.G1.v != "面试时间" ||
                        sheet.H1.v != "面试官" ||
                        sheet.I1.v != "录用结果" ||
                        sheet.J1.v != "备注" 
                    ) {
                        _this.$message({
                            type: "warning",
                            message: "模板格式错误，请重新上传！"
                        });
                        return;
                    } */
                    outdata = XLSX.utils.sheet_to_json(
                        wb.Sheets[wb.SheetNames[0]]
                    );
                    // outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
                    // 此处可对数据进行处理
                    let arr = [];
                    outdata.map((v) => {
                        let obj = {};

                        obj.userId = _this.userId;
                        obj.date = _this
                            .$dayjs(new Date())
                            .format("YYYY-MM-DD");
                        obj.name = v["姓名"];
                        obj.majorId = _this.filterMajor(v["专业"]);
                        obj.majorName = v["专业"];
                        obj.property = "社招";
                        obj.phoneNum = v["联系方式"];
                        obj.email = "123@qq.com";
                        obj.remark = v["备注"];
                        _this.filterChanel(v["渠道"], obj);
                        obj.schedules = {
                            date: v["日期"],
                            time: v["时间"],
                            interviewer: v["面试官"],
                            form: v["面试形式"]
                        };
                        obj.phoneInterviewSituation = v["电话沟通情况"];

                        _this.filterStatus(obj, v["面试结果"], v["录用结果"]);

                        arr.push(obj);
                    });
                    /* _this.datotal = arr;
                    _this.tableData = _this.datotal.slice(0, 10);
                    _this.totalPage = arr.length; */
                    console.log(arr);
                    importInterviewee(arr).then((res) => {
                        console.log(res);
                    });
                    return arr;
                };
                reader.readAsArrayBuffer(f);
            };
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        },
        // 过滤状态
        filterStatus(obj, interviewResult, jobResult) {
            if (jobResult != undefined) {
                if (jobResult.includes("入职")) {
                    obj.status = "join";
                } else if (jobResult.includes("拒")) {
                    obj.status = "employ";
                } else if (jobResult.includes("不录用")) {
                    obj.status = "faced";
                }
            } else {
                if (interviewResult.includes("不录用")) {
                    obj.status = "faced";
                } else if (interviewResult.includes("意向录用")) {
                    obj.status = "employ";
                } else if (interviewResult.includes("已约面")) {
                    obj.status = "attendInterview";
                } else if (interviewResult.includes("爽约")) {
                    obj.status = "attendInterview";
                }
            }
        },
        // 过滤专业
        filterMajor(majorName) {
            switch (majorName) {
                case "建筑":
                    return "architecture";
                case "结构":
                    return "structure";
                case "给排水":
                    return "drainage";
                case "弱电":
                    return "weakElectric";
                case "暖通":
                    return "HVAC";
                case "项目助理":
                    return "projectAssistant";
                case "市场专员":
                    return "marketingSpecialist";
                case "财务":
                    return "finance";
                case "BIM":
                    return "BIM";
                case "电气":
                    return "electricity";
            }
        },
        // 过滤渠道
        filterChanel(channelName, obj) {
            let channelId = "others";
            if (channelName != undefined) {
                if (channelName.includes("BOSS")) {
                    channelId = "boss";
                    channelName = "BOSS直聘";
                } else if (channelName.includes("北极星")) {
                    channelId = "gcjob";
                    channelName = "北极星工程招聘";
                } else if (channelName.includes("猎聘")) {
                    channelId = "liepin";
                    channelName = "猎聘";
                } else if (channelName.includes("云招聘")) {
                    channelId = "yunzhaopin";
                    channelName = "云招聘";
                } else if (channelName.includes("智联招聘")) {
                    channelId = "zhaopin";
                    channelName = "智联招聘";
                } else if (
                    channelName.includes("建筑英才网") &&
                    channelName.includes("搜索")
                ) {
                    channelId = "buildHRSearch";
                    channelName = "建筑英才网(搜索)";
                } else if (channelName.includes("建筑英才网")) {
                    channelId = "buildHRDeliver";
                    channelName = "建筑英才网(投递)";
                } else if (
                    channelName.includes("前程无忧") &&
                    channelName.includes("搜索")
                ) {
                    channelId = "51jobSearch";
                    channelName = "前程无忧(搜索)";
                } else if (channelName.includes("前程无忧")) {
                    channelId = "51jobDeliver";
                    channelName = "前程无忧(投递)";
                } else if (
                    channelName.includes("双选会") ||
                    channelName.includes("校招")
                ) {
                    channelId = "doubleElection";
                    channelName = "双选会";
                } else if (
                    channelName.includes("邮箱") ||
                    channelName.includes("自荐")
                ) {
                    channelName = "邮箱投递";
                    obj.remark = channelName + "\n" + obj.remark;
                    channelId = "mailDelivery";
                    console.log(obj.remark);
                } else if (
                    channelName.includes("内推") ||
                    channelName.includes("内部推荐")
                ) {
                    channelName = "内部推荐";
                    channelId = "internalRecommended";
                }
            } else {
                channelName = "其他";
                channelId = "others";
            }
            obj.channelName = channelName;
            obj.channelId = channelId;
        },
        //超出最大上传文件数量时的处理方法
        handleExceed() {
            this.$message({
                type: "warning",
                message: "超出最大上传文件数量的限制！"
            });
            return;
        },
        //移除文件的操作方法
        handleRemove(file, fileList) {
            this.fileTemp = null;
        },
        // 获取专业列表
        async getMajorList() {
            const {
                data: { data, retCode, message }
            } = await getMajorList();
            console.log(data);
            if (retCode === 0) {
                this.majorOptions = data;
            } else {
                this.$message.error(message);
            }
        },
        // 获取渠道列表
        async getChannelList() {
            const {
                data: { data, retCode, message }
            } = await getChannelList();
            console.log(data);
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
                status: [],
                pageIndex: index,
                pageSize: this.pageSize
            };
            for (let key in this.searchCondition.status) {
                if (this.searchCondition.status[key]) {
                    params.status.push(key);
                }
            }
            console.log("搜索条件为：", params);
            const {
                data: { data, retCode, message }
            } = await getInterviewList(params);
            this.loading = false;
            if (retCode === 0) {
                this.tableData = data.datas.map((item) => {
                    this.statusOptions.forEach((status) => {
                        if (item.status == status.value) {
                            item.statusName = status.label;
                        }
                    });
                    return item;
                });
                this.total = data.total;
                console.log("查询结果", data);
            } else {
                this.$message.error(message);
            }
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
                    JSON.stringify(this.searchCondition.status)
                );
            }
        },
        // 确认更多信息
        confirmMoreInfo() {
            this.searchCondition.status = JSON.parse(
                JSON.stringify(this.currentMoreInfo)
            );
            this.popTag = false;
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
                status: "",
                phoneInterviewSituation: "",
                remark: "",
                schedules: {
                    date: "",
                    time: "",
                    form: "",
                    interviewer: ""
                },
                fileList: []
            };
            this.tableData.unshift(this.newLine);
        },
        // 保存新增
        async addInterviewee() {
            this.loading = true;
            this.addLineTag = false;
            const params = JSON.parse(JSON.stringify(this.newLine));
            params.userId = this.userId;
            try {
                const {
                    data: { data, retCode, message }
                } = await addInterviewee(params);
                this.loading = false;
                if (retCode === 0) {
                    this.$message.success(message);
                    this.search(1);
                } else {
                    this.$message.error(message);
                }
            } catch (err) {
                console.error(err);
                this.loading = false;
            }
            console.log("新增数据", this.newLine);
        },
        // 修改面试流程
        editInfo(row) {
            this.operateDialogTag = true;
            this.editLine = JSON.parse(JSON.stringify(row));
        },
        // 删除数据
        async deleteData(row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
            this.loading = true;
            const params = JSON.parse(JSON.stringify(this.editLine));
            params.userId = this.userId;
            if (params.status == "pass") {
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
    .modify {
        padding-right: 5px;
        border-right: 1px solid #c5c5c5;
        margin-right: 5px;
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
/* .el-popper .popper__arrow::after {
  border-bottom-color: #eee !important;
} */
</style>
