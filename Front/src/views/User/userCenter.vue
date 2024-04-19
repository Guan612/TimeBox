<script setup>
import {ref} from 'vue'
import { useUserStore } from '@/stores/userStore';
import { useUserHanderImgStore } from '@/stores/userHaderImgStore';
import { ElButton } from 'element-plus';
const userStore = useUserStore();
const userHanderImgStore = useUserHanderImgStore();

const nickname = ref('');
const oldpwd = ref('');
const newpwd = ref('');
const loginid = ref('');

//退出登录
const logout = () =>{
    userStore.logout();
    userHanderImgStore.logoutImg();
}

//上传头像组件
//const imageUrl = ref('')

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL()
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

</script>

<template>
    <div class="flex flex-col">
        <div class="m-2 md:m-5">
            <ElCollapse>
                <el-collapse-item title="账户" name="1" class="m-2">
                    <el-collapse-item title="账户信息" class="m-2">
                        <div>账户id：{{ userStore.userInfo.userInfo.id }}</div>
                        <div>账户登录id：{{ userStore.userInfo.userInfo.loginid }}</div>
                        <div>账户昵称：{{ userStore.userInfo.userInfo.nickname }}</div>
                        <div>
                            <ElButton type="primary" round @click="logout">退出登录</ElButton>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="修改账户信息" class="m-2">
                        <div class="m-2 p-3">
                            <div>修改头像</div>
                            <el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </div>
                        <div class="m-2">
                            <div>修改昵称</div>
                            <ElInput v-model="nickname" placeholder="请输入昵称" class="m-1"></ElInput>
                            <ElButton type="primary" round>确定</ElButton>
                        </div>
                        <div class="m-2">
                            <div>修改密码</div>
                            <ElInput v-model="oldpwd" placeholder="请输入旧密码" class="m-1"></ElInput>
                            <ElInput v-model="newpwd" placeholder="请输入新密码" class="m-1"></ElInput>
                            <ElButton type="primary" round>确定</ElButton>
                        </div>
                        <div class="m-2">
                            <div>注销账户</div>
                            <ElInput v-model="loginid" placeholder="请输入登录id" class="m-1"></ElInput>
                            <ElButton type="danger" round>注销账户</ElButton>
                        </div>
                    </el-collapse-item>
                </el-collapse-item>
                <el-collapse-item title="照片管理" name="2" class="m-2">
                    <div>管理上传的照片集</div>
                </el-collapse-item>
                <el-collapse-item title="Consistency" name="3" class="m-2">
                    <div>测速</div>
                </el-collapse-item>
            </ElCollapse>
        </div>
    </div>
</template>

<style scoped></style>