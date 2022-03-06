<!--
 * @Description: 面试日程
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-06 23:44:24
-->
<template>
    <div class="schedule">
        <div class="operate">
            <span @click="lastWeek">
                <i class="el-icon-d-arrow-left" style="margin-right: 10px"></i>
                <span>上一周</span>
            </span>
            <span @click="nextWeek">
                <span>下一周</span>
                <i class="el-icon-d-arrow-right" style="margin-left: 10px"></i>
            </span>
        </div>
        <div class="content" v-if="datas.length > 0">
            <div class="item week">
                <div v-for="week in weekdays" :key="'top_' + week">
                    {{ week }}
                </div>
                <div
                    v-for="week in weekend"
                    class="weekend"
                    :key="'top_' + week"
                >
                    {{ week }}
                </div>
            </div>
            <div class="item">
                <div
                    v-for="i of 7"
                    :class="{ weekend: i == 6 || i == 7 }"
                    :key="'top_' + i"
                >
                    <div class="date">{{ datas[i - 1].date }}</div>
                    <div class="scroll-box morning">
                        <div
                            :class="[
                                'data-item',
                                { 'break-promise': item.statusName == '爽约' }
                            ]"
                            v-for="(item, index) in datas[i - 1]
                                .morningInterview"
                            :key="datas[i - 1].date + '_' + index"
                        >
                            <div>{{ item.time }}</div>
                            <div>{{ item.name }}</div>
                            <div>(</div>
                            <div>{{ item.order }}</div>
                            ,
                            <div>{{ item.modeName }}</div>
                            ,
                            <div>{{ item.jobName }}</div>
                            ,
                            <div>{{ item.interviewer }}</div>
                            <div>)</div>
                        </div>
                    </div>
                    <div class="scroll-box afternoon">
                        <div
                            :class="[
                                'data-item',
                                { 'break-promise': item.statusName == '爽约' }
                            ]"
                            v-for="(item, index) in datas[i - 1]
                                .afternoonInterview"
                            :key="datas[i - 1].date + '_' + index"
                        >
                            <div>{{ item.time }}</div>
                            <div>{{ item.name }}</div>
                            <div>(</div>
                            <div>{{ item.order }}</div>
                            ,
                            <div>{{ item.modeName }}</div>
                            ,
                            <div>{{ item.jobName }}</div>
                            ,
                            <div>{{ item.interviewer }}</div>
                            <div>)</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div
                    v-for="i of 7"
                    :class="{ weekend: i == 6 || i == 7 }"
                    :key="'middle_' + i"
                >
                    <div class="date">{{ datas[i - 1 + 7].date }}</div>
                    <div class="scroll-box morning">
                        <div
                            :class="[
                                'data-item',
                                { 'break-promise': item.statusName == '爽约' }
                            ]"
                            v-for="(item, index) in datas[i - 1 + 7]
                                .morningInterview"
                            :key="datas[i - 1 + 7].date + '_' + index"
                        >
                            <div>{{ item.time }}</div>
                            <div>{{ item.name }}</div>
                            <div>(</div>
                            <div>{{ item.order }}</div>
                            ,
                            <div>{{ item.modeName }}</div>
                            ,
                            <div>{{ item.jobName }}</div>
                            ,
                            <div>{{ item.interviewer }}</div>
                            <div>)</div>
                        </div>
                    </div>
                    <div class="scroll-box afternoon">
                        <div
                            :class="[
                                'data-item',
                                { 'break-promise': item.statusName == '爽约' }
                            ]"
                            v-for="(item, index) in datas[i - 1 + 7]
                                .afternoonInterview"
                            :key="datas[i - 1 + 7].date + '_' + index"
                        >
                            <div>{{ item.time }}</div>
                            <div>{{ item.name }}</div>
                            <div>(</div>
                            <div>{{ item.order }}</div>
                            ,
                            <div>{{ item.modeName }}</div>
                            ,
                            <div>{{ item.jobName }}</div>
                            ,
                            <div>{{ item.interviewer }}</div>
                            <div>)</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div
                    v-for="i of 7"
                    :class="{ weekend: i == 6 || i == 7 }"
                    :key="'bottom_' + i"
                >
                    <div class="date">{{ datas[i - 1 + 14].date }}</div>
                    <div class="scroll-box morning">
                        <div
                            :class="[
                                'data-item',
                                { 'break-promise': item.statusName == '爽约' }
                            ]"
                            v-for="(item, index) in datas[i - 1 + 14]
                                .morningInterview"
                            :key="datas[i - 1 + 14].date + '_' + index"
                        >
                            <div>{{ item.time }}</div>
                            <div>{{ item.name }}</div>
                            <div>(</div>
                            <div>{{ item.order }}</div>
                            ,
                            <div>{{ item.modeName }}</div>
                            ,
                            <div>{{ item.jobName }}</div>
                            ,
                            <div>{{ item.interviewer }}</div>
                            <div>)</div>
                        </div>
                    </div>
                    <div class="scroll-box afternoon">
                        <div
                            :class="[
                                'data-item',
                                { 'break-promise': item.statusName == '爽约' }
                            ]"
                            v-for="(item, index) in datas[i - 1 + 14]
                                .afternoonInterview"
                            :key="datas[i - 1 + 14].date + '_' + index"
                        >
                            <div>{{ item.time }}</div>
                            <div>{{ item.name }}</div>
                            <div>(</div>
                            <div>{{ item.order }}</div>
                            ,
                            <div>{{ item.modeName }}</div>
                            ,
                            <div>{{ item.jobName }}</div>
                            ,
                            <div>{{ item.interviewer }}</div>
                            <div>)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSchedule } from "../../../../apis/interview/schedule";
