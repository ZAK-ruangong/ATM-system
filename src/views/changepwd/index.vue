<template>
	<div class="flex justify-around">
		<div
			class="flex flex-col items-center justify-around"
			v-if="type === 'old'"
		>
			<p class="text-6">请输入您的旧密码：</p>
			<el-input
				v-model="oldPwd"
				placeholder="请输入您的旧密码"
				:prefix-icon="Lock"
				type="password"
				class="h-10 w-60!"
			/>
			<p class="opacity-80 color-gray">输入密码时，请注意遮挡</p>
		</div>
		<div
			class="flex flex-col items-center justify-around"
			v-else-if="type === 'new'"
		>
			<p class="text-6">
				请{{ isConfirmed ? "再次" : "" }}输入您的新密码：
			</p>
			<el-input
				v-model="newPwd"
				placeholder="请输入您的新密码"
				:prefix-icon="Lock"
				type="password"
				class="h-10 w-60!"
				v-if="!isConfirmed"
			/>
			<el-input
				v-model="confirmPwd"
				placeholder="请再次输入新密码"
				:prefix-icon="Lock"
				type="password"
				class="h-10 w-60!"
				v-else
			/>
			<p class="opacity-80 color-gray">输入密码时，请注意遮挡</p>
		</div>
		<div class="flex flex-col gap-20">
			<el-button
				class="color-green!"
				@click="confirmOld"
				v-if="type === 'old'"
				>{{ $t("confirm") }}</el-button
			>
			<el-button
				class="color-green!"
				@click="confirmNew"
				v-if="type === 'new'"
				>{{ $t("confirm") }}</el-button
			>
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
import { ElMessage } from "element-plus"
import axios from "axios"

const router = useRouter()

// 输入密码种类
const type = ref("old")
// 校验旧密码
const oldPwd = ref("")
const confirmOld = () => {
	axios({
		url: "/checkPassword",
		method: "post",
		params: {
			cardId: localStorage.getItem("cardId"),
			password: oldPwd.value
		}
	}).then((res) => {
		if (res.data.res === "success") {
			ElMessage.success({
				message: res.data.meg
			})
			type.value = "new"
		} else {
			ElMessage.error({
				message: res.data.meg
			})
		}
	})
}
// 新密码
const newPwd = ref("")
// 是否是二次输入
const isConfirmed = ref(false)
const confirmPwd = ref("")
const confirmNew = () => {
	if (!isConfirmed.value) {
		// 第一次输入
		isConfirmed.value = true
	} else {
		// 第二次输入
		if (confirmPwd.value !== newPwd.value) {
			ElMessage.error({
				message: "两次输入密码不一致"
			})
			return
		} else {
			axios({
				url: "/updatePassword",
				method: "post",
				params: {
					cardId: localStorage.getItem("cardId"),
					password: newPwd.value
				}
			}).then((res) => {
				if (res.data.res === "success") {
					ElMessage.success({
						message: "修改密码成功"
					})
					setTimeout(() => {
						router.push("/")
					}, 2000)
				} else {
					ElMessage.error({
						message: "修改密码失败"
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
