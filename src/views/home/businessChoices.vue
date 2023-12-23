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
			<el-button class="color-red!" @click="logout">{{
				$t("exit")
			}}</el-button>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const logout = () => {
	router.push("/")
}
</script>

<style lang="scss" scoped></style>
