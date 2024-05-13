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
    //console.log(fileList.value)
    const data = new FormData();
    fileList.value.forEach(file => {
        data.append('file', file.raw);
    });
    // 添加调试信息
    // console.log(data)
    // console.log("FormData对象中的文件数量:", data.getAll('files').length);
    // console.log("FormData对象中的文件:", data.getAll('files'));
    // 添加其他参数
    //data.append('param1', 'value1');
    //data.append('param2', 'value2');

    const res = await uploadPhotoAPI(data);
    //console.log(res)
    if (res.code === 0) {
        ElMessage({
            message: '上传成功',
            type: 'success',
        })

        fileList.value = [];
    } else {
        ElMessage({
            message: '上传失败',
            type: 'error',
        })
    }
}

</script>

<template>
    <div class="flex flex-col m-2">
        <div>
            <el-upload v-model:file-list="fileList" :auto-upload="false" list-type="picture-card"
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