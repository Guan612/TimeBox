<script setup>
import { findMyPhotoAPI, deletePhotoAPI, getPhotoListAPI, addPhotoCollectionPhotoAPI } from '@/apis/photo'
import { onMounted, ref } from 'vue';
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
const photoid = ref()
const photos = ref([])
const timeSelect = ref([])
const options = ref([])
const makeSelect = ref([
    {
        value: 'Xiaomi',
        label: 'Xiaomi',
    },
    {
        value: 'Google',
        label: 'Google',
    },
])
const modelSelect = ref([
    {
        value: 'Xiaomi',
        label: 'Xiaomi',
    },
    {
        value: 'Google',
        label: 'Google',
    },
])
const dialogVisible = ref(false);
const addVisible = ref(false);

const confirmDelete = (id) => {
    photoid.value = id
    dialogVisible.value = true
}

const addConfirm = async (id) => {
    addVisible.value = true
    const res = await getPhotoListAPI();
    options.value = res.reslut
    photoid.value = id

}

const addCollPhoto = async (id) => {
    console.log(options.value.id)
    const res = await addPhotoCollectionPhotoAPI(options.value.id,id)
    if (res.code == 0) {
        ElMessage({
            message: '添加成功',
            type: 'success',
        })
        addVisible.value = false
        getMyPhoto()
    }
}

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
        dialogVisible.value = false
        getMyPhoto()
    }
}

onMounted(() => {
    getMyPhoto()
})
</script>

<template>
    <el-dialog v-model="dialogVisible" title="确认删除？" width="300">
        <template #footer>
            <div class="dialog-footer">
                <el-button type="danger" @click="delphoto(photoid)">
                    删除
                </el-button>
                <el-button type="primary" @click="dialogVisible = false">取消</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="addVisible" title="请选择照片集" width="300">
        <template #footer>
            <div class="dialog-footer">
                <el-select v-model="options.id" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.id" :label="item.photoName" :value="item.id">
                    </el-option>
                </el-select>
                <div class="m-1">
                    <el-button type="primary" @click="addCollPhoto(photoid)">
                        添加
                    </el-button>
                    <el-button @click="addVisible = false">取消</el-button>
                </div>
            </div>
        </template>
    </el-dialog>
    <div class="hidden lg:block">
        <div class="flex flex-row justify-center bg-gradient-to-r from-transblue to-transpink">
            <div class="m-1">
                <el-select v-model="value" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="时间" style="width: 240px">
                    <el-option v-for="item in timeSelect" :key="item.value" :label="item.label" :value="item.id" />
                </el-select>
            </div>
            <div class="m-1">
                <el-select v-model="value" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="拍摄设备" style="width: 240px">
                    <el-option v-for="item in makeSelect" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="m-1">
                <el-select v-model="value" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="型号" style="width: 240px">
                    <el-option v-for="item in modelSelect" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="m-1">
                <elButton>查找</elButton>
            </div>
        </div>
    </div>

    <div class="flex flex-row m-5 justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <!-- 使用 v-for 循环渲染图片 -->
            <div v-for="photo in photos" :key="photo.id" class="flex justify-center">
                <el-popover placement="bottom" :width="280" trigger="click">
                    <template #reference>
                        <el-image :src="photo.photoUrl" fit="cover" style="height: 230px;" lazy
                            class="rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"></el-image>
                        <!-- <el-button class="m-2">Click to activate</el-button> -->
                    </template>
                    <div class="flex flex-col">
                        <div class="felx flex-row justify-center m-2">
                            <el-button :icon="Plus" round @click="addConfirm(photo.id)"></el-button>
                            <el-button :icon="Edit" round type="primary"></el-button>
                            <el-button :icon="Delete" type="danger" round @click="confirmDelete(photo.id)"></el-button>
                        </div>
                        <div class="m-2">
                            <div v-if="photo.photoAndColl.length > 0">
                                所属合集：{{ photo.photoAndColl[0].photoCollection.photoName }}
                            </div>
                            <div v-else>
                                未加入任何相册
                            </div>
                            <div>
                                <div>拍摄时间：{{ photo.photoShootTime }}</div>
                                <div>拍摄设备：{{ photo.photoMake + " " + photo.photoModel }}</div>
                            </div>
                        </div>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>

</template>

<style scoped></style>