<!--
 * @Author: 陈伟栋
 * @Date: 2020-11-15 21:01:07
 * @LastEditTime: 2020-11-29 23:52:19
 * @LastEditors: Chen Weidong
 * @Description: 面试统计
 * @FilePath: \hr-manage\src\views\Interview\Statistics\Statistics.vue
-->
<template>
    <div class="statistics">
        <div class="searchBox">
            <el-button size="small">查询</el-button>
        </div>
        <div class="content">
            <div id="statistics" class="charts"></div>
            <div class="proportion">
                <div class="title">入职比例</div>
                <div
                    v-for="(item, index) in proportionData"
                    :key="index"
                    class="line-box"
                >
                    <div class="major">{{ item.major }}</div>
                    <div>{{ item.proportion }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
            chart: null
        };
    },
    created() {},
    mounted() {
        this.chart = this.$echarts.init(document.getElementById("statistics"));
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            this.chart.setOption(this.options, true);
        }
    }
};
</script>

<style lang='less' scoped>
.statistics {
    width: 95vw;
    margin: 20px;
    .content {
        display: flex;
        width: 100%;
        .charts {
            width: 80%;
            height: 600px;
        }
        .proportion {
            width: 15%;
            height: 350px;
            margin-left: 10px;
            padding: 20px;
            border: 1px solid #ddd;
            color: #666;
            box-shadow: 2px 2px #eee;
            .title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .line-box {
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                margin-top: 5px;
                .major {
                    font-weight: bold;
                }
            }
        }
    }
}
</style>

