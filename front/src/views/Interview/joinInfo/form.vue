<!--
 * @Description: 编辑面试情况表单数据
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-04-25 23:08:01
-->
<template>
    <div class="form-box">
        <el-form :model="editLine" label-width="130px" label-position="left">
            <el-form-item label="档案编号">
                <el-input
                    v-model="editLine.NO"
                    size="small"
                    placeholder="请输入档案编号"
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
            <el-form-item label="入职日期">
                <el-date-picker
                    v-model="editLine.joinDate"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    placeholder="选择入职日期"
                    clearable
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="性质">
                <el-input
                    v-model="editLine.joinProperty"
                    size="small"
                    placeholder="请输入性质"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="部门">
                <el-input
                    v-model="editLine.apartment"
                    size="small"
                    placeholder="请输入部门"
                    clearable
                ></el-input>
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
            <el-form-item label="备注">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入备注"
                    v-model="editLine.joinRemark"
                ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {},
    props: ["editLine", "statusOptions"],
    created() {},
    mounted() {},
    methods: {}
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

