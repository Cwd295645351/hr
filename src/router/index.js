/*
 * @Description: 路由配置
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 22:16:48
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/login"
	},
	{
		path: "/login", // 登录页
		name: "Login",
		component: () => import("../views/Login/Login.vue")
	},
	{
		path: "/main", // 主页面
		name: "Main",
		component: () => import("../views/Main/Main.vue"),
		children: [
			{
				path: "interview", // 面试系统
				component: () => import("../views/Interview/Interview.vue")
			},
			{
				path: "user",
				name: "User",
				component: () => import("../views/User/User.vue")
			},
			{
				path: "salary",
				name: "Salary",
				component: () => import("../views/Salary/Salary.vue")
			}
		]
	},
	{
		path: "/error",
		name: "Error",
		component: () => import("../views/Error/Error.vue")
	},
	{
		path: "*",
		redirect: "/error"
	}
];

const router = new VueRouter({
	routes
});

export default router;
