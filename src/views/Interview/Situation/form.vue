<!--
 * @Author: Chen
 * @Date: 2020-11-25 22:27:58
 * @LastEditTime: 2020-11-26 23:35:59
 * @LastEditors: Please set LastEditors
 * @Description: 编辑面试情况表单数据
 * @FilePath: \hr-manage\src\views\Interview\Situation\form.vue
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
        >
        </el-date-picker>
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
            :label="item.label"
            :value="item.value"
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
      <el-form-item label="渠道">
        <el-select
          v-model="editLine.channelId"
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
      </el-form-item>
      <el-form-item label="是否通过部门筛选">
        <el-switch v-model="editLine.isPassScreening"></el-switch>
      </el-form-item>
      <el-form-item label="是否参加面试">
        <el-switch v-model="editLine.isAttendInterview"></el-switch>
      </el-form-item>
      <el-form-item label="面试日期" v-show="editLine.isAttendInterview">
        <el-date-picker
          v-model="editLine.interviewInfo.date"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="面试时间" v-show="editLine.isAttendInterview">
        <el-time-select
          v-model="editLine.interviewInfo.time"
          size="small"
          placeholder="选择时间"
          :picker-options="{
            start: '08:00',
            step: '00:15',
            end: '20:00',
          }"
          clearable
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="面试性质" v-show="editLine.isAttendInterview">
        <el-select
          v-model="editLine.interviewInfo.property"
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
      <el-form-item label="面试形式" v-show="editLine.isAttendInterview">
        <el-select
          v-model="editLine.interviewInfo.form"
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
      <el-form-item label="面试官" v-show="editLine.isAttendInterview">
        <el-input
          v-model="editLine.interviewInfo.interviewer"
          size="small"
          placeholder="请输入面试官"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="是否到面">
        <el-switch v-model="editLine.isFace"></el-switch>
      </el-form-item>
      <el-form-item label="是否录用">
        <el-switch v-model="editLine.isEmploy"></el-switch>
      </el-form-item>
      <el-form-item label="是否入职">
        <el-switch v-model="editLine.isJoin"></el-switch>
      </el-form-item>
      <el-form-item label="电话面试情况"
        ><el-input
          type="textarea"
          autosize
          placeholder="请输入电话面试情况"
          v-model="editLine.phoneInterviewSituation"
        >
        </el-input
      ></el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入备注"
          v-model="editLine.remark"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="相关材料">
        <el-upload
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
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
export default {
  data() {
    return {
      fileList: this.editLine.fileList,
    };
  },
  props: [
    "editLine",
    "majorOptions",
    "regionOptions",
    "propertyOptions",
    "formOptions",
  ],
  created() {},
  mounted() {},
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log("去除文件",file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang='less' scoped>
.form-box {
  height: 80vh;
  margin: 20px;
  overflow-y: auto;
  /deep/ .el-form-item__content {
    text-align: left;
    .el-input--small .el-input__inner,
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner,
    .el-textarea {
      width: 370px;
    }
  }
}
</style>

