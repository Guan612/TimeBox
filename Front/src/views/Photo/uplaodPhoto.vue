<script setup>
import { ElFormItem } from 'element-plus';
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const token = userStore.userInfo.token;
const headers = {
    Authorization: `Bearer ${token}`
};

</script>

<template>
    <div class="flex flex-col m-5">
        <!-- actiont填写上传api -->
        <el-upload class="" drag action="http://localhost:8000/photos/upload" multiple :haders="headers">
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
    </div>
</template>

<style scoped></style>