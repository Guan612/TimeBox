<script setup>
import { MoreFilled, Edit, Share } from '@element-plus/icons-vue'
import router from '@/router';

const props = defineProps({
    id: Number,
    collctionName: String,
    imgSrc: String,
    collctionDes: String
})

//跳转
const tocoll = (id) => {
    router.push(`/colle/${id}`)
}
</script>

<template>
    <el-card style="border-radius: 10px"
        class="flex flex-col card m-2 hover:scale-105 transition-all duration-300 ease-in-out shadow-2xl">
        <h3>{{ collctionName }}</h3>
        <el-image :src="imgSrc" style="width: 100%; height: 300px; border-radius: 5px;" fit="cover" lazy/>
        <p>{{ collctionDes }}</p>
        <div class="flex flex-row">
            <el-button class="mt-2" round :icon="MoreFilled" @click="tocoll(id)"></el-button>
            <el-button class="mt-2" round :icon="Edit"></el-button>
            <el-button class="mt-2" round :icon="Share"></el-button>
        </div>
    </el-card>
</template>

<style scoped>
.card {
    background: linear-gradient(to right, #5BCEFA, #F5A9B8)
}
</style>