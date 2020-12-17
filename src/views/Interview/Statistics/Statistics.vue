<!--
 * @Description: 面试统计
 * @Version: 0.0.1
 * @Author:Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2020-12-17 23:00:33
-->
<template>
    <div class="statistics">
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
                        v-model="searchCondition.major"
                        placeholder="请选择专业"
                        clearable
                    >
                        <el-option
                            v-for="(item, index) in majorOptions"
                            :key="item + '_' + index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small">
                    <el-button @click="searchData" size="small">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content" v-loading="loading">
            <div id="statistics" class="charts"></div>
            <div class="proportion">
                <div class="major-proportion">
                    <div class="title">不同专业入职比例</div>
                    <div
                        v-for="(item, index) in proportionData"
                        :key="index"
                        class="line-box"
                    >
                        <div class="major">{{ item.major }}</div>
                        <div>{{ item.proportion }}</div>
                    </div>
                </div>
                <div class="region-proportion">
                    <div class="title">不同渠道入职比例</div>
                    <div
                        v-for="(item, index) in regionData"
                        :key="index + '_region'"
                        class="line-box"
                    >
                        <div class="major">{{ item.region }}</div>
                        <div>{{ item.proportion }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        let _this = this;
        return {
            // 不同专业入职比例
            proportionData: [
                {
                    major: "建筑",
                    proportion: "40%"
                },
                {
                    major: "结构",
                    proportion: "38%"
                },
                {
                    major: "给排水",
                    proportion: "35%"
                },
                {
                    major: "弱电",
                    proportion: "34%"
                },
                {
                    major: "绿建",
                    proportion: "34%"
                },
                {
                    major: "BIM",
                    proportion: "34%"
                },
                {
                    major: "项目助理",
                    proportion: "34%"
                },
                {
                    major: "市场",
                    proportion: "34%"
                },
                {
                    major: "行政",
                    proportion: "34%"
                },
                {
                    major: "暖通",
                    proportion: "32%"
                }
            ],
            regionData: [
                {
                    region: "BOSS",
                    proportion: "50%"
                },
                {
                    region: "建筑英才网(投递)",
                    proportion: "50%"
                },
                {
                    region: "建筑英才网(搜索)",
                    proportion: "50%"
                }
            ],
            // echarts配置
            options: {
                title: {
                    text: "面试统计信息",
                    x: "center"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    },
                    textStyle: {
                        align: "left"
                    },
                    formatter: function (params) {
                        let str = params[0].axisValueLabel;
                        params.forEach((item, index) => {
                            str += `<br/>${item.seriesName}：${item.value}`;
                            if (index != 4) {
                                str += "份";
                            } else {
                                str += "%";
                            }
                        });
                        return str;
                    }
                },
                legend: {
                    data: [
                        "总数",
                        "BOSS直聘",
                        "建筑英才网(投递)",
                        "建筑英才网(搜索)",
                        "转化率"
                    ],
                    x: "right",
                    top: "50",
                    orient: "vertical"
                },
                grid: {
                    width: "82%",
                    left: "5%"
                },
                /*  toolbox: {
                    feature: {
                        dataView: {
                            readOnly: true
                        },
                        magicType: {
                            type: ["line", "bar"],
                            show: false
                        }
                    }
                }, */
                xAxis: [
                    {
                        type: "category",
                        data: [
                            "初始简历",
                            "通过筛选",
                            "通过邀约",
                            "到面",
                            "录用",
                            "入职"
                        ],
                        name: "阶段",
                        nameTextStyle: {
                            color: "#666",
                            fontSize: 14
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "简历数(份)",
                        nameTextStyle: {
                            color: "#666",
                            fontSize: 14,
                            fontWeight: "bold"
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: true
                        }
                    },
                    {
                        type: "value",
                        name: "转化率(%)",
                        nameTextStyle: {
                            color: "#666",
                            fontSize: 14,
                            fontWeight: "bold"
                        },
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: true
                        }
                    }
                ],
                series: [
                    {
                        name: "总数",
                        type: "bar",
                        data: [45, 29, 20, 18, 12, 9],
                        yAxisIndex: 0
                    },
                    {
                        name: "BOSS直聘",
                        type: "bar",
                        data: [20, 12, 8, 8, 6, 5],
                        yAxisIndex: 0
                    },
                    {
                        name: "建筑英才网(投递)",
                        type: "bar",
                        data: [15, 10, 8, 7, 4, 3],
                        yAxisIndex: 0
                    },
                    {
                        type: "bar",
                        name: "建筑英才网(搜索)",
                        data: [10, 7, 4, 3, 2, 1],
                        yAxisIndex: 0
                    },
                    {
                        type: "line",
                        name: "转化率",
                        data: [100, 64.44, 68.97, 90, 66.67, 75],
                        yAxisIndex: 1
                    }
                ],
                color: [
                    "rgb(255, 127, 80)",
                    "#87cefa",
                    "#da70d6",
                    "#32cd32",
                    "#6495ed",
                    "#ff69b4",
                    "#ba55d3",
                    "#cd5c5c",
                    "#ffa500",
                    "#40e0d0",
                    "#1e90ff",
                    "#ff6347",
                    "#7b68ee",
                    "#00fa9a",
                    "#ffd700",
                    "#6699FF",
                    "#ff6666",
                    "#3cb371",
                    "#b8860b",
                    "#30e0e0"
                ]
            },
            loading: false,
            searchCondition: {
                beginDate: "", // 开始日期
                endDate: "", // 结束日期
                major: "" // 专业
            },
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
            },
            chart: null
        };
    },
    created() {},
    mounted() {
        this.chart = this.$echarts.init(document.getElementById("statistics"));
        this.searchData();
    },
    methods: {
        initEcharts() {
            this.chart.setOption(this.options, true);
        },
        searchData() {
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
            this.initEcharts();
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }
    }
};
</script>

<style lang='less' scoped>
.statistics {
    // width: 95vw;
    margin: 20px;
    .search-box {
        text-align: left;
    }
    .content {
        display: flex;
        height: 80vh;
        // width: 100%;
        .charts {
            width: 75vw;
            height: 100%;
        }
        .proportion {
            .major-proportion,
            .region-proportion {
                width: 15vw;
                margin-left: 10px;
                padding: 10px 0;
                border: 1px solid #ddd;
                color: #666;
                box-shadow: 2px 2px #eee;
                margin-bottom: 20px;
                .title {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .line-box {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 16px;
                    padding: 5px 20px;
                    &:nth-child(2n) {
                        background: #00a1ff80;
                    }
                    /* &:nth-child(2n + 1) {
                        background: rgba(129, 214, 122, 0.3);
                    } */
                    .major {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>

