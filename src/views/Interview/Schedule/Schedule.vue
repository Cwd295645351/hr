<!--
 * @Author: 陈伟栋
 * @Date: 2020-11-15 21:00:54
 * @LastEditTime: 2020-11-27 00:22:19
 * @LastEditors: Please set LastEditors
 * @Description: 面试日程
 * @FilePath: \hr-manage\src\views\Interview\Schedule\Schedule.vue
-->
<template>
  <div class="schedule">
    <el-calendar v-model="date" style="height: 100%">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(1).join("-") }}
          <!-- {{ data.isSelected ? "✔️" : "" }} -->
        </p>
        <p
          v-show="data.type=='current-month'"
          :class="data.isSelected ? 'is-selected' : ''"
        >
          {{ datas[data.day.split("-").slice(2)] }}
        </p>
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
        30: "5235231",
      },
    };
  },
  methods: {},
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

