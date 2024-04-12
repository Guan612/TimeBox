<script setup>
import { Search } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore';
import router from '@/router';
import { onMounted, ref } from 'vue';
const userStore = useUserStore();
const search = ref('')
const haderImg = ref('https://img2.imgtp.com/2024/04/09/OmWWam4c.jpg')
const logoImg = ref('https://upload.wikimedia.org/wikipedia/commons/1/1a/Dolby_logo_2019.svg')
const nickname = ref('田皮鸭')
</script>

<template>
    <div class="haderBar flex flex-row h-20">
        <div class="basis-1/4 flex">
            <img :src="logoImg" class="bg-center w-20 ml-5 hover:scale-110 transition-all duration-300">
        </div>
        <div class="flex flex-row basis-3/4">
            <div class="basis-1/3 content-center">
                <div class="hidden md:block">
                    <el-input v-model="search" placeholder="搜索" size="large">
                        <template #append>
                            <el-button :icon="Search" />
                        </template>
                    </el-input>
                </div>
            </div>
            <div class="flex flex-row basis-2/3 justify-end">
                <div class="content-center m-3 md:m-5">{{nickname}}</div>
                <div class="content-center mr-5 md:mr-8">
                    <el-avatar :src="haderImg" size="large"></el-avatar>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.haderBar {
    background: linear-gradient(to right, #5BCEFA, #F5A9B8)
}
</style>