/*
 * @Description: 路由配置
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-25 22:42:21
 */
import Vue from "vue";
import VueRouter from "vue-router";
import * as tools from "../../utils/tools";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
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
		redirect: "/main/interview",
		component: () => import("../views/Main/Main.vue"),
		children: [
			{
				path: "interview", // 面试系统
				name: "Interview",
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
		name: "*",
		redirect: "/error"
	}
];

const router = new VueRouter({
	routes
});

// 不需要重定向页面name
const NOT_NEED_TOKEN_ROUTES = ["Login"];

router.beforeEach((to, from, next) => {
	if (NOT_NEED_TOKEN_ROUTES.indexOf(to.name) === -1 && !tools.getUserInfo()) {
		next({ path: "/login" });
	} else if (
		NOT_NEED_TOKEN_ROUTES.indexOf(to.name) !== -1 &&
		tools.getUserInfo() !== null
	) {
		sessionStorage.clear();
		next();
	} else {
		next();
	}
});

export default router;
