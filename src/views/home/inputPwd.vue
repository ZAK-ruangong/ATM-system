<template>
	<div class="flex justify-center items-center relative">
		<div class="flex flex-col items-center justify-around">
			<p class="text-6">请输入您的密码：</p>
			<el-input
				v-model="password"
				placeholder="请输入您的密码"
				:prefix-icon="Lock"
				type="password"
				class="h-10 w-60!"
			/>
			<p class="opacity-80 color-gray">输入密码时，请注意遮挡</p>
		</div>
		<div class="flex flex-col gap-6 absolute right-0">
			<el-button class="color-green!" @click="handleLogin">{{
				$t("confirm")
			}}</el-button>
			<el-button class="color-red!" @click="router.push('/')">{{
				$t("back")
			}}</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Lock } from "@element-plus/icons-vue"
import axios from "axios"

import useCardStore from "@/store/card.js"
const { login } = useCardStore()

const router = useRouter()
// 登录
const password = ref("")
const handleLogin = async () => {
	login("6100700240001078666")

	const res = await axios({
		url: "/userLogin",
		params: {
			cardId:"6100700240001078666",
			password: password.value
		},
		method: "post"
	})
	if (res.data.res === "success") {
		ElMessage.success(res.data.meg)
		router.push("/businessChoices")
	} else {
		ElMessage.error(res.data.meg)
	}
	console.log(res.data)
}
</script>

<style lang="scss" scoped></style>
