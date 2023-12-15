<template>
	<div class="flex justify-center items-center flex-col">
		<div class="flex justify-between items-center full">
			<span>终端编号:114514</span>
			<div class="text-6 mx-10 flex flex-col items-center">
				<span>欢迎您使用中国银行</span>
				<span>自动柜员机</span>
			</div>
			<div class="flex flex-col justify-center items-center">
				<span>{{ day }}</span>
				<span>{{ time }}</span>
			</div>
		</div>
		<div class="fw-600 text-6 my-4">请插入银行卡</div>
		<div>WELCOME TO</div>
		<div>USE BOC ATM SYSTEM</div>
		<div class="flex">
			PLEASE INSERT CARD
			<div class="flex flex-col absolute right-0 gap-10">
				<el-button type="info" @click="router.push('/passbook')"
					>存折取款</el-button
				>
				<el-button type="danger">吞卡/存款异常</el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { formatTime } from "@/utils/format.js"
const router = useRouter()

// 时间显示
const day = formatTime(new Date()).dayStr
const time = ref(formatTime(new Date()).timeStr)

onMounted(() => {
	setInterval(() => {
		time.value = formatTime(new Date()).timeStr
	}, 1000)
})
</script>

<style scoped></style>
