<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import {ArrowLeftBold } from '@element-plus/icons-vue'

import { getPhotoCollectionAPI,uploaderAPI } from '@/apis/photo'
import { backindex } from './function'
const { params } = useRoute();

const photoCollId = ref('');
const photoColl = ref({});
const uploader = ref({});

const getPhotoColl = async () => {
    const res = await getPhotoCollectionAPI(photoCollId.value);
    const uploaderRes = await uploaderAPI(photoCollId.value);
    uploader.value = uploaderRes.reslut;
    photoColl.value = res.reslut;
}

onMounted(() => {
    photoCollId.value = params.id;
    getPhotoColl();
})

</script>

<template>
    <div class="flex flex-col m-2 border-dotted border-2 rounded-2xl">
        <div class="flex flex-row m-1 items-center">
            <div class="">
                <el-button round :icon="ArrowLeftBold" @click="backindex"></el-button>
            </div>
            <div class="m-1">照片所有者</div>
            <div class="justify-center items-center" v-for="item in uploader" :key="item.userId">
                <div  class="flex flex-row m-1 font-bold">
                    <p>{{item.nickname}}</p>
                </div>
                
            </div>
        </div>
        <div class="flex flex-row justify-center items-center w-full m-1">
            <div class="justify-center items-center w-2/3">
                <el-carousel :interval="5000" arrow="always" height="500px" class="rounded-lg" style="text-align: center">
                    <el-carousel-item v-for="item in photoColl.photoslist" :key="item.id" height="500px" class="flex justify-content-center">
                        <el-image :src="item.photoUrl" :preview-src-list="[item.photoUrl]" style="object-fit: contain; width: 100%; height: 100%;" class="rounded-lg"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="w-1/3 m-1">
                <div class="italic antialiased font-bold">{{ photoColl.photoName }}</div>
                <div>{{ photoColl.photoDes}}</div>
            </div>
        </div>
        <div>
            功能按钮
        </div>
    </div>

</template>

<style scoped></style>