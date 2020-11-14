/*
 * @Author: 陈伟栋
 * @Date: 2020-11-14 00:10:00
 * @LastEditTime: 2020-11-15 00:43:13
 * @LastEditors: Please set LastEditors
 * @Description: 路由配置
 * @FilePath: \hr-manage\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("../views/Error/Error.vue"),
  },
  {
    path: "*",
    redirect: "/error"
  },
];

const router = new VueRouter({
  routes,
});

export default router;
