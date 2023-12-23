<template>
    <!-- P1 -->
    <div v-show="stateNumber === 0" class="wd-box flex items-start w-full p-8! relative!">

        <div class="wd-left-sidebar flex flex-col items-end gap-8">
            <el-button class="w-30! h-15! fw-700! opacity-80" @click="stateNumber = 1">话费充值</el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
        </div>

        <div class="wd-content items-center flex flex-col w-full p-4 h-full!">

            <h1 class="mb-4! text-5! font-900! p-t-4! color-#333">请选择服务项目</h1>

            <div class="text-3 text-center absolute! bottom-9">
                <p>本机只提供100元面额人民币</p>
                <p>且单笔体现最多不超过10000元</p>
            </div>
        </div>


        <div class="wd-right-sidebar flex flex-col items-end gap-8">
            <el-button class="w-30! h-15! fw-700! opacity-80" @click="stateNumber = 2">水电费</el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-80 color-red!" @click="router.back()">返回</el-button>
        </div>
    </div>

    <!-- P2 -->
    <div v-show="stateNumber === 1 || stateNumber === 2" class="wd-box flex items-start w-full p-8! relative!">

        <div class="wd-left-sidebar flex flex-col items-end gap-8">
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-0 hover:cursor-default"></el-button>
            <el-button class="w-30! h-15! fw-700! opacity-80">确认</el-button>
        </div>

        <div class="wd-content items-center flex flex-col w-full p-4 h-full!">

            <h1 class="mb-8! text-5! font-900! p-t-4! color-#333">请输入{{ paymentType }}账号</h1>
            <input type="number" v-model.number="accountInput" class="p-1.5! w-80% max-w-2xl opacity-80 mb-40!">
            <div class="text-3 text-center absolute! bottom-9">
                <p>本机只提供100元面额人民币</p>
                <p>且单笔体现最多不超过10000元</p>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const accountInput = ref(null);

const router = useRouter();

const stateNumber = ref(0);
const paymentType = computed(() => {
    if (stateNumber.value === 1) return '电话'
    else if (stateNumber.value === 2) return '水电费'
    else return 'ERROR'
})

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.wd-box {
    background-color: #C8E0E4 !important;
}
</style>