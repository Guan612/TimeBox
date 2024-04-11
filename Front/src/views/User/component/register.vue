<script setup>
import {ref} from 'vue';
import router from '@/router/';




const gologin = () => {
    router.push('/login')
}

</script>

<template>
    <h1>注册</h1>
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
                <el-button type="primary" @click="gologin">去登录</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>