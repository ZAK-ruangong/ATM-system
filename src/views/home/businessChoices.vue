<template>
  <div class="flex justify-around">
    <div class="flex flex-col gap-6">
			<el-button class="color-purple!" @click="router.push('/search')">查询/Search</el-button>
			<el-button class="color-purple!" @click="router.push('/transfer')">转账/Transfer</el-button>
			<el-button class="color-purple!" @click="router.push('/changePwd')">改密/CHangePwd</el-button>
    </div>
    <div class="flex flex-col gap-6">
      <el-button class="color-purple!" @click="router.push('/withdrawal')">取款/Withdrawal</el-button>
			<el-button class="color-purple!" @click="router.push('/deposit')">存款/Save</el-button>
			<el-button class="color-purple!" @click="router.push('/livingpayment')">代理业务/Pay</el-button>
			<el-button class="color-red!">退卡/Exit</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
</script>

<style lang="scss" scoped>
</style>
