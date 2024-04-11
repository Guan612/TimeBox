<script setup>
import {ElButton, ElInput} from 'element-plus'
import { ref } from 'vue';
import {useUserStore} from '@/stores/userStore'
let imgSrc = ref('https://upload.wikimedia.org/wikipedia/commons/1/1a/Dolby_logo_2019.svg')

const userStore = useUserStore()
const loginId = ref('piya');
const password = ref('123456');

const userInfo = ref({
	loginId,
	password
})
</script>

<template>
	<div class="flex justify-center justify-items-center items-center h-screen">
		<div class="shadow-2xl flex-col card size-200 rounded-lg">
			<div class="flex flex-row justify-center m-3 md:m-10">
				<div class="flex mr-2 md:mr-5 w-20 md:w-23 flex-col justify-center">
					<p class="flex justify-center">登录</p>
					<img :src="imgSrc">
				</div>
				<div class="flex flex-col">
					<div class="mb-2 md:mb-5">
						用户
					</div>
					<div class="mb-2 md:mb-5">
						<ElInput placeholder="请输入用户名" v-model:value="user_name"/>
					</div>
					<div class="mb-2 md:mb-5">
						密码
					</div>
					<div class="mb-2 md:mb-5">
						<ElInput placeholder="请输入密码" type="password" v-model:value="password"/>
					</div>
				</div>
			</div>
			<div class="flex flex-col justify-center">
				<div class="flex justify-center mb-3">
					<ElButton type="info" class="text-black" @click="userStore.handleLogin(userInfo)">登录</ElButton>
				</div>
				<div class="flex justify-center">
					<router-link to="/register">
						<ElButto strong secondary class="w-100" @click="">还没有注册？</ElButto>
					</router-link>
				</div>
			</div>
		</div>
	</div>

</template>

<style>
.card {
	background: linear-gradient(to right, #5BCEFA, #F5A9B8)
	
}
</style>