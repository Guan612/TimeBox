<script setup>
import { findMyPhotoAPI } from '@/apis/photo'
import { ElImage } from 'element-plus';
import { onMounted, ref } from 'vue';

const photos = ref([])
const getMyPhoto = async() => {
    const res = await findMyPhotoAPI()
    photos.value = res.reslut
}

onMounted(()=>{
    getMyPhoto()
})
</script>

<template>
    <h1>我的照片</h1>
    <div v-for="item in photos" :key="item.id">
        <ElImage :src="item.photoUrl"></ElImage>
    </div>
</template>

<style scoped></style>