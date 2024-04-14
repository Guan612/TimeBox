<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPhotoCollectionAPI } from '@/apis/photo'
const { params } = useRoute();

const photoCollId = ref('');
const photoColl = ref({});

const getPhotoColl = async () => {
    const res = await getPhotoCollectionAPI(photoCollId.value);
    photoColl.value = res.reslut;
}

onMounted(() => {
    photoCollId.value = params.id;
    getPhotoColl();
})

</script>

<template>
    <div class="flex flex-row justify-center items-center w-full h-full">
        <div class="justify-center items-center w-2/3">
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in photoColl.photoslist" :key="item.id">
                    <el-image :src="item.photoUrl" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                        :preview-src-list="srcList" :initial-index="4" fit="contain" loading="lazy" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div>
            <div>照片名字区</div>
            <div>照片描述区</div>
        </div>

    </div>
</template>

<style scoped></style>