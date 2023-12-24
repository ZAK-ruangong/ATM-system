/* eslint-disable indent */
import axios from "axios"
import { ElLoading, ElMessage } from "element-plus"

const BASE_URL = "http://1.116.150.155:8088/api"

const TIME_OUT = 10000

// loading实例
let loadingInstance = null
// pending的请求数
let requestNum = 0

// 全局loading
const addLoading = () => {
	// 增加loading，如果pending的请求数为1，弹出loading
	requestNum++
	if (requestNum === 1) {
		// eslint-disable-next-line no-undef
		loadingInstance = ElLoading.service({
			text: "拼命加载中...",
			fullscreen: true,
			background: "rgba(122, 122, 122, 0.2)"
		})
	}
}

const removeLoading = () => {
	// 移除loading，如果pending的请求数为0，移除loading
	requestNum--
	if (requestNum === 0) {
		console.log("移除loading")
		loadingInstance?.close()
	}
}

const service = (config) => {
	const instance = axios.create({
		baseURL: BASE_URL,
		timeout: TIME_OUT,
		// 跨域相关选项
		withCredentials: true,
		...config
	})
	// 请求拦截器
	instance.interceptors.request.use(
		(config) => {
			// 请求之前做什么
			const { loading = true } = config
			if (loading) {
				addLoading()
			}
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)
	// 响应拦截器
	instance.interceptors.response.use(
		(res) => {
			// 对响应数据做什么
			const { loading = true } = res.config
			if (loading) {
				removeLoading()
			}
			const { code, data, message } = res.data
			if (code === 200) {
				// 响应正确
				return data
			} else if (code === 401) {
				// 未登录
				console.log("未登录，跳转登录")
			} else {
				// 错误
				// eslint-disable-next-line no-undef
				ElMessage.error(message)
				return Promise.reject(message)
			}
		},
		(error) => {
			const { loading = true } = error.config
			if (loading) {
				removeLoading()
			}
			let message = ""
			if (error.response) {
				switch (error.response.status) {
					case 302:
						message = "接口重定向了！"
						break
					case 400:
						message = "参数不正确！"
						break
					case 401:
						message = "您未登录，或者登录已经超时，请先登录！"
						break
					case 403:
						message = "您没有权限操作！"
						break
					case 404:
						message = `请求地址出错: ${error.response.config.url}`
						break
					case 408:
						message = "请求超时！"
						break
					case 409:
						message = "系统已存在相同数据！"
						break
					case 500:
						message = "服务器内部错误！"
						break
					case 501:
						message = "服务未实现！"
						break
					case 502:
						message = "网关错误！"
						break
					case 503:
						message = "服务不可用！"
						break
					case 504:
						message = "服务暂时无法访问，请稍后再试！"
						break
					case 505:
						message = "HTTP 版本不受支持！"
						break
					default:
						message = "异常问题，请联系管理员！"
						break
				}
			}
			// ElMessage.error(error?.response?.data?.message || "未知错误");
			// eslint-disable-next-line no-undef
			ElMessage.error(
				error?.response?.data?.message || message || "未知错误"
			)
			return Promise.reject(error)
		}
	)

	return instance
}

// post方法封装
export const post = (url, params) => {
	return service({
		method: "post",
		url,
		params
	})
		.then((response) => {
			// 处理请求成功时的数据
			return response
		})
		.catch((error) => {
			// 处理请求失败时的错误
			return Promise.reject(error)
		})
}

export default service()
