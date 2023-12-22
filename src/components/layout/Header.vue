<template>
	<div class="flex flex-col items-center mb-10">
		<h1>ATM系统</h1>
		<div class="flex justify-around items-center w-full">
			<span class="text-4">终端编号:114514</span>
			<span class="text-6">欢迎您使用xx银行ATM机</span>
			<div class="flex flex-col justify-center items-center">
				<span>{{ day }}</span>
				<span>{{ time }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import dayjs from "dayjs"
// 时间显示
const day = dayjs(new Date()).format("YYYY年MM月DD日")
const time = ref(dayjs(new Date()).format("HH:mm:ss"))

onMounted(() => {
	setInterval(() => {
		time.value = dayjs(new Date()).format("HH:mm:ss")
	}, 1000)
})
</script>

<style lang="scss" scoped></style>
