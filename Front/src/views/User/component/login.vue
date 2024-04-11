<script setup>
import { ref } from 'vue';
import {useUserStore} from '@/stores/userStore'
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
	<div class="card" style="width: 25rem;">
		<div class="card-body">
			<h5 class="card-title">Login</h5>
			<div class="mb-3">
				<label for="loginId" class="form-label">Login ID</label>
				<el-input v-model="loginId" placeholder="Enter login ID" />
				<label for="password" class="form-label">Password</label>
				<el-input v-model="password" type="password" placeholder="Enter password" />
				<el-Button type="primary" @click="userStore.getuserInfo(userInfo)">Login</el-Button>
			</div>
			<div class="mb-3">
				<el-button type="primary" @click="goregsiter">去注册</el-button>
			</div>
		</div>
	</div>
</template>

<style>
.card {
	background: linear-gradient(to right, #5BCEFA, #F5A9B8)
}
</style>