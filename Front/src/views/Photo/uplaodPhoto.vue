<script setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
</script>

<template>
    <div class="flex flex-col m-5">
        <el-upload v-model:file-list="fileList"
            list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

    </div>
</template>

<style scoped></style>