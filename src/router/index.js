import { createWebHashHistory, createRouter } from "vue-router"
// 首页的路由
const homeRoutes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/home/card.vue")
	},
	{
		path: "/passbook",
		name: "存折取款",
		component: () => import("@/views/home/passbook.vue")
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

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/transfer",
			name: "转账",
			component: () => import("@/views/transfer/index.vue")
		},
		{
			path: "/changepwd",
			name: "改密",
			component: () => import("@/views/changepwd/index.vue")
		},
		...homeRoutes,
		...searchRoutes
	]
})

export default router
