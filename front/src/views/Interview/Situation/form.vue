<!--
 * @Description: 编辑面试情况表单数据
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-02-18 21:46:24
-->
<template>
    <div class="form-box">
        <el-form :model="editLine" label-width="130px" label-position="left">
            <el-form-item label="日期">
                <el-date-picker
                    v-model="editLine.date"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    clearable
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="专业">
                <el-select
                    v-model="editLine.majorId"
                    placeholder="请选择专业"
                    size="small"
                    clearable
                >
                    <el-option
                        v-for="(item, index) in majorOptions"
                        :key="item + '_editLine_' + index"
                        :label="item.majorName"
                        :value="item.majorId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="招工性质">
                <el-select
                    v-model="editLine.property"
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
            </el-form-item>
            <el-form-item label="渠道">
                <el-select
                    v-model="editLine.channelId"
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
            </el-form-item>
            <el-form-item label="姓名">
                <el-input
                    v-model="editLine.name"
                    size="small"
                    placeholder="请输入姓名"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input
                    v-model="editLine.phoneNum"
                    size="small"
                    placeholder="请输入手机号"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input
                    v-model="editLine.email"
                    size="small"
                    placeholder="请输入邮箱"
                    clearable
                ></el-input>
            </el-form-item>

            <el-form-item label="当前简历状态">
                <el-select
                    v-model="editLine.statusId"
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
            </el-form-item>
            <el-form-item label="备注">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入备注"
                    v-model="editLine.remark"
                ></el-input>
            </el-form-item>
            <el-form-item label="入职时间" v-if="editLine.statusId == 'join'">
                <el-date-picker
                    v-model="editLine.joinDate"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择入职时间"
                    clearable
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="面试日期" v-show="editLine.statusId != 'pass'">
                <el-date-picker
                    v-model="editLine.schedules.date"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    clearable
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="面试时间" v-show="editLine.statusId != 'pass'">
                <el-time-select
                    v-model="editLine.schedules.time"
                    size="small"
                    placeholder="选择时间"
                    :picker-options="{
                        start: '08:00',
                        step: '00:15',
                        end: '20:00'
                    }"
                    clearable
                ></el-time-select>
            </el-form-item>
            <el-form-item label="面试形式" v-show="editLine.statusId != 'pass'">
                <el-select
                    v-model="editLine.schedules.form"
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
            </el-form-item>
            <el-form-item label="面试官" v-show="editLine.statusId != 'pass'">
                <el-input
                    v-model="editLine.schedules.interviewer"
                    size="small"
                    placeholder="请输入面试官"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="电话面试情况">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入电话面试情况"
                    v-model="editLine.phoneInterviewSituation"
                ></el-input>
            </el-form-item>
            <el-form-item label="相关材料">
                <el-upload
                    ref="upload"
                    :action="url"
                    :on-preview="handlePreview"
                    :on-change="fileChange"
                    :on-remove="handleRemove"
                    :headers="fileUploadHeaders"
                    :file-list="editLine.fileList"
                    :auto-upload="false"
                >
                    <el-button slot="trigger" size="small" type="primary"
                        >选取文件</el-button
                    >
                    <el-button
                        style="margin-left: 10px"
                        size="small"
                        type="success"
                        @click="submitUpload"
                        >上传到服务器</el-button
                    >
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { FILE_UPLOAD, HOST } from "../../../../apis/InterviewUrlConfig";

export default {
    data() {
        return {
            // 文件上传地址
            url: FILE_UPLOAD
        };
    },
    computed: {
        // 文件上传头
        fileUploadHeaders() {
            let userInfo = this.$tools.getUserInfo();
            return {
                Authorization: userInfo ? `Bearer ${userInfo.accessToken}` : ""
            };
        }
    },
    props: [
        "editLine",
        "majorOptions",
        "channelOptions",
        "statusOptions",
        "propertyOptions",
        "formOptions"
    ],
    created() {},
    mounted() {},
    methods: {
        // 文件上传
        submitUpload() {
            this.$refs.upload.submit();
        },
        // 文件移除
        handleRemove(file, fileList) {
            this.editLine.fileList = fileList;
        },
        // 文件预览
        handlePreview(file) {
            if (file.status == "success") {
                if (file.url) {
                    window.open(file.url, "_blank");
                } else {
                    window.open(HOST + file.response.path, "_blank");
                }
            }
        },
        // 文件更改
        fileChange(file, fileList) {
            this.editLine.fileList = fileList;
        }
    }
};
</script>

<style lang='less' scoped>
.form-box {
    height: 80vh;
    margin: 20px;
    overflow-y: auto;
    /deep/ .el-form-item__content {
        text-align: left;
        .el-input--small,
        .el-input--small .el-input__inner,
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner,
        .el-textarea {
            width: 370px;
        }
    }
    &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        background-color: #ddd;
    }
    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        background: transparent;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track-piece {
        background-color: rgba(0, 0, 0, 0);
        -webkit-border-radius: 6px;
    }
}
</style>

