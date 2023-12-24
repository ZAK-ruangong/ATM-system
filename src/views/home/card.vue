<template>
	<div class="flex items-center flex-col" v-if="!isPassbook">
		<div class="fw-600 text-6 my-4">{{ $t("pleasePutCard") }}</div>
		<div class="flex">
			<div class="flex flex-col items-center">
				<img :src="slotPic" class="w-70!" />
				<div class="w-full text-center card h-100">
					<img :src="cardPic" class="w-50" />
				</div>
			</div>
		</div>
		<div class="flex flex-col absolute right-0 gap-10">
			<el-button @click="isPassbook = true">{{
				$t("passbook")
			}}</el-button>
			<el-button @click="changeLanguage">{{
				$t("changeLanguage")
			}}</el-button>
			<el-button @click="put">{{ $t("putCard") }}</el-button>
		</div>
	</div>
	<div class="flex justify-center items-center flex-col" v-else>
		<div class="fw-600 text-6 my-4">{{ $t("pleasePutPassBook") }}</div>
		<div class="flex flex-col absolute right-0 gap-10 mt-10">
			<el-button @click="put">{{ $t("putPassBook") }}</el-button>
			<el-button @click="isPassbook = false">{{ $t("back") }}</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { i18n } from "@/utils/i18n"
import { useRouter } from "vue-router"

const router = useRouter()

const slotPic = ref("")
const cardPic = ref("")

// 存折还是银行卡
const isPassbook = ref(false)
// 切换语言
const changeLanguage = () => {
	i18n.global.locale = i18n.global.locale === "zh-CN" ? "en" : "zh-CN"
}
// 插卡
const put = () => {
	localStorage.setItem("cardId", "6100700240001078666")
	router.push("/inputPwd")
}
onMounted(() => {
	slotPic.value = new URL("../../assets/img/slot.png", import.meta.url)
	cardPic.value = new URL("../../assets/img/card.png", import.meta.url)
})
</script>

<style lang="scss" scoped>
.card {
	overflow-y: hidden;
	transform: translateY(-12%);

	img {
		animation: move 1s ease-in-out infinite alternate forwards;
		border-radius: 20px;
	}

	@keyframes move {
		0% {
			transform: translateY(-12%);
		}

		50%,
		100% {
			transform: translateY(5%);
		}
	}
}
</style>
