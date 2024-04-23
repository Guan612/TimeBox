<script setup>
import { onMounted, ref } from 'vue';

import collectionCard from '../Photo/component/collectionCard.vue';
import router from '@/router';
import { searchPhotoCollectionAPI } from '@/apis/photo'

const keyword = ref('');
const searchres = ref([]);

const getSearchRes = async () => {
    const res = await searchPhotoCollectionAPI(keyword.value);
    searchres.value = res.reslut;
}
onMounted(() => {
    keyword.value = router.currentRoute.value.query.keyword
    // 获取搜索关键字
    //console.log(keyword.value);
    // 调用搜索接口
    getSearchRes();
})

</script>

<template>
    <div class="flex">
        <div class="flex flex-grow">
            <div class="justify-center grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 items-center">
                <div v-for="item in searchres" :key="item.id">
                    <collectionCard :collctionName="item.photoName" :imgSrc="item.photoUrl" :id="item.id"
                        :collctionDes="item.photoDes"></collectionCard>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>