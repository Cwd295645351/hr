/*
 * @Author: 陈伟栋
 * @Date: 2020-11-14 00:10:00
 * @LastEditTime: 2020-11-15 22:47:57
 * @LastEditors: Please set LastEditors
 * @Description: 路由配置
 * @FilePath: \hr-manage\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login", // 登录页
    name: "Login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/main", // 主页面
    name: "Main",
    component: () => import("../views/Main/Main.vue"),
    children: [{
      path: "interview", // 面试系统
      component: () => import("../views/Interview/Interview.vue"),
    }, {
      path: "user",
      name: "User",
      component: () => import("../views/User/User.vue")
    }, {
      path: "salary",
      name: "Salary",
      component: () => import("../views/Salary/Salary.vue")
    }]
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