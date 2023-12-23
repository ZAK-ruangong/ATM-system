import { createWebHashHistory, createRouter } from "vue-router"
// 首页的路由
const homeRoutes = [
	{
		path: "/",
		name: "首页",
		component: () => import("@/views/home/card.vue")
	},
	{
		path: "/businessChoices",
		name: "业务选择",
		component: () => import("@/views/home/businessChoices.vue")
	},
	{
		path: "/inputPwd",
		name: "输入密码",
		component: () => import("@/views/home/inputPwd.vue")
	}
]
// 搜索页面的路由
const searchRoutes = [
	{
		path: "/search",
		name: "查询",
		component: () => import("@/views/search/index.vue")
	},
	{
		path: "/search/balance",
		name: "余额查询",
		component: () => import("@/views/search/searchBalance.vue")
	},
	{
		path: "/search/detail",
		name: "明细查询",
		component: () => import("@/views/search/searchDetail.vue")
	}
]

// 涉及转账的路由
const depositRoutes = [
	{
		path: "/transfer",
		name: "转账",
		component: () => import("@/views/transfer/index.vue")
	},
	{
		path: "/transfer/amount",
		name: "转账金额",
		component: () => import("@/views/transfer/amount.vue")
	}
]

// 存取款/缴费路由
const payRoutes = [
	{
		path: "/withdrawal",
		name: "Withdrawal",
		component: () => import("@/views/withdrawal/index.vue")
	},
	{
		path: "/deposit",
		name: "Deposit",
		component: () => import("@/views/deposit/index.vue")
	},
	{
		path: "/livingpayment",
		name: "Livingpayment",
		component: () => import("@/views/livingpayment/index.vue")
	}
]
const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/changePwd",
			name: "改密",
			component: () => import("@/views/changePwd/index.vue")
		},
		...homeRoutes,
		...searchRoutes,
		...depositRoutes,
		...payRoutes
	]
})

export default router
