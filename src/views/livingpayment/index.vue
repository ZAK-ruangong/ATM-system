
<template>
	<!-- P1 -->
	<div v-show="stateNumber === 0" class="wd-box flex items-start w-full p-8! relative!">
		<div class="wd-left-sidebar flex flex-col items-end gap-8">
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="stateNumber = 1; getPaymentData(0)">话费充值</el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
		</div>

		<div class="wd-content items-center flex flex-col w-full p-4 h-full!">
			<h1 class="mb-4! text-5! font-900! p-t-4! color-#333">
				请选择服务项目
			</h1>

			<div class="text-3 text-center absolute! bottom-9">
				<p>本机只提供100元面额人民币</p>
				<!-- <p>且单笔体现最多不超过10000元</p> -->
			</div>
		</div>

		<div class="wd-right-sidebar flex flex-col items-end gap-8">
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="stateNumber = 2; getPaymentData(1)">水电费</el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-80 color-red!" @click="router.back()">返回</el-button>
		</div>
	</div>

	<!-- P2 -->
	<div v-loading="loading" element-loading-text="缴费中..." v-show="stateNumber === 1 || stateNumber === 2"
		class="wd-box flex items-start w-full p-8! relative!">
		<div class="wd-left-sidebar flex flex-col items-end gap-8">
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button @click="payMoney" class="w-30! h-15! fw-700! opacity-80">缴费</el-button>
		</div>

		<div class="wd-content items-center flex flex-col w-full p-4 h-full!">
			<h1 class="mb-4! text-5! font-900! p-t-4! color-#333">
				您的{{ paymentType }}账号 : {{ paymentData.livingId }}<br>
				您的缴费状态为 : {{ paymentData.status }}<br>
				您的缴费金额为 : {{ paymentData.pay }}
			</h1>
			<h1 class="mb-8! text-5! font-900! p-t-4! color-#333">

			</h1>

			<!-- <input
				type="number"
				v-model.number="accountInput"
				class="p-1.5! w-80% max-w-2xl opacity-80 mb-40!"
			/> -->
			<div class="text-3 text-center absolute! bottom-9">
				<p>本机只提供100元面额人民币</p>
				<!-- <p>且单笔体现最多不超过10000元</p> -->
			</div>
		</div>

		<div class="wd-right-sidebar flex flex-col items-end gap-8">
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
			<el-button class="w-30! h-15! fw-700! opacity-80" @click="stateNumber = 0">返回</el-button>
		</div>

	</div>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
// import Wait from "../../components/layout/Wait.vue";

const loading = ref(false);

const paymentData = ref({});

const getPaymentData = (type) => {
	axios({
		url: "/getLivingPay", method: "post", params: {
			cardId: localStorage.getItem('cardId'),
			payType: type
		}
	}).then(res => {
		if (res.data.res === 'success') {
			paymentData.value = res.data.object;
		} else {
			Error('出错')
		}
	})
}


// const accountInput = ref(null)

const router = useRouter()

const stateNumber = ref(0)
const paymentType = computed(() => {
	if (stateNumber.value === 1) return "电话"
	else if (stateNumber.value === 2) return "水电费"
	else return "ERROR"
})
// 弹窗
const alertMessage = (textMessage) => {
	ElMessage({
		message: textMessage,
		type: "error"
	})
}

const payMoney = () => {
	if (paymentData.value.status === '未缴费') {

		axios({
			url: "/payLiving", method: "post", params: {
				cardId: localStorage.getItem('cardId'),
				payType: stateNumber.value - 1
			}
		}).then(res => {
			if (res.data.res === 'success') {
				// console.log("缴费成功");
				loading.value = true;
				setTimeout(() => {
					loading.value = false;
					ElMessage({
						message: "缴费成功♥",
						type: "success"
					})
					getPaymentData(stateNumber.value - 1);
				}, 3000)

			} else {
				alertMessage("余额不足或网络出错，请稍后重试")
				Error('出错')
			}
		})
	} else if (paymentData.value.status === '已缴费') {
		alertMessage("无需缴费")

	} else {
		alertMessage("请稍后")
	}
	// console.log(paymentData)
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
