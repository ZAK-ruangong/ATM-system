<template>
	<div class="flex justify-center items-center relative">
		<div class="flex flex-col items-center justify-around">
			<p class="text-6">请输入您的密码：</p>
			<el-input
				v-model="password"
				placeholder="请输入您的密码"
				:prefix-icon="Lock"
				class="h-10 w-60!"
			/>
			<p class="opacity-80 color-gray">输入密码时，请注意遮挡</p>
		</div>
		<div class="flex flex-col gap-6 absolute right-0">
			<el-button class="color-green!" @click="login">{{
				$t("confirm")
			}}</el-button>
			<el-button class="color-red!" @click="router.back()">{{
				$t("back")
			}}</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Lock } from "@element-plus/icons-vue"

const router = useRouter()
// 登录
const password = ref("")
const login = () => {
	// const cardId = localStorage.getItem('cardId')
	// axios.post('http://1.116.150.155:8088/api/userLogin',{
	// 	cardId,
	// 	password:password.value
	// }).then(res=>{
	// 	if(res.data.code === 200){
	// 		router.push("/businessChoices")
	// 	}
	// })
}
</script>

<style lang="scss" scoped></style>
