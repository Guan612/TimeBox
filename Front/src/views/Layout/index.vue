<script setup>
import sideBar from './component/sideBar.vue'
</script>

<template>
    <div class="common-layout">
        <el-container class="">
            <el-aside class="bg-cyan-400 flex-col">
              <sideBar></sideBar>
            </el-aside>
            <el-container class="w-5/6 flex">
                <el-header class="bg-rose-400">Header</el-header>
                <el-main class="bg-white">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped></style>