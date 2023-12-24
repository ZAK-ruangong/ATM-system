<template>
	<div class="flex justify-around">
		<div class="flex flex-col items-center justify-around">
			<p class="text-6">转入账号/Account：{{ route.query.transCard }}</p>
			<el-input
				v-model="money"
				placeholder="请输入转账金额"
				:prefix-icon="Money"
				class="h-10 w-60!"
			/>
			<p class="opacity-80 color-gray">友情提示：不要对陌生账号转账</p>
		</div>
		<div>
			<div class="flex flex-col gap-6">
				<el-button class="color-green!" @click="transfer">{{
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
import { useRouter, useRoute } from "vue-router"
import { Money } from "@element-plus/icons-vue"
import axios from "axios"
const route = useRoute()
const router = useRouter()
const money = ref("")
// 转账
const transfer = () => {
	axios({
		url: "/transferMoney",
		method: "post",
		params: {
			userCard: localStorage.getItem("cardId"),
			transCard: route.query.transCard,
			money: money.value
		}
	}).then((res) => {
		if (res.data.res === "success") {
			ElMessage.success("转账成功")
			router.push("/businessChoices")
		} else {
			ElMessage.error("转账失败")
		}
	})
}
</script>

<style lang="scss" scoped></style>
