<template>
	<!-- S1 -->
	<!-- <div v-show="stateNumber === 0" class="wd-box flex items-start w-full p-8! relative!">

        <div class="wd-left-sidebar flex flex-col items-end gap-8">
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
        </div>

        <div class="wd-content items-center flex flex-col w-full p-4 h-full!">
            <h1 class="mb-16! text-5! font-900! p-t-4! color-#333">请将现金放入存款槽</h1>
            <div class="text-3 text-center absolute! bottom-9">
                <p>本机只提供100元面额人民币</p>
                <p>且单笔体现最多不超过10000元</p>
            </div>
        </div>

        <div class="wd-right-sidebar flex flex-col items-end gap-8">
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-80">退卡</el-button>
            <el-button class="w-30! h-15! opacity-80 color-red! fw-700!"> 返回</el-button>
        </div>
    </div> -->

	<!-- S2 -->

	<div
	v-loading="loading"
    element-loading-text="存款中"
		v-show="stateNumber === 1"
		class="wd-box flex items-start w-full p-8! relative!"
	>
		<div class="wd-left-sidebar flex flex-col items-end gap-8">
			<el-button
				class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"
			></el-button>
			<el-button
				class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"
			></el-button>
			<el-button
				class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"
			></el-button>
			<el-button
				class="w-30! h-15! fw-700! opacity-80"
				@click="depositMoney"
				>放钞</el-button
			>
		</div>

		<div class="wd-content items-center flex flex-col w-full p-4 h-full!">
			<h1
				v-show="!isdeposit"
				class="mb-4! text-5! font-900! p-t-4! color-#333"
			>
				请将现金放入存款槽
			</h1>
			<h1
				v-show="isdeposit"
				class="mb-4! text-5! font-900! p-t-4! color-#333"
			>
				存款信息明细
			</h1>
			<el-table
				v-show="isdeposit"
				:data="depositData"
				stripe
				style="width: 24rem"
				class="max-w-2xl! mb-14! max-h-50"
			>
				<el-table-column prop="num" label="面值" />
				<el-table-column prop="counts" label="数目" />
				<el-table-column prop="account" label="交易金额" />
			</el-table>

			<div class="text-3 text-center absolute! bottom-9">
				<p>本机只提供100元面额人民币</p>
				<p>且单笔体现最多不超过10000元</p>
			</div>
		</div>

		<div class="wd-right-sidebar flex flex-col items-end gap-8">
			<el-button
				class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"
			></el-button>
			<el-button
				class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"
			></el-button>
			<el-button
				class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"
			></el-button>
			<el-button
				v-show="isdeposit"
				class="w-30! h-15! fw-700! opacity-80"
				@click="finishDeposit"
				>结束放钞</el-button
			>
			<el-button
				v-show="!isdeposit"
				class="color-red! w-30! h-15! fw-700! opacity-80"
				@click="router.back()"
				>返回</el-button
			>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios";
// import { Loading } from "@element-plus/icons-vue/dist/types";

const loading = ref(false);

const router = useRouter()
const isdeposit = ref(false)
const depositData = ref([])
const DEPOSIT_DATA = [
	{
		num: 100,
		counts: 20,
		account: 2000
	},
	{
		num: 100,
		counts: 14,
		account: 1400
	},
	{
		num: 100,
		counts: 18,
		account: 1800
	},
	{
		num: 100,
		counts: 20,
		account: 2000
	}
]
const stateNumber = ref(1)

let numCount = 0
const depositMoney = () => {
	LoadWait();
	axios({
		url: "/saveMoney", method: "post", params: {
			cardId: localStorage.getItem('cardId'),
			money: DEPOSIT_DATA[numCount].account
		}
	}).then(res => {
		console.log(res)
	})
	if (numCount === 0) isdeposit.value = true
	depositData.value.push(DEPOSIT_DATA[numCount])
	numCount++
}

const finishDeposit = () => {
	isdeposit.value = false
	numCount = 0
	depositData.value = []
}

const LoadWait = () => {
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
	},3000)
}
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

/* .wd-box {
	background-color: #c8e0e4 !important;
} */
</style>
