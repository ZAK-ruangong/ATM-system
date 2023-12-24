<template>
	<div class="flex flex-col items-center mb-10">
		<h1>ATM系统</h1>
		<div class="flex justify-evenly items-start w-full">
			<span class="text-4">{{ $t("id") }}:12345678910</span>
			<span class="text-6">{{ $t("welcome") }}</span>
			<div class="flex flex-col justify-center items-center">
				<span>{{ day }} {{ time }}</span>
				<span v-show="cardId">卡号:{{ cardId }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import dayjs from "dayjs"
import { storeToRefs } from "pinia"
import useCardStore from "@/store/card.js"
const cardStore = useCardStore()

// 时间显示
const day = dayjs(new Date()).format("YYYY年MM月DD日")
const time = ref(dayjs(new Date()).format("HH:mm:ss"))
// 卡号
const { cardId } = storeToRefs(cardStore)

onMounted(() => {
	setInterval(() => {
		time.value = dayjs(new Date()).format("HH:mm:ss")
	}, 1000)
})
</script>

<style lang="scss" scoped></style>
