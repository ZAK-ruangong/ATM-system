<template>
	<el-scrollbar>
		<el-container class="w-100vw h-100vh">
			<el-header>
				<Header />
			</el-header>
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</el-scrollbar>
</template>

<script setup>
import Header from './components/layout/Header.vue'
</script>

<style></style>
