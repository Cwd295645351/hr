<!--
 * @Description: 编辑面试初始简历数表单数据
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-03-26 23:20:32
 * @LastEditors: Chen
 * @LastEditTime: 2021-03-26 23:43:44
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
            <el-form-item label="总数">
                <el-input
                    v-model="editLine.num"
                    size="small"
                    placeholder="请输入总数"
                    clearable
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
    props: {
        editLine: {
            type: Object,
            default: {}
        },
        majorOptions: {
            type: Array,
            default: () => []
        },
        channelOptions: {
            type: Array,
            default: () => []
        }
    },
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

