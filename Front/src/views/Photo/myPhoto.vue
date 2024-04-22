<script setup>
import { findMyPhotoAPI } from '@/apis/photo'
import { ElImage } from 'element-plus';
import { onMounted, ref } from 'vue';

const photos = ref([])
const getMyPhoto = async () => {
    const res = await findMyPhotoAPI()
    photos.value = res.reslut
}

onMounted(() => {
    getMyPhoto()
})
</script>

<template>
    <div class="flex flex-row m-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <!-- 使用 v-for 循环渲染图片 -->
            <div v-for="photo in photos" :key="photo.id" class="flex justify-center">
                <el-image :src="photo.photoUrl" fit="cover" style="height: 200px;"
                    class="rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"></el-image>
            </div>
        </div>
    </div>

</template>

<style scoped></style>