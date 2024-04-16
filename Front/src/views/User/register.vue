<script setup>
import { ref } from 'vue';
import router from '@/router/';
import { registerAPI } from '@/apis/user';
import { PhoneFilled, Message, Avatar, Key } from '@element-plus/icons-vue'
import { checkboxEmits } from 'element-plus';

let imgSrc = ref('https://upload.wikimedia.org/wikipedia/commons/1/1a/Dolby_logo_2019.svg')

//表单数据
const userInfo = ref({
    loginid:"",
    password:"",
    nickname:"",
    email:"",
    phones:""
});

const gologin = async () => {
    const res = await registerAPI(userInfo.value);
    if (res) {
        router.push('/login')
    }
}

//校验规则
const rules = ref({
    loginid: [
        { required: true, message: '请输入登录id', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
    ],
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
    email: [
        { required: false, message: '请输入邮箱', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    phone: [
        { required: false, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
    ]
})

</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="flex flex-col items-center p-6 md:p-10 lg:p-15 rounded-lg card shadow-2xl">
            <div class="flex items-center mb-4">
                <div class="mr-2 md:m-3 lg:m-8 hidden md:block">
                    <img :src="imgSrc" alt="" class="w-20 h-10">
                </div>
                <el-form :rules='rules' label-position="right" label-width="auto" v-model="userInfo">
                    <el-form-item label="登录id" prop="loginid">
                        <el-input v-model="userInfo.loginid" style="width: 240px" placeholder="必填" clearable
                            :suffixIcon="Avatar" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="userInfo.password" style="width: 240px" type="password" placeholder="必填" show-password
                            :suffixIcon="Key" />
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="userInfo.nickname" style="width: 240px" placeholder="必填" clearable />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userInfo.email" style="width: 240px" placeholder="" clearable
                            :suffix-icon="Message" />
                    </el-form-item>
                    <el-form-item label="手机" prop="phone">
                        <el-input v-model="userInfo.phones" style="width: 240px" placeholder="" clearable
                            :suffix-icon="PhoneFilled" />
                    </el-form-item>
                </el-form>
            </div>
            <el-button class="m-2" @click="gologin(userInfo)" round type="primary">注册</el-button>
            <el-button class="m-2" @click="router.push('/login')" round>有账号了？去登录</el-button>
        </div>
    </div>
</template>

<style scoped>
.card {
    background: linear-gradient(to right, #5BCEFA, #F5A9B8)
}
</style>