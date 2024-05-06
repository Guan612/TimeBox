<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { uploadPhotoAPI } from '@/apis/photo'

const fileList = ref([]);
const dialogVisible = ref(false);
const dialogImageUrl = ref('');

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url;
    dialogVisible.value = true;
}

const submit = async () => {
    console.log(fileList.value)
    const data = new FormData();
    fileList.value.forEach(file => {
        data.append('files', file.raw);
    });
    // 添加调试信息
    console.log("FormData对象中的文件数量:", data.getAll('files').length);
    
    const res = await uploadPhotoAPI(data);
    console.log(res)
}

</script>

<template>
    <div class="flex flex-col m-2">
        <div>
            <el-upload v-model:file-list="fileList"
                :auto-upload="false" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" multiple>
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </div>
        <div class="m-2">
            <el-button type="primary" @click="submit">上传</el-button>
        </div>
    </div>
</template>