<script setup>
import { Search, Upload, Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore';
import { useUserHanderImgStore } from '@/stores/userHaderImgStore'
import { useSearchStore } from '@/stores/searchStore'
import router from '@/router';
import { onMounted, ref } from 'vue';


const userStore = useUserStore();
const userHanderImgStore = useUserHanderImgStore();
const searchStore = useSearchStore();


const searchclick = () => {
    searchStore.keyword = keyword.value;
    searchStore.search()
}

onMounted(() => {
    userHanderImgStore.getUserHanderImg();
    haderImg.value = userHanderImgStore.userHImg;
})

const keyword = ref('')
const haderImg = ref('')
const testimg = ref('https://img2.imgtp.com/2024/04/09/OmWWam4c.jpg')
const logoImg = ref('https://upload.wikimedia.org/wikipedia/commons/1/1a/Dolby_logo_2019.svg')

</script>

<template>
    <div class="flex flex-row h-15 md:h-20 bg-gradient-to-r from-transblue to-transpink">
        <div class="basis-1/6 flex justify-center content-center m-2">
            <img :src="logoImg" class="bg-center w-20 hover:scale-110 transition-all duration-300"
                @click="router.push('/')">
        </div>
        <div class="flex flex-row basis-5/6">
            <div class="basis-1/3 content-center">
                <div class="hidden md:block">
                    <el-input v-model="keyword" placeholder="搜索" size="large">
                        <template #append>
                            <el-button :icon="Search" @click="searchclick" />
                        </template>
                    </el-input>
                </div>
            </div>
            <div class="flex flex-row basis-2/3 justify-end" v-if="userStore.userInfo.token">
                <div class="content-center hidden md:block md:m-5">
                    <ElButton :icon="Upload" round @click="router.push('/uplaodphoto')">上传照片</ElButton>
                </div>
                <div class="content-center block md:hidden md:mr-20">
                    <ElButton :icon="Upload" circle type="primary" @click="router.push('/uplaodphoto')"></ElButton>
                </div>
                <div class="content-center hidden md:block md:mr-5">
                    <ElButton :icon="Edit" round @click="router.push('/addcolle')">添加合集</ElButton>
                </div>
                <div class="content-center block md:hidden md:mr-20">
                    <ElButton class="ml-2" :icon="Edit" circle type="primary" @click="router.push('/addcolle')">
                    </ElButton>
                </div>
                <RouterLink to="/user" class="content-center m-3 md:m-5" style="text-decoration: none; color: white;">
                    <div>{{ userStore.userInfo.userInfo.nickname }}</div>
                </RouterLink>
                <div class="content-center mr-5 md:mr-8">
                    <el-avatar :src="haderImg" size="large"></el-avatar>
                </div>
            </div>
            <div v-else class="flex flex-row basis-2/3 justify-end">
                <div class="content-center mr-5">
                    <el-button round @click="router.push('/login')">去登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .haderBar {
    background: linear-gradient(to right, #5BCEFA, #F5A9B8)
} */
</style>