<script setup>
import { findMyPhotoAPI, deletePhotoAPI } from '@/apis/photo'
import { onMounted, ref } from 'vue';
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
const photos = ref([])
const getMyPhoto = async () => {
    const res = await findMyPhotoAPI()
    photos.value = res.reslut
}

const delphoto = async (id) => {
    const res = await deletePhotoAPI(id)
    if (res.code == 0) {
        ElMessage({
            message: '删除成功',
            type: 'success',
        })
        getMyPhoto()
    }
}

onMounted(() => {
    getMyPhoto()
})
</script>

<template>
    <div class="hidden lg:block">
        <div class="flex flex-row justify-center bg-gradient-to-r from-transblue to-transpink">
            <div class="m-1">
                <el-select v-model="value" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="时间" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="m-1">
                <el-select v-model="value" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="拍摄设备" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="m-1">
                <el-select v-model="value" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="型号" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="m-1">
                <elButton>查找</elButton>
            </div>
        </div>
    </div>

    <div class="flex flex-row m-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <!-- 使用 v-for 循环渲染图片 -->
            <div v-for="photo in photos" :key="photo.id" class="flex justify-center">
                <el-popover placement="bottom" :width="280" trigger="click">
                    <template #reference>
                        <el-image :src="photo.photoUrl" fit="cover" style="height: 200px;" lazy
                            class="rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"></el-image>
                        <!-- <el-button class="m-2">Click to activate</el-button> -->
                    </template>
                    <div class="flex flex-col">
                        <div class="felx flex-row justify-center m-2">
                            <el-button :icon="Plus" round></el-button>
                            <el-button :icon="Edit" round type="primary"></el-button>
                            <el-button :icon="Delete" type="danger" round @click="delphoto(photo.id)"></el-button>
                        </div>
                        <div class="m-2">
                            <div v-if="photo.photoAndColl.length > 0">
                                所属合集：{{ photo.photoAndColl[0].photoCollection.photoName }}
                            </div>
                            <div v-else>
                                未加入任何相册
                            </div>
                        </div>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>

</template>

<style scoped></style>