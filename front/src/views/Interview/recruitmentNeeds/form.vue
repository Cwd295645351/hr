<!--
 * @Description: 编辑面试初始简历数表单数据
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-03-26 23:20:32
 * @LastEditors: Chen
 * @LastEditTime: 2021-07-06 23:06:31
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
            <el-form-item label="部门">
                <el-input
                    v-model="editLine.apartment"
                    size="small"
                    placeholder="请输入部门"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="性质">
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
            <el-form-item label="人数">
                <el-input
                    v-model="editLine.num"
                    size="small"
                    placeholder="请输入人数"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="具体要求">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入具体要求"
                    v-model="editLine.demand"
                ></el-input>
            </el-form-item>
            <el-form-item label="希望到岗时间">
                <el-date-picker
                    v-model="editLine.hopeArrivalTime"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="beginDateOptions"
                    clearable
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="实际到岗时间">
                <el-date-picker
                    v-model="editLine.actualArrivalTime"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="endDateOptions"
                    clearable
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="招聘周期">
                <el-input
                    v-model="recruitmentTime"
                    disabled
                    size="small"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="进度">
                <el-input
                    v-model="editLine.schedule"
                    size="small"
                    placeholder="请输入进度"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入备注"
                    v-model="editLine.remark"
                ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        const _this = this;
        return {
            // 开始时间限制条件
            beginDateOptions: {
                disabledDate(time) {
                    if (_this.editLine.actualArrivalTime != "") {
                        return (
                            time.getTime() >
                            new Date(_this.editLine.actualArrivalTime).getTime()
                        );
                    } else {
                        return false;
                    }
                }
            },
            // 结束时间限制条件
            endDateOptions: {
                disabledDate(time) {
                    if (_this.editLine.hopeArrivalTime != "") {
                        return (
                            time.getTime() <
                            new Date(_this.editLine.hopeArrivalTime).getTime()
                        );
                    } else {
                        return false;
                    }
                }
            }
        };
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
        propertyOptions: {
            type: Array,
            default: () => []
        }
    },
    created() {},
    mounted() {},
    computed: {
        // 招聘周期
        recruitmentTime() {
            if (
                this.editLine.actualArrivalTime &&
                this.editLine.hopeArrivalTime
            ) {
                return (
                    (new Date(this.editLine.actualArrivalTime) -
                        new Date(this.editLine.hopeArrivalTime)) /
                        86400000 +
                    "天"
                );
            } else {
                return "";
            }
        }
    },
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

