<template>
	<div class="flex justify-around items-center">
		<div class="text-center">
			<div class="text-6 mb-10">
				<div>余额信息</div>
				<div class="text-6">BALANCE INFORMATION</div>
			</div>
			<el-table
				:data="balanceDetails"
				fit
				max-height="290"
				style="width: 800px"
			>
				<el-table-column prop="transDate" label="交易时间" />
				<el-table-column prop="transType" label="交易类别" />
				<el-table-column prop="transMoney" label="交易金额" />
				<!-- <el-table-column prop="balance" label="可用余额" /> -->
				<el-table-column prop="remark" label="转账用户" />
			</el-table>
			<el-dialog v-model="receiptDialogVisible" title="提示" width="30%">
				<span>确定要打印凭条吗</span>
				<template #footer>
					<div class="flex justify-between">
						<el-button class="w-20! h-10!" @click="receiptDialogVisible = false">取消</el-button>
						<el-button class="w-20! h-10!" type="primary" @click="getReceipt">
							确认
						</el-button>
					</div>
				</template>
			</el-dialog>
		</div>
		<div class="flex flex-col gap-6 mt-10">
			<el-button @click="receiptDialogVisible = true">打印凭条</el-button>
			<el-button class="color-green!" @click="router.back()">{{
				$t("back")
			}}</el-button>
			<el-button class="color-red!" @click="logOut">{{
				$t("exit")
			}}</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import * as XLSX from "xlsx"
import useCardStore from "@/store/card.js"

const router = useRouter()
const balanceDetails = reactive([])

// 打印凭条
const receiptDialogVisible = ref(false)
const getReceipt = () => {
	const data = balanceDetails.map((row) => ({
		交易时间: row.transDate,
		交易类别: row.transType,
		交易金额: row.transMoney,
		// 可用余额: row.balance,
		转账用户: row.remark
	}))
	const ws = XLSX.utils.json_to_sheet(data)
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

	XLSX.writeFile(wb, "凭条.xlsx")
	receiptDialogVisible.value = false
}
// 退卡
const { logout } = useCardStore()
const logOut = () => {
	logout()
	router.push("/")
}
onMounted(() => {
	axios({
		url: "/getUserRecepits",
		method: "post",
		params: {
			cardId: localStorage.getItem("cardId")
		}
	}).then((res) => {
		console.log(res.data)
		// 存入算0，取款算1,转账算2
		for (let i = 0; i < res.data.length; i++) {
			balanceDetails.push(res.data[i])
			balanceDetails[i].transDate = balanceDetails[i].transDate
				.replace("T", " ")
				.slice(0, 16)
			if (res.data[i].transType === 0) {
				balanceDetails[i].transType = "存入"
				balanceDetails[i].remark = res.data[i].cardId
			} else if (res.data[i].transType === 1) {
				balanceDetails[i].transType = "取款"
				balanceDetails[i].remark = "无"
			} else {
				balanceDetails[i].transType = "转账"
			}
		}
	})
})
</script>

<style lang="scss" scoped></style>
