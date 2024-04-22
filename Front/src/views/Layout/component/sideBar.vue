<script setup>
import { ref } from 'vue';
import router from '@/router';

</script>

<template>
  <div class="flex flex-col bg-transblue h-screen">
    <div class="mt-5">
      <div class="m-5 p-3 bg-transblue rounded-xl hover:bg-transpink transition-all duration-300 cursor-pointer"
        @click="router.push('/')">首页</div>
      <div class="m-5 p-3 bg-transblue rounded-xl hover:bg-transpink transition-all duration-300 cursor-pointer"
        @click="router.push('/myphotocoll')">我的照片集
      </div>
      <div class="m-5 p-3 bg-transblue rounded-xl hover:bg-transpink transition-all duration-300 cursor-pointer"
        @click="router.push('/myphoto')">我的照片</div>
      <div class="m-5 p-3 bg-transblue rounded-xl hover:bg-transpink transition-all duration-300 cursor-pointer">最爱精选
      </div>
    </div>
    <div>
      关于
    </div>
  </div>
</template>

<style scoped></style>