<!--
 * @Author: 陈伟栋
 * @Date: 2020-11-15 17:23:40
 * @LastEditTime: 2020-11-16 23:17:24
 * @LastEditors: Please set LastEditors
 * @Description: 系统整体框架
 * @FilePath: \hr-manage\src\views\main\main.vue
-->
<template>
  <div class="main">
    <div class="top-bar">
      <div class="logo" @click="resetModule">HR管理系统</div>
      <div style="display: flex" v-if="current_module">
        <div
          v-for="(item, index) in modules"
          :key="index"
          :class="[{ active: current_module == item.title }, 'module']"
          @click="chooseModule(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <router-view v-if="current_module"></router-view>
    <div class="content" v-else>
      <div
        v-for="(item, index) in modules"
        :key="item + index"
        class="module-box"
        @click="chooseModule(item)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_module: "",
      modules: [
        {
          title: "面试系统",
          route: "/main/interview",
        },
        {
          title: "人员管理",
          route: "/main/user",
        },
        {
          title: "薪酬系统",
          route: "/main/salary",
        },
      ],
    };
  },
  created() {
    let module = sessionStorage.getItem("module");
    if (module) {
      this.current_module = module;
    }
  },
  methods: {
    // 选择子系统
    chooseModule(item) {
      this.current_module = item.title;
      sessionStorage.setItem("module", this.current_module);
      this.$router.push(item.route);
    },
    // 重新选择子系统
    resetModule() {
      sessionStorage.removeItem("module");
      sessionStorage.removeItem("menu");
      this.current_module = "";
      this.$router.push("/main");

    },
  },
};
</script>

<style lang='less' scoped>
.main {
  height: 100vh;
  width: 100vw;
  .top-bar {
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
    box-shadow: 0 8px 10px #f4f4f4;
    background: #00a1ff;
    .logo {
      font-size: 30px;
      color: #fff;
      font-weight: bold;
      height: 100%;
      width: 210px;
      line-height: 60px;
      padding: 0 20px;
      cursor: pointer;
    }
    .module {
      cursor: pointer;
      padding: 20px;
      font-weight: bold;
      font-size: 20px;
      color: #fff;
    }
    .active {
      color: #0000ff;
    }
  }
  .content {
    padding: 20px;
    display: flex;
    .module-box {
      width: 300px;
      height: 200px;
      font-size: 40px;
      border: 1px solid #EEF;
      letter-spacing: 10px;
      color: #606266;
      line-height: 200px;
      margin-right: 20px;
      box-shadow: 10px 10px 10px #eee;
      cursor: pointer;
    }
    .module-box:hover {
      color: #409EFF;
      transform: scale(1.01);
      border: 1px solid #409EFF;
    }
  }
}
</style>
