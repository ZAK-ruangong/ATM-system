<template>
	<div class="flex justify-around items-center">
		<div class="text-center">
			<div class="text-6 mb-10">
				<div>余额信息</div>
				<div class="text-6">BALANCE INFORMATION</div>
			</div>
			<el-table :data="balanceDetails" style="width: 100%" fit>
				<el-table-column prop="date" label="交易时间" />
				<el-table-column prop="type" label="交易类别"  />
				<el-table-column prop="account" label="交易金额" />
				<el-table-column prop="balance" label="可用余额" />
				<el-table-column prop="to_user" label="转账用户" />
			</el-table>
		</div>
		<div class="flex flex-col gap-6">
			<el-button @click="getReceipt">打印凭条</el-button>
			<el-button class="color-green!" @click="router.back()">返回/Back</el-button>
			<el-button class="color-red!">退卡/Exit</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from "element-plus"
const router = useRouter()
const balanceDetails = reactive([])
// 打印凭条
const receiptDialogVisible = ref(false)
const getReceipt = () => {
	ElMessageBox.confirm(
		'确定要打印凭条吗',
		'Warning',
		{
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		},
	)
		.then(() => {
			ElMessage({
				type: 'success',
				message: '打印凭条成功',
			})
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '取消打印',
			})
		})
	receiptDialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	justify-content: space-between;
	align-items: center;

}
</style>
