/*
 * @Description: 基础配置
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 22:11:58
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import echarts from "echarts";
import moment from "moment";

import "element-ui/lib/theme-chalk/index.css";
import "./../public/css/reset.less";

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;

router.beforeEach((to, from, next) => {
  console.log(to.path);
  debugger
	if (to.path == "/" || to.path == "/login" || to.path == "/error") {
		next();
	} else {
		const token = sessionStorage.getItem("token");
		if (token) {
			next();
		} else {
			next({
				path: "/login"
			});
		}
	}
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app");
