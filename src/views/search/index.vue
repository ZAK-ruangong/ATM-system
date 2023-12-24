<template>
	<div class="main w-full">
		<div class="left">
			<el-button @click="router.push('/search/balance')"
				>余额查询</el-button
			>
			<el-button @click="router.push('/search/detail')"
				>明细查询</el-button
			>
		</div>
		<div class="right">
			<el-button class="color-green!" @click="router.back()">{{
				$t("back")
			}}</el-button>
			<el-button class="color-red!">{{ $t("exit") }}</el-button>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	justify-content: space-around;
	align-items: center;

	& > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 40px;
	}
}
</style>
