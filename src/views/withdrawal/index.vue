<template>
	<!-- P1 -->
	<div v-loading="loading" element-loading-text="取款中..." v-if="stateNumber === 0"
		class="wd-box flex items-start w-full p-8!">
		<div class="wd-left-sidebar flex flex-col items-end gap-8">
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="wdInputValue(100)">100</el-button>
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="wdInputValue(200)">200</el-button>
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="wdInputValue(500)">500</el-button>
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="wdInputValue(1000)">1000</el-button>
		</div>

		<div class="wd-content items-center flex flex-col w-full p-4 h-full!">
			<h1 class="mb-16! text-5! font-900! p-t-4! color-#333">
				请选择或输入取款金额
			</h1>
			<input ref="inputInsert" type="number" v-model.number="wdInput" class="p-1.5! w-80% max-w-2xl opacity-80 mb-40!"
				:readonly="isReadonly" />
			<div class="text-3 text-center">
				<p>本机只提供100元面额人民币</p>
				<!-- <p>且单笔体现最多不超过10000元</p> -->
			</div>
		</div>

		<div class="wd-right-sidebar flex flex-col items-end gap-8">
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="wdInputValue(2000)">2000</el-button>
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="isReadonly = false; inputInsert.focus()">输入金额</el-button>
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="getCash">取款</el-button>
			<el-button class="w-30! h-15! opacity-80 color-red! fw-700!" @click="router.back()">
				返回</el-button>
		</div>
	</div>
	<!-- P2 SUCCESSFUL -->
	<div v-else-if="stateNumber !== 0" class="wd-box flex items-start w-full p-8! relative!">
		<div class="wd-left-sidebar flex flex-col items-end gap-8">
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<!-- <el-button class="w-30! h-15! fw-700! opacity-80"
				>打印凭条</el-button
			> -->
		</div>

		<div class="wd-content items-center flex flex-col w-full p-4 h-full!">
			<h1 class="mb-16! text-5! font-900! p-t-4! color-#333">
				{{ stateInfo }}
			</h1>
			<div class="flex">
				<div class="flex flex-col items-center">
					<img :src="slotPic" class="w-70!" />
					<div class="w-full text-center card h-50">
						<img :src="moneyPic" class="w-50" />
					</div>
				</div>
			</div>
			<!-- <div class="text-3 text-center absolute! bottom-9">
				<p>本机只提供100元面额人民币</p>
				<p>且单笔体现最多不超过10000元</p>
			</div> -->
		</div>

		<div class="wd-right-sidebar flex flex-col items-end gap-8">
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<!-- <el-button class="w-30! h-15! fw-700! opacity-80">退卡</el-button> -->
			<el-button class="w-30! h-15! opacity-80 color-red! fw-700!" @click="stateNumber = 0">
				返回</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import axios from "axios"

// import axios from 'axios';

const router = useRouter()

const inputInsert = ref(null)
// 图片
const slotPic = ref("")
const moneyPic = ref("")
// 状态信息
const stateInfo = computed(() => {
	if (stateNumber.value === 1) {
		return "取款成功，请在出钞口提取现金"
	} else {
		return "余额不足，取款失败"
	}
})
// 状态编号
const stateNumber = ref(0)
// 金额输入
const wdInput = ref(null)
const isReadonly = ref(true)
// 修改金额
const wdInputValue = (money) => {
	wdInput.value = money
	isReadonly.value = true
}

// 是否自定义金额

// 返回
// const backPage = () => {
//     router.push('/businessChoices')
// }

// 取款
const getCash = () => {
	if (wdInput.value % 100) {
		alertMessage("请注意下方提示♥")
	} else if (wdInput.value === 0 || wdInput.value === "" || wdInput.value === null) {
		alertMessage("请您最少取100元♥")
	} else {
		// stateNumber.value = 1
		// console.log(wdInput.value)
		axios({
			url: "/getWithdrawal", method: "post", params: {
				cardId: localStorage.getItem('cardId'),
				money: wdInput.value
			}
		}).then(res => {
			loading.value = true
			setTimeout(() => {
				loading.value = false
				if (res.data.res === 'success') {
					stateNumber.value = 1
					slotPic.value = new URL("../../assets/img/slot.png", import.meta.url)
					moneyPic.value = new URL("../../assets/img/rmb.png", import.meta.url)
				} else {
					stateNumber.value = 2
				}

			}, 3000)


		})
	}
	wdInput.value = null
}

// 弹窗
const alertMessage = (textMessage) => {
	ElMessage({
		message: textMessage,
		type: "error"
	})
}

// 加载
const loading = ref(false)
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

/* .wd-box {
	background-color: #c8e0e4 !important;
} */
.card {
	overflow-y: hidden;
	transform: translateY(-12%);

	img {
		animation: move 2s ease-out infinite backwards;
		border-radius: 20px;
	}

	@keyframes move {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(100%);
		}
	}
}
</style>
