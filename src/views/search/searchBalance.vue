<template>
	<div class="flex justify-around items-center">
		<div class="text-center">
			<div class="text-6 mb-10">
				<div>余额信息</div>
				<div>BALANCE INFORMATION</div>
			</div>
			<el-card body-class="w-100 h-80">
				<div class="flex flex-col gap-15 items-start">
					<div class="flex flex-col items-start">
						<span class="text-6">余额：</span>
						<span>Amount Balance</span>
					</div>
					<div class="flex flex-col items-start">
						<span class="text-6">可用余额：</span>
						<span>Available Amount Balance</span>
					</div>
					<div class="text-6">ATM当前可取现金额：10,000</div>
				</div>
			</el-card>
			<div class="color-gray mt-10">
				提示：如您无需办理其他业务，请取走银行卡
			</div>
		</div>
		<div class="flex flex-col gap-6">
			<el-button @click="router.push('/withdrawal')">{{
				$t("withdrawal")
			}}</el-button>
			<el-button @click="router.push('/transfer')">{{
				$t("transfer")
			}}</el-button>
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
	justify-content: space-between;
	align-items: center;
}
</style>
