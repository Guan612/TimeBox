<script setup>

</script>

<template>
    <h1>用户中心</h1>
    <el-button type="primary" @click="$router.push('/login')">去登录</el-button>
    <el-button type="primary" @click="$router.push('/register')">去注册</el-button>
    <el-button @click="$router.push('/user')">回主页</el-button>
    <router-view></router-view>
</template>

<style scoped></style>