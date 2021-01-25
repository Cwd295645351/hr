/*
 * @Description: 基础配置
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-25 21:41:52
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import echarts from "echarts";
import dayjs from "dayjs";

import "element-ui/lib/theme-chalk/index.css";
import "./../public/css/reset.less";

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.$dayjs = dayjs;

import * as tools from "../utils/tools";
Vue.prototype.$tools = {
	...tools
};

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app");