export default {
    data() {
        return {
            // 用户Id
            userId: "",
            // 开始时间
            beginDate: "",
            // 结束时间
            endDate: "",
            // 表头
            weekdays: ["周一", "周二", "周三", "周四", "周五"],
            weekend: ["周六", "周日"],
            // 面试日程内容
            datas: []
        };
    },
    created() {
        // this.$dayjs().weekday(1);
        let today = new Date();
        let todayDate = this.$dayjs(today).toISOString();
        let mondayDate = this.$dayjs(today).startOf("week").toISOString();
        let sundayDate = this.$dayjs(today).endOf("week").toISOString();

        if (mondayDate == todayDate) {
            this.beginDate = this.$dayjs(
                this.$dayjs(mondayDate).subtract(13, "days")
            ).toISOString();
            this.endDate = this.$dayjs(
                this.$dayjs(sundayDate).add(7, "days")
            ).toISOString();
        } else {
            this.beginDate = this.$dayjs(
                this.$dayjs(mondayDate).subtract(6, "days")
            ).toISOString();
            this.endDate = this.$dayjs(
                this.$dayjs(sundayDate).add(8, "days")
            ).toISOString();
        }
    },
    mounted() {
        const userInfo = this.$tools.getUserInfo();
        this.userId = userInfo.userId;
        this.searchData();
    },
    methods: {
        // 搜索
        async searchData() {
            const params = {
                userId: this.userId,
                beginDate: this.beginDate,
                endDate: this.endDate
            };
            const {
                data: { data, retCode, message }
            } = await getSchedule(params);
            if (retCode === 0) {
                this.datas = data.map((item) => {
                    let interview = item.interview;
                    item.morningInterview = interview.filter((item) => {
                        return item.time < "12:00" || item.time == null;
                    });
                    item.afternoonInterview = interview.filter((item) => {
                        return item.time > "12:00";
                    });
                    return item;
                });
            } else {
                this.$message.error(message);
            }
        },
        // 下一周
        nextWeek() {
            this.endDate = this.$dayjs(this.endDate)
                .add(7, "days")
                .toISOString();
            this.beginDate = this.$dayjs(this.beginDate)
                .add(7, "days")
                .toISOString();
            this.searchData();
        },
        // 上一周
        lastWeek() {
            this.endDate = this.$dayjs(this.endDate)
                .subtract(7, "days")
                .toISOString();
            this.beginDate = this.$dayjs(this.beginDate)
                .subtract(7, "days")
                .toISOString();
            this.searchData();
        }
    }
};
</script>

<style lang="less" scoped>
.schedule {
    height: 98%;
    width: 95vw;
    margin: 0 auto;
    text-align: center;
    .operate {
        width: 95%;
        margin: 10px auto;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        color: #999;
        span {
            cursor: pointer;
        }
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
                    background: #ffbe66;
                }
                .scroll-box {
                    height: calc((100% - 20px) / 2);
                    overflow: auto;
                    .data-item {
                        display: flex;
                        align-items: center;
                        margin: 10px;
                        &.break-promise {
                            color: #ff0000;
                        }
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
                    + .scroll-box {
                        border-top: 1px solid #999;
                    }
                    &.morning {
                        background: #97d9ff30;
                    }
                    &.afternoon {
                        background: #e0f97b30;
                    }
                }
            }
        }
        .weekend {
            width: 220px !important;
            flex: none !important;
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
