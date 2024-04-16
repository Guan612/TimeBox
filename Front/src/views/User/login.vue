<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore'
import router from '@/router/index';
let imgSrc = ref('https://upload.wikimedia.org/wikipedia/commons/1/1a/Dolby_logo_2019.svg')

const userStore = useUserStore()
const loginid = ref('piya');
const password = ref('123456');

const userInfo = ref({
	loginid,
	password
})

const goregsiter = () => {
	router.push('/register')
}
</script>

<template>
	<div class="flex justify-center items-center h-screen">
		<div class="flex flex-col items-center bg-gray-200 p-6 rounded-lg card shadow-2xl">
			<div class="flex items-center mb-4">
				<div class="mr-2 hidden md:block">
					<img :src="imgSrc" alt="" class="w-20 h-10">
				</div>
				<div>
					<div class="m-2">用户名</div>
					<el-input v-model="loginid" style="width: 240px" placeholder="" clearable />
					<div class="m-2">密码</div>
					<el-input v-model="password" style="width: 240px" type="password" placeholder="" show-password />
				</div>
			</div>
			<el-button class="m-2" @click="userStore.getuserInfo(userInfo)" type="primary" round>点击登录</el-button>
			<el-button class="m-2" @click="goregsiter" round>还没有注册？点击注册</el-button>
		</div>
	</div>
</template>

<style scoped>
.card {
	background: linear-gradient(to right, #5BCEFA, #F5A9B8)
}
</style>