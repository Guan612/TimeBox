<script setup>
import { ref, onMounted } from 'vue';
import { findMyPhotoCollAPI } from '@/apis/photo';
import collectionCard from './component/collectionCard.vue';

const photoList = ref([]);

onMounted(async () => {
    const res = await findMyPhotoCollAPI();
    photoList.value = res.reslut;
})
</script>

<template>
    <div class="flex flex-grow">
        <div class="justify-center grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 items-center">
            <div v-for="item in photoList" :key="item.id">
                <collectionCard :collctionName="item.photoName" :imgSrc="item.photoUrl" :id="item.id"
                    :collctionDes="item.photoDes"></collectionCard>
            </div>
        </div>

    </div>
</template>

<style scoped></style>