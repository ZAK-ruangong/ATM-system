<template>
	<div class="flex flex-col items-center mb-10 header-color">
		<h1>ATM系统</h1>
		<div class="flex justify-around items-center w-full">
			<span class="text-4">{{ $t("id") }}:114514</span>
			<span class="text-6 header-item-center">{{ $t("welcome") }}</span>
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

<style scoped>
.header-color {
	background-color: #F9F5EF !important;
	box-shadow: 0 2px 5px 0.5px rgba(0, 0, 0, 0.3);
	margin-bottom: 4rem;
}
.header-item-center {
	transform: translateX(25%);
	
}
</style>
