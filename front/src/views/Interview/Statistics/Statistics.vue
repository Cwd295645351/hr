<!--
 * @Description: 面试统计
 * @Version: 0.0.1
 * @Author:Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2022-01-22 09:30:28
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
                        <div class="major">{{ item.majorName }}</div>
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
                        <div class="major">{{ item.channelName }}</div>
                        <div>{{ item.proportion }}%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getInterviewStatistics,
    getEntryRate
} from "../../../../apis/interview/statistics";
import { getMajorList } from "../../../../apis/common";
export default {
    data() {
        let _this = this;
        return {
            // 用户Id
            userId: "",
            // 不同专业入职比例
            proportionData: [],
            // 不同渠道入职比例
            regionData: [],
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
                    confine: true,
                    textStyle: {
                        align: "left"
                    },
                    // position:[0,0],
                    formatter: function (params) {
                        let str = params[0].axisValueLabel;
                        params.forEach((item, index) => {
                            str += `<br/>${item.seriesName}：${item.value}`;
                            if (!item.seriesName.includes("转化")) {
                                str += "份";
                            } else {
                                str += "%";
                            }
                        });
                        return str;
                    }
                },
                legend: {
                    data: [],
                    selected: {},
                    x: "right",
                    top: "50",
                    orient: "vertical"
                },
                grid: {
                    width: "70%",
                    left: "5%"
                },
                /* toolbox: {
                    feature: {
                        magicType: {
                            type: ["line", "bar"],
                            show: true
                        }
                    }
                }, */
                xAxis: [
                    {
                        type: "category",
                        data: [],
                        // name: "阶段",
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
                series: [],
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
            // 搜索条件
            searchCondition: {
                beginDate: "", // 开始日期
                endDate: "", // 结束日期
                majorId: "" // 专业
            },
            // 专业数组
            majorOptions: [],
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
        const userInfo = this.$tools.getUserInfo();
        this.userId = userInfo.userId;
        this.chart = this.$echarts.init(document.getElementById("statistics"));
        this.getMajorList();
        this.searchData();
    },
    methods: {
        // 获取专业列表
        async getMajorList() {
            const {
                data: { data, retCode, message }
            } = await getMajorList();
            // console.log(data);
            if (retCode === 0) {
                this.majorOptions = data;
            } else {
                this.$message.error(message);
            }
        },
        initEcharts() {
            this.chart.setOption(this.options, true);
        },
        // 搜索数据
        async searchData() {
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

            this.getInterviewStatistics(beginDate, endDate);
            this.getEntryRate(beginDate, endDate);

            this.loading = false;
        },
        // 获取面试统计信息
        async getInterviewStatistics(beginDate, endDate) {
            const params = {
                userId: this.userId,
                beginDate: beginDate,
                endDate: endDate,
                majorId: this.searchCondition.majorId
            };

            const {
                data: { data, retCode, message }
            } = await getInterviewStatistics(params);
            if (retCode === 0) {
                // console.log(data);
                const regionData = [];
                const yData = data.yData;
                let index = 0;

                // 面试统计信息
                this.options.xAxis[0].data = data.xData;
                for (let key in yData) {
                    this.options.legend.data.push(key);
                    this.options.legend.selected[key] = false;
                    if (!key.includes("转化")) {
                        // 简历数
                        this.options.series[index++] = {
                            name: key,
                            type: "bar",
                            data: yData[key],
                            yAxisIndex: 0
                        };
                    } else {
                        // 转化率和初始转化率
                        this.options.series[index++] = {
                            name: key,
                            type: "line",
                            data: yData[key],
                            yAxisIndex: 1
                        };

                        // 统计不同渠道入职比例，找到非总数的所有初始转化率
                        if (
                            key.includes("初始转化率") &&
                            key != "总数初始转化率"
                        ) {
                            console.log(key, yData[key]);
                            const proportion = yData[key][6]; // 入职阶段的初始转化率
                            let obj = {
                                channelName: key.slice(0,-5),
                                proportion: proportion
                            };
                            regionData.push(obj);
                        }
                    }
                }

                // 不同渠道入职比例进行排序
                this.regionData = regionData.sort((first, second) => {
                    if (
                        parseFloat(first.proportion) >
                        parseFloat(second.proportion)
                    ) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
            } else {
                this.$message.error(message);
            }
            this.initEcharts();
        },
        // 获取不同专业入职比例
        async getEntryRate(beginDate, endDate) {
            const params = {
                userId: this.userId,
                beginDate: beginDate,
                endDate: endDate
            };
            const {
                data: { data, retCode, message }
            } = await getEntryRate(params);
            if (retCode === 0) {
                // console.log(data);
                this.proportionData = data.map((item) => {
                    item.proportion += "%";
                    return item;
                });
            } else {
                this.$message.error(message);
            }
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

