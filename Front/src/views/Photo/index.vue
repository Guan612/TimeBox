<script setup>
import {getPhotoListAPI} from '@/apis/photo'
import {ref, onMounted} from 'vue'

const photoList = ref({})
const getphoto = async () => {
    const res = await getPhotoListAPI()
    photoList.value = res.data
}

onMounted(() => {
    getphoto()
})
</script>

<template>
    <div class="flex bg-white">
        照片主页
    </div>
</template>

<style scoped></style>
