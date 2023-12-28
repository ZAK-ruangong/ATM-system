<template>
	<div class="flex flex-col items-center mb-10 header-color relative">
		<a href="https://github.com/orgs/ZAK-ruangong/repositories" target="_blank" class="logo">
			<div class="logo">
				<img src="../../assets/img/github.svg" class="w-10 h-10 rd-50% front">
				<img src="../../assets/img/logo.jpg" class="w-10 h-10 rd-50% back">
			</div>
		</a>
		<h1>ATM系统</h1>
		<img src="../../assets/img/yinlian.png" alt="" class="absolute right-0 top-0">
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

<style lang="scss" scoped>
.header-color {
	background-color: #F9F5EF !important;
	box-shadow: 0 2px 5px 0.5px rgba(0, 0, 0, 0.3);
	margin-bottom: 4rem;
}

.header-item-center {
	transform: translateX(8%);
}



.logo {
	transform-style: preserve-3d;
	perspective: 1000px;
	position: absolute;
	left: 0;
	top: 0;

	.front,
	.back {
		position: absolute;
		backface-visibility: hidden;
	}

	.front {
		transition: all 1s ease-in-out;
	}

	.back {
		transform: rotateY(180deg);
		transition: all 1s ease-in-out;
	}

	&:hover {
		.front {
			transform: rotateY(180deg);
		}

		.back {
			transform: rotateY(360deg);
		}
	}
}
</style>
