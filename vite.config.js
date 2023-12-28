import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import UnoCSS from "unocss/vite"
// 自动引入插件
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// electron
import electron from "vite-plugin-electron"
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		UnoCSS(),
		electron({
			// 入口文件
			entry: "electron/index.js"
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	}
})
