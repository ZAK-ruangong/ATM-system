<template>
	<div class="flex justify-around">
		<div class="flex flex-col items-center justify-around">
			<p class="text-6">转入账号/Account：{{ route.query.to_account }}</p>
			<el-input
				v-model="account"
				placeholder="请输入转账金额"
				:prefix-icon="Money"
				class="h-10 w-60!"
				v-if="!isConfirmed"
			/>
			<p class="opacity-80 color-gray">友情提示：不要对陌生账号转账</p>
		</div>
		<div>
			<div class="flex flex-col gap-6">
				<el-button class="color-green!">{{ $t("confirm") }}</el-button>
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
const route = useRoute()
const router = useRouter()
const account = ref("")
</script>

<style lang="scss" scoped></style>
