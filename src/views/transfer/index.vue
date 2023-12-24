<template>
	<div class="flex justify-around">
		<div class="flex flex-col items-center justify-around">
			<p class="text-6">
				请{{ isConfirmed ? "再次" : "" }}输入转账账号：
			</p>
			<el-input
				v-model="transCard"
				placeholder="请输入转账账号"
				:prefix-icon="User"
				class="h-10 w-60!"
				v-if="!isConfirmed"
			/>
			<el-input
				v-model="confirmAccount"
				placeholder="请再次输入转账账号"
				:prefix-icon="User"
				class="h-10 w-60!"
				v-else
			/>
			<p class="opacity-80 color-gray">友情提示：不要对陌生账号转账</p>
		</div>
		<div>
			<div class="flex flex-col gap-6">
				<el-button class="color-green!" @click="confirm">{{
					$t("confirm")
				}}</el-button>
				<el-button class="color-red!" @click="router.back()">{{
					$t("back")
				}}</el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { User } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

const router = useRouter()

// 转账账号
const transCard = ref("")
// 是否是二次输入
const isConfirmed = ref(false)
const confirmAccount = ref("")
const confirm = () => {
	if (!isConfirmed.value) {
		// 第一次输入
		isConfirmed.value = true
	} else {
		// 第二次输入
		if (confirmAccount.value !== transCard.value) {
			ElMessage.error({
				message: "两次输入账号不一致"
			})
			return
		} else {
			router.push(`/transfer/amount?transCard=${transCard.value}`)
		}
	}
}
</script>

<style lang="scss" scoped></style>
