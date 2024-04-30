<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { uploadPhotoAPI } from '@/apis/photo'

const uploadUrl = ref('');
const fileList = ref([]);
const dialogVisible = ref(false);
const dialogImageUrl = ref('');
const uploadSuccessMessage = ref('');

const handleBeforeUpload = async (file) => {
    // 使用uploadPhotoAPI发送上传请求
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await uploadPhotoAPI(formData);
        console.log('上传成功:', response);
    } catch (error) {
        console.log('上传失败:', error);
    }

    // 返回false以阻止自动上传
    return false;
};

const handleSuccess = (response, file, fileList) => {
    fileList.value = fileList;
    dialogVisible.value = true;
    dialogImageUrl.value = file.url;
    uploadSuccessMessage.value = '文件上传成功';
};

const handleError = (error, file, fileList) => {
    console.log('上传失败:', error);
};

</script>

<template>
    <div class="flex flex-col m-2">
        <div>
            <el-upload action="" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :on-error="handleError"
                :file-list="fileList" :auto-upload="false" :show-file-list="true" list-type="picture-card"
                accept="image/*">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
                <p>{{ uploadSuccessMessage }}</p>
            </el-dialog>
        </div>
        <div class="m-2">
            <el-button type="primary">上传到服务器</el-button>
        </div>
    </div>
</template>