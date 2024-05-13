<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router'
import { Delete, ArrowLeftBold, Plus } from '@element-plus/icons-vue'
import router from "@/router";


import { updatePhotoCollectionAPI, getPhotoCollectionAPI, deletePhotoCollectionAPI, findMyPhotoAPI, addPhotoCollectionPhotoAPI } from "@/apis/photo"


const { params } = useRoute();
const collinfo = ref({})
const options = ref([])
const DelVisible = ref(false);
const UpdateVisible = ref(false);

const backindex = () => {
    //使用back方法返回上一级
    router.back();
}

//修改照片集
const updateColl = async () => {
    const res = await updatePhotoCollectionAPI(params.id, collinfo.value)
    if (res.code == 0) {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        UpdateVisible.value = false;
        let { reslut } = await getPhotoCollectionAPI(params.id)
        collinfo.value = reslut
    } else {
        ElMessage({
            message: '修改失败',
            type: 'error',
        })
    }
}

//删除照片集
const delColl = async () => {
    let res = await deletePhotoCollectionAPI(params.id)
    if (res.code == 0) {
        ElMessage({
            message: '删除成功',
            type: 'success',
        })
        DelVisible.value = false;
        router.back();
    }
}
//添加照片集照片
const addClphoto = async (id) => {
    let res = await addPhotoCollectionPhotoAPI(params.id, id)
    if (res.code == 0) {
        ElMessage({
            message: '添加成功',
            type: 'success',
        })
        // let { reslut } = await getPhotoCollectionAPI(params.id)
        // collinfo.value = reslut
        //collinfo.value.photoslist = collinfo.value.photoslist.filter(item => item.id != id)
    }
}

//删除照片集照片
const delClphoto = async (id) => {
    let res = await deletePhotoCollectionPhotoAPI(id)
    if (res.code == 0) {
        ElMessage({
            message: '删除成功',
            type: 'success',
        })

        //使用filter整理数组
        collinfo.value.photoslist = collinfo.value.photoslist.filter(item => item.id != id)
    }
}

const getMyPhoto = async () => {
    const res = await findMyPhotoAPI()
    //console.log(res)
    options.value = res.reslut
}

onMounted(async () => {
    let { reslut } = await getPhotoCollectionAPI(params.id)
    collinfo.value = reslut
    //console.log(photoCollinfo.value)
    getMyPhoto()
})

</script>

<template>
    <el-dialog v-model="DelVisible" title="确认删除？" width="300">
        <template #footer>
            <div class="dialog-footer">
                <el-button type="danger" @click="delColl">
                    删除
                </el-button>
                <el-button type="primary" @click="dialogVisible = false">取消</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="UpdateVisible" title="确认修改？" width="300">
        <template #footer>
            <div class="dialog-footer">
                <el-button type="danger" @click="updateColl">
                    修改
                </el-button>
                <el-button type="primary" @click="dialogVisible = false">取消</el-button>
            </div>
        </template>
    </el-dialog>
    <div class="m-2">
        <el-button @click="backindex" :icon="ArrowLeftBold" round></el-button>
    </div>
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
                        <ElButton type="danger" round :icon="Delete" @click="delClphoto(photo.id)"></ElButton>
                    </el-popover>

                </div>
                <div class="flex justify-center items-center" @click="">
                    <div style="width: 148px; height: 148px;"
                        class="flex flex-col justify-center items-center rounded-lg border-dashed">
                        <div class="font-bold">添加照片</div>
                        <el-select v-model="value" placeholder="选择" size="large" style="width: 140px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                                <div class="flex flex-row">
                                    <div class="grid grid-cols-3">
                                        <el-image :src="item.photoUrl" style="width: 100px;"
                                            @cilck="addClphoto(item.id)"></el-image>
                                    </div>
                                </div>
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="UpdateVisible = true">修改</el-button>
                <el-button type="danger" @click="DelVisible = true">删除</el-button>
                <el-button>取消</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped></style>