<script setup>
import {useRoute} from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPhotoCollectionAPI } from '@/apis/photo'
const {params} = useRoute();

const photoCollId = ref('');
const photoColl = ref({});

const getPhotoColl = async ()=>{
    const {data:res} = await getPhotoCollectionAPI(photoCollId.value);
    photoColl.value = res;
}

onMounted(()=>{
    photoCollId.value = params.id;
    getPhotoColl();
})

</script>

<template>
    <div>照片详情卡</div>
</template>

<style scoped></style>