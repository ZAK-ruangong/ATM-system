import { createWebHashHistory, createRouter } from "vue-router"

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			name: "Home",
			component: () => import("@/views/myLogin.vue")
		},
		{
			path:"/withdrawal",
			name:"Withdrawal",
			component: () => import("@/views/withdrawal/index.vue")
		},
		{
			path:"/deposit",
			name:"Deposit",
			component: () => import("@/views/deposit/index.vue")
		},
		{
			path:"/livingpayment",
			name:"Livingpayment",
			component: () => import("@/views/livingpayment/index.vue")
		},
	]
})

export default router
