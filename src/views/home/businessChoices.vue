<template>
	<div class="flex justify-around">
		<div class="flex flex-col gap-6">
			<el-button @click="router.push('/search')">{{
				$t("search")
			}}</el-button>
			<el-button @click="router.push('/transfer')">{{
				$t("transfer")
			}}</el-button>
			<el-button @click="router.push('/changePwd')">{{
				$t("changePwd")
			}}</el-button>
		</div>
		<div class="flex flex-col gap-6">
			<el-button @click="router.push('/withdrawal')">{{
				$t("withdrawal")
			}}</el-button>
			<el-button @click="router.push('/deposit')">{{
				$t("deposit")
			}}</el-button>
			<el-button @click="router.push('/livingpayment')">{{
				$t("pay")
			}}</el-button>
			<el-button class="color-red!" @click="logOut">{{
				$t("exit")
			}}</el-button>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router"
import useCardStore from "@/store/card.js"

const { logout } = useCardStore()
const router = useRouter()
<<<<<<< HEAD
const logOut = () => {
	logout()
=======
const logout = () => {
	localStorage.removeItem('cardId')
>>>>>>> 8d8daf8baa4f19d4984928698816095a7466e8f9
	router.push("/")
}
</script>

<style lang="scss" scoped></style>
