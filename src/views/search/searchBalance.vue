<template>
	<div class="flex justify-around items-center">
		<div class="text-center">
			<div class="text-6 mb-10">
				<div>余额信息</div>
				<!-- <div>BALANCE INFORMATION</div> -->
			</div>
			<el-card body-class="w-100 h-60">
				<div class="flex flex-col gap-15 items-start">
					<div class="flex flex-col items-start">
						<span class="text-6">余额：{{ balance }}</span>
						<span>Amount Balance</span>
					</div>
					<div class="flex flex-col items-start">
						<span class="text-6"
							>可用余额：{{ savingType ? 0 : balance }}</span
						>
						<span>Available Amount Balance</span>
					</div>
					<!-- <div class="text-6">ATM当前可取现金额：10,000</div> -->
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
			<el-button class="color-red!" @click="logOut">{{
				$t("exit")
			}}</el-button>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import useCardStore from "@/store/card.js"

const { logout } = useCardStore()

const router = useRouter()
// 余额
const balance = ref(0)
// 是否定期
const savingType = ref(false)
// 退卡
const logOut = () => {
	logout()
	router.push("/")
}
onMounted(() => {
	axios({
		url: "/getMoney",
		method: "post",
		params: {
			cardId: localStorage.getItem("cardId")
		}
	}).then((res) => {
		if (res.data.res === "success") {
			balance.value = res.data.object.money
			savingType.value = res.data.object.savingType
		} else {
			ElMessage.error(res.data.meg)
		}
	})
})
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
