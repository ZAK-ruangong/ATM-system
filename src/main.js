import { createApp } from "vue"
import App from "@/App.vue"
import pinia from "@/store"
import router from "@/router"
import "@/assets/css/common.scss"
import "virtual:uno.css"
import "element-plus/dist/index.css"
import axios from "axios"

// 组件库图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
// 组件库样式
import "element-plus/dist/index.css"
// i18n
import { i18n } from "./utils/i18n"

axios.defaults.baseURL = "http://1.116.150.155:8088/atm/"
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.use(i18n).use(router).use(pinia).mount("#app")
