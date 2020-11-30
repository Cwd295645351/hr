/*
 * @Author: Chenweidong
 * @Date: 2020-11-14 00:10:00
 * @LastEditTime: 2020-11-30 22:11:22
 * @LastEditors: Chen Weidong
 * @Description: 基础配置
 * @FilePath: \hr-manage\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import echarts from 'echarts';
import moment from 'moment';

import 'element-ui/lib/theme-chalk/index.css';
import './../public/css/reset.less';

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')