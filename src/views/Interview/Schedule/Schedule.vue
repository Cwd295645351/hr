<!--
 * @Author: 陈伟栋
 * @Date: 2020-11-15 21:00:54
 * @LastEditTime: 2020-12-01 23:44:26
 * @LastEditors: Chen Weidong
 * @Description: 面试日程
 * @FilePath: \hr-manage\src\views\Interview\Schedule\Schedule.vue
-->
<template>
    <div class="schedule">
        <div class="operate">
            <span>
                <i class="el-icon-d-arrow-left" style="margin-right: 10px"></i>
                <span>上一周</span>
            </span>
            <span>
                <span>下一周</span>
                <i class="el-icon-d-arrow-right" style="margin-left: 10px"></i>
            </span>
        </div>
        <div class="content">
            <div class="item week">
                <div v-for="week in weeks" :key="'top_' + week">{{ week }}</div>
            </div>
            <div class="item">
                <div v-for="i of 7" :key="'top_' + i">
                    <div class="date">{{ datas[i - 1].date }}</div>
                    <div class="scroll-box">
                        <div
                            class="data-item"
                            v-for="(item,index) in datas[i-1].interview"
                            :key="datas[i-1].date+'_'+index"
                        >
                            <div>{{item.time}}</div>
                            <div>{{item.name}}</div>
                            <div>(</div>
                            <div>{{item.major}}</div>
                            <div>{{item.property}}</div>
                            <div>{{item.interview_form}}</div>
                            <div>{{item.interviewer}}</div>
                            <div>)</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div v-for="i of 7" :key="'middle_' + i">
                    <div class="date">{{ datas[i - 1 + 7].date }}</div>
                </div>
            </div>
            <div class="item">
                <div v-for="i of 7" :key="'bottom_' + i">
                    <div class="date">{{ datas[i - 1 + 14].date }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            beginDate: "",
            endDate: "",
            topLine: [],
            middleLine: [],
            bottomLine: [],
            weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            datas: [
                {
                    date: "2020-11-30",
                    interview: [
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        },
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        },
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        },
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        },
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        },
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        },
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        },
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        },
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        },
                        {
                            time: "16:30",
                            name: "王少发",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖高盛"
                        }
                    ]
                },
                {
                    date: "2020-12-01",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-02",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-03",
                    interview: []
                },
                {
                    date: "2020-12-04",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-05",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-06",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-07",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-08",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-09",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-10",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-11",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-12",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-13",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-14",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-15",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-16",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-17",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-18",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-19",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                },
                {
                    date: "2020-12-20",
                    interview: [
                        {
                            time: "2:30",
                            name: "小王",
                            major: "建筑",
                            property: "校招",
                            interview_form: "现场",
                            interviewer: "廖"
                        }
                    ]
                }
            ]
        };
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style lang="less" scoped>
.schedule {
    height: 98%;
    width: 95vw;
    text-align: center;
    .operate {
        width: 95%;
        margin: 10px auto;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        color: #999;
    }
    .content {
        height: 90%;
        width: 95%;
        margin: 0 auto;
        border-left: 1px solid #999;
        border-top: 1px solid #999;
        .item {
            display: flex;
            height: 32%;
            width: 100%;
            > div {
                flex: 1;
                height: 100%;
                border-right: 1px solid #999;
                border-bottom: 1px solid #999;
                .date {
                    height: 20px;
                    font-size: 16px;
                    line-height: 20px;
                    background: #eee;
                }
                .scroll-box {
                    height: calc(100% - 20px);
                    overflow: auto;
                    .data-item {
                        display: flex;
                        align-items: center;
                        margin: 10px;
                        div {
                            margin-right: 4px;
                        }
                    }
                    &::-webkit-scrollbar {
                        /*滚动条整体样式*/
                        width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
                        height: 1px;
                    }
                    &::-webkit-scrollbar-thumb {
                        /*滚动条里面小方块*/
                        border-radius: 2px;
                        background-color: #eee;
                    }
                    &::-webkit-scrollbar-track {
                        /*滚动条里面轨道*/
                        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
                        background: transparent;
                        border-radius: 10px;
                    }
                }
            }
        }
        .week {
            height: 4%;
            background: #00a1ff80;
            font-size: 20px;
            color: #fff;
            font-weight: bold;
        }
    }
}
</style>
