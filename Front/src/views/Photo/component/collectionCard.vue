<script setup>
import {MoreFilled,Edit,Share} from '@element-plus/icons-vue'

const props = defineProps({
    collctionName: String,
    imgSrc: String,
    collctionDes: String
})
</script>

<template>
    <el-card
        class="flex flex-col rounded-2xl card m-2 hover:scale-105 transition-all duration-300 ease-in-out shadow-2xl">
        <h3>{{collctionName}}</h3>
        <img :src="imgSrc"
            style="width: 100%" />
        <p>{{collctionDes}}</p>
        <div class="flex flex-row">
            <el-button class="mt-2" round :icon="MoreFilled"></el-button>
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