<script setup>
import { useUserStore } from '@/stores/userStore';
import router from '@/router';
import { onMounted, ref } from 'vue';
const userStore = useUserStore();
const haderImg = ref('')
onMounted(() => {
    haderImg.value = userStore.userInfo.userhaderimg;
})
</script>

<template>
    <div class="flex-row">
        <div class="flex-row-center">
            <div v-if="userStore.userInfo.token">
                <div v-if="userStore.userInfo.userInfo.nickname" class="flex">
                    欢迎你：{{ userStore.userInfo.userInfo.nickname }}
                </div>
                <div v-else-if="userStore.userInfo.userInfo.loginid">
                    欢迎你：{{ userStore.userInfo.userInfo.loginid }}
                </div>
            </div>
            <div v-else>
                未登录,点击去登录
            </div>
        </div>
        <div class="flex">
            <div v-if="userStore.userInfo.token">
                <el-avatar :size="40" :src=haderImg></el-avatar>
            </div>
            <div v-else>
                <el-avatar :size="40"
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            </div>
        </div>
    </div>

    <div>

    </div>
</template>

<style></style>