<!--
 * @Author: 陈伟栋
 * @Date: 2020-11-15 20:36:38
 * @LastEditTime: 2020-11-24 22:26:29
 * @LastEditors: Please set LastEditors
 * @Description: 面试系统
 * @FilePath: \hr-manage\src\views\Interview\Interview.vue
-->
<template>
  <div class="interview">
    <div class="aside">
      <el-menu @select="chooseMenu" :collapse="true" background-color="#545c64" :default-active="activeMenu">
        <el-menu-item
          v-for="(item, index) in menus"
          :key="index"
          :index="item.route"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <Situation v-show="activeMenu == 'situation'"></Situation>
      <Statistics v-show="activeMenu == 'statistics'"></Statistics>
      <Schedule v-show="activeMenu == 'schedule'"></Schedule>
    </div>
  </div>
</template>

<script>
import Situation from "./Situation/Situation";
import Statistics from "./Statistics/Statistics";
import Schedule from "./Schedule/Schedule";
export default {
  components: { Situation, Statistics, Schedule },
  data() {
    return {
      // 当前菜单
      activeMenu: "",
      // 所有菜单
      menus: [
        {
          title: "面试情况",
          route: "situation",
          icon: "el-icon-document",
        },
        {
          title: "统计信息",
          route: "statistics",
          icon: "el-icon-pie-chart",
        },
        {
          title: "面试日程",
          route: "schedule",
          icon: "el-icon-date",
        },
      ],
    };
  },
  created() {
    let menu = sessionStorage.getItem("menu");
    this.activeMenu = menu ? menu : "situation";
  },
  watch: {
    activeMenu(newValue) {
      sessionStorage.setItem("menu", this.activeMenu);
    },
  },
  methods: {
    // 选择菜单
    chooseMenu(index) {
      this.activeMenu = index;
    },
  },
};
</script>

<style lang='less' scoped>
.interview {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  .aside {
    .el-menu {
      height: 100%;
      width: 65px;
      .el-menu-item {
        font-size: 16px;
      }
    }
  }
  .main {
    width: calc(100% - 65px);
    height: 100%;
  }
}
</style>
