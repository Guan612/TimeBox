<script setup>
import { getPhotoListAPI } from '@/apis/photo'
import { ref, onMounted } from 'vue'
import collectionCard from './component/collectionCard.vue';

const photoList = ref({})
const timeLine = ref([])
const getphoto = async () => {
    const res = await getPhotoListAPI()
    photoList.value = res.reslut
    timeLine.value = res.reslut.map(item =>{
        return {timestamp:item.createdAt.slice(0,4)}
    })
}

onMounted(() => {
    getphoto()
    //console.log(photoList)
})
</script>

<template>
    <div class="flex bg-white">
        <div class="flex flex-grow">
            <div class="justify-center grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 items-center">
                <div v-for="item in photoList" :key="item.id">
                    <collectionCard :collctionName="item.photoName" :imgSrc="item.photoUrl" :id="item.id"
                        :collctionDes="item.photoDes"></collectionCard>
                </div>
            </div>

        </div>
        <div class="w-1/5 mr-2">
            <el-timeline>
                <el-timeline-item v-for="(activity, index) in timeLine" :key="index" 
                    :timestamp="activity.timestamp">
                </el-timeline-item>
            </el-timeline>
        </div>
        
    </div>
</template>

<style scoped></style>
