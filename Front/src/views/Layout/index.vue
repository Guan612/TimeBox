<script setup>
import sideBar from './component/sideBar.vue'
import haderBar from './component/haderBar.vue';
</script>

<template>
    <div class="common-layout flex-col h-screen">
        <el-container class="">
            <el-aside class="bg-cyan-400 flex-col hidden md:block transition duration-300 ease-out md:w-1/6">
              <sideBar></sideBar>
            </el-aside>
            <el-container class="w-5/6 flex">
                <el-header class="bg-rose-400">
                    <haderBar></haderBar>
                </el-header>
                <el-main class="bg-white">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped></style>