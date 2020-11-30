<!--
 * @Author: 陈伟栋
 * @Date: 2020-11-15 21:00:54
 * @LastEditTime: 2020-11-30 23:42:39
 * @LastEditors: Chen Weidong
 * @Description: 面试日程
 * @FilePath: \hr-manage\src\views\Interview\Schedule\Schedule.vue
-->
<template>
    <div class="schedule">
        <el-calendar
            v-model="date"
            :first-day-of-week="7"
            style="height: 100%"
            v-loading="loading"
        >
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{ date, data }">
                <div style="height: 100%" @click="calendarOnClick(data)">
                    <p :class="data.isSelected ? 'is-selected' : ''">
                        {{ data.day.split("-").slice(1).join("-") }}
                        <!-- {{ data.isSelected ? "✔️" : "" }} -->
                    </p>
                    <p
                        v-show="data.type == 'current-month'"
                        :class="data.isSelected ? 'is-selected' : ''"
                    >
                        {{ datas[data.day.split("-").slice(2)] }}
                    </p>
                </div>
            </template>
        </el-calendar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: "",
            beginDate: "",
            endDate: "",
            loading: false,
            datas: {
                "01": "1",
                "02": "11",
                "03": "13",
                "04": "14",
                "05": "15",
                "06": "16",
                "07": "17",
                "08": "18",
                "09": "19",
                10: "100",
                11: "121",
                12: "122",
                13: "123",
                14: "124",
                15: "125",
                16: "126",
                17: "127",
                18: "128",
                19: "129",
                20: "130",
                21: "131",
                22: "132",
                23: "133",
                24: "145",
                25: "1523",
                26: "1532",
                27: "1532",
                28: "1532",
                29: "1523",
                30: "5235231"
            }
        };
    },
    created() {
        this.$nextTick(() => {
            // 点击前一个月
            let prevBtn = document.querySelector(
                ".el-calendar__button-group .el-button-group>button:nth-child(1)"
            );
            prevBtn.addEventListener("click", (e) => {
                console.log(
                    "当前星期:",
                    this.$moment(
                        this.$moment(this.date).startOf("week")
                    ).format("YYYY-MM-DD"),
                    this.$moment(this.$moment(this.date).endOf("week")).format(
                        "YYYY-MM-DD"
                    )
                );
                console.log(this.date);
                // this.$notify({
                //     title: "上一月",
                //     message: "上个月头天：" + this.value,
                //     type: "success",
                //     position: "top-left"
                // });
            });

            //点击下一个月
            let nextBtn = document.querySelector(
                ".el-calendar__button-group .el-button-group>button:nth-child(3)"
            );
            nextBtn.addEventListener("click", () => {
                console.log(this.date);
                console.log(
                    "当前星期:",
                    this.$moment(
                        this.$moment(this.date).startOf("week")
                    ).format("YYYY-MM-DD"),
                    this.$moment(this.$moment(this.date).endOf("week")).format(
                        "YYYY-MM-DD"
                    )
                );
                /* this.$notify({
                    title: "下一月",
                    message: "下个月头天：" + this.value,
                    type: "warning",
                    position: "top-left"
                }); */
            });

            //点击今天
            let todayBtn = document.querySelector(
                ".el-calendar__button-group .el-button-group>button:nth-child(2)"
            );
            todayBtn.addEventListener("click", () => {
                console.log(this.date);
                console.log(
                    "当前星期:",
                    this.$moment(
                        this.$moment(this.date).startOf("week")
                    ).format("YYYY-MM-DD"),
                    this.$moment(this.$moment(this.date).endOf("week")).format(
                        "YYYY-MM-DD"
                    )
                );
                /* this.$notify.info({
                    title: "今天",
                    message: "今天：" + this.value,
                    position: "top-left"
                }); */
            });
        });
    },
    mounted() {
        this.searchData();
        this.findDate(new Date());
    },
    methods: {
        searchData() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        findDate(date) {
            let lastDateOfMonth = this.$moment(
                this.$moment(date).endOf("month")
            ).format("YYYY-MM-DD");
            let firstDateOfMonth = this.$moment(
                this.$moment(date).startOf("month")
            ).format("YYYY-MM-DD");
            let firstOfWeek = this.$moment(
                this.$moment(firstDateOfMonth).startOf("week")
            ).format("YYYY-MM-DD");
            let lastOfWeek = this.$moment(
                this.$moment(lastDateOfMonth).endOf("week")
            ).format("YYYY-MM-DD");
            console.log(
                "lastDateOfMonth:",
                lastDateOfMonth,
                "firstDateOfMonth:",
                firstDateOfMonth,
                "firstOfWeek:",
                firstOfWeek,
                "lastOfWeek:",
                lastOfWeek
            );
        },
        //点击日期块
        calendarOnClick(e) {
            console.log(e.day);
            // this.isArrange.push("2020-06-19");
            // this.$notify.error({
            //     title: "日历块点击",
            //     message: e,
            //     position: "top-left"
            // });
        }
    }
};
</script>

<style lang='less' scoped>
.schedule {
    height: 100%;
}
.is-selected {
    color: #1989fa;
}
</style>

