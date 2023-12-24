<template>
	<div class="flex justify-around items-center">
		<div class="text-center">
			<div class="text-6 mb-10">
				<div>余额信息</div>
				<div class="text-6">BALANCE INFORMATION</div>
			</div>
			<el-table :data="balanceDetails" style="width: 100%" fit>
				<el-table-column prop="date" label="交易时间" />
				<el-table-column prop="type" label="交易类别" />
				<el-table-column prop="amount" label="交易金额" />
				<el-table-column prop="balance" label="可用余额" />
				<el-table-column prop="to_user" label="转账用户" />
			</el-table>
			<el-dialog v-model="receiptDialogVisible" title="提示" width="30%">
				<span>确定要打印凭条吗</span>
				<template #footer>
					<div class="flex justify-between">
						<el-button
							class="w-20! h-10!"
							@click="receiptDialogVisible = false"
							>取消</el-button
						>
						<el-button
							class="w-20! h-10!"
							type="primary"
							@click="getReceipt"
						>
							确认
						</el-button>
					</div>
				</template>
			</el-dialog>
		</div>
		<div class="flex flex-col gap-6">
			<el-button @click="receiptDialogVisible = true">打印凭条</el-button>
			<el-button class="color-green!" @click="router.back()">{{
				$t("back")
			}}</el-button>
			<el-button class="color-red!">{{ $t("exit") }}</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const balanceDetails = reactive([])
// 打印凭条
const receiptDialogVisible = ref(false)
const getReceipt = () => {
	receiptDialogVisible.value = false
}
</script>

<style lang="scss" scoped></style>
