<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router'
import { Delete } from '@element-plus/icons-vue'

import { updatePhotoCollectionAPI, getPhotoCollectionAPI } from "@/apis/photo"


const { params } = useRoute();
const collinfo = ref({})

onMounted(async () => {
    let { reslut } = await getPhotoCollectionAPI(params.id)
    collinfo.value = reslut
    //console.log(photoCollinfo.value)
})

</script>

<template>
    <h5>修改相册合集信息</h5>
    <div class="flex flex-col m-5">
        <el-form :model="collinfo" label-position="top">
            <ElFormItem label="相册集名称">
                <ElInput v-model="collinfo.photoName" maxlength="20" show-word-limit clearable />
            </ElFormItem>
            <ElFormItem label="相册集描述">
                <ElInput v-model="collinfo.photoDes" type="textarea" autosize maxlength="200" show-word-limit :rows="2"
                    clearable />
            </ElFormItem>
            <el-form-item label="照片管理">
                <div v-for="photo in collinfo.photoslist" :key="photo.id" class="m-2">
                    <el-popover placement="bottom" :width="148" trigger="click">
                        <template #reference>
                            <ElImage :src="photo.photoUrl" style="width: 148px;height: 148px;" class="rounded-lg"
                                fit="cover">
                            </ElImage>
                        </template>
                        <ElButton type="danger" round :icon="Delete"></ElButton>
                    </el-popover>

                </div>
                <el-upload action="/api/upload" list-type="picture-card">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updatePhotoCollectionAPI(collinfo)">修改</el-button>
                <el-button type="danger" @click="deletePhotoCollectionAPI(collinfo.id)">删除</el-button>
                <el-button>取消</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped></style>