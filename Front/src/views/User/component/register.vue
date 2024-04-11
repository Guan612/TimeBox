<script setup>
import {ref} from 'vue';
import router from '@/router/';
import {registerAPI} from '@/apis/user';

const loginid = ref('');
const password = ref('');
const nickname = ref('');
const userInfo = ref({
    loginid,
    password,
    nickname,
});

const gologin = async () => {
    const res = await registerAPI(userInfo.value);
    if(res){
        router.push('/login')
    }
    
}

</script>

<template>
    <h1>注册</h1>
    <div class="card" style="width: 25rem;">
        <div class="card-body">
            <h5 class="card-title">Login</h5>
            <div class="mb-3">
                <label for="loginId" class="form-label">Login ID(必填)</label>
                <el-input v-model="loginid" placeholder="Enter login ID" />
                <label for="nickame" class="form-label">昵称(选填)</label>
                <el-input v-model="nickname" placeholder="Enter nickname" />
                <label for="password" class="form-label">Password(必填)</label>
                <el-input v-model="password" type="password" placeholder="Enter password" />
                <el-Button type="primary" @click="gologin">注册</el-Button>
            </div>
            <div class="mb-3">
            </div>
        </div>
    </div>
</template>

<style scoped></style>