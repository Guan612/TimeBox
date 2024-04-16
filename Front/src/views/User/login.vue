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

//校验登录
const rules = ref({
	loginid: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
	],
})

</script>

<template>
	<div class="flex justify-center items-center h-screen">
		<div class="flex flex-col items-center p-6 md:p-10 lg:p-15 rounded-lg card shadow-2xl">
			<div class="flex items-center mb-4">
				<div class="mr-2 md:m-3 lg:m-8 hidden md:block">
					<img :src="imgSrc" alt="" class="w-20 h-10">
				</div>
				<el-form :rules='rules' label-position="right" label-width="auto">
					<el-form-item label="登录id" prop="loginid">
						<el-input v-model="loginid" style="width: 240px" placeholder="必填" clearable
							:suffixIcon="Avatar" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="password" style="width: 240px" type="password" placeholder="必填" show-password
							:suffixIcon="Key" />
					</el-form-item>
				</el-form>
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