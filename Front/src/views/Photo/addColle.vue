<script setup>
import { ref, onMounted } from 'vue';
import { addPhotoCollectionAPI, findMyPhotoAPI } from '@/apis/photo'

const collinfo = ref({
    photoname: '',
    photodes: '',
    photoUrl: ''
})

const cratePhotoColl = async () => {
    const res = await addPhotoCollectionAPI(collinfo.value)
    console.log(res)
}

const options = ref([])
const getMyPhoto = async () => {
    const res = await findMyPhotoAPI()
    //console.log(res)
    options.value = res.reslut
}

onMounted(() => {
    getMyPhoto()
})


</script>

<template>
    <div class="flex flex-col m-5">
        <div>上传区域</div>
        <ElForm v-model="collinfo" label-position="top">
            <ElFormItem label="相册集名称">
                <ElInput v-model="collinfo.photoname" maxlength="20" show-word-limit clearable />
            </ElFormItem>
            <ElFormItem label="相册集描述">
                <ElInput v-model="collinfo.photodes" type="textarea" autosize maxlength="200" show-word-limit :rows="2"
                    clearable />
            </ElFormItem>

            <el-form-item label="照片">
                <div class="flex flex-row">
                    <el-form-item label="相册集封面" class="m-2 basis-1/2">
                        <!-- actiont填写上传api -->
                        <el-upload class="upload-demo" drag action="http://localhost:8000/photos/upload" multiple>
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">
                                将文件拖到此处 <em>点击上传</em>
                            </div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    只能上传图片格式哦
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="从已经上传的照片选择" class="m-2 basis-1/2">
                        <el-select v-model="collinfo.photoUrl" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value">
                                <div class="flex flex-col">
                                    <el-image :src="item.photoUrl" style="height: 500px;"></el-image>
                                </div>
                                
                            </el-option>
                        </el-select>
                        <el-button type="primary" @click="">选择</el-button>
                    </el-form-item>
                </div>
            </el-form-item>



            <el-form-item>
                <el-button type="primary" @click="cratePhotoColl">创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </ElForm>
        <div class="">

        </div>
        <div>相册集创建者区域</div>
        <div>相册集是否公开区域</div>
    </div>
</template>

<style scoped></style>