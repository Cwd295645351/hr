/*
 * @Description: 基础配置
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2020-12-17 23:02:31
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