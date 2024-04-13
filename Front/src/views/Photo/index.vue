<script setup>
import { getPhotoListAPI } from '@/apis/photo'
import { ref, onMounted } from 'vue'
import collectionCard from './component/collectionCard.vue';

const photoList = ref({})
const getphoto = async () => {
    const res = await getPhotoListAPI()
    photoList.value = res.reslut
}

onMounted(() => {
    getphoto()
    console.log(photoList)
})
</script>

<template>
    <div class="flex bg-white">
        <div class="flex flex-grow">
            <div class="justify-center grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
                <div v-for="item in photoList" :key="item.id">
                    <collectionCard 
                    :collctionName="item.photoName"
                    :imgSrc="item.photoUrl"
                    :collctionDes="item.photoDes"
                    ></collectionCard>
                </div>
            </div>

        </div>
        <div class="w-1/5">时间线</div>
    </div>
</template>

<style scoped></style>
