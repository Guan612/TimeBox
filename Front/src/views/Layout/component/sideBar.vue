<script setup>
import { ref, watch, onMounted } from 'vue';
import router from '@/router';

// 创建一个响应式变量来保存当前活动的路由
const activeRoute = ref('/');

// 点击时更新活动路由
const updateActiveRoute = (route) => {
  activeRoute.value = route;
};

</script>

<template>
  <div class="flex flex-col bg-transblue h-screen justify-between">
    <div class="mt-5">
      <div class="m-5 p-3 bg-transblue rounded-xl hover:bg-transpink transition-all duration-300 cursor-pointer"
        :class="{ 'bg-transpink': activeRoute === '/', 'bg-transblue': activeRoute !== '/' }"
        @click="updateActiveRoute('/'); router.push('/')">首页</div>
      <div class="m-5 p-3 bg-transblue rounded-xl hover:bg-transpink transition-all duration-300 cursor-pointer"
        :class="{ 'bg-transpink': activeRoute === '/myphotocoll', 'bg-transblue': activeRoute !== '/myphotocoll' }"
        @click="updateActiveRoute('/myphotocoll'); router.push('/myphotocoll')">我的照片集
      </div>
      <div class="m-5 p-3 bg-transblue rounded-xl hover:bg-transpink transition-all duration-300 cursor-pointer"
        :class="{ 'bg-transpink': activeRoute === '/myphoto', 'bg-transblue': activeRoute !== '/myphoto' }"
        @click="updateActiveRoute('/myphoto'); router.push('/myphoto')">我的照片</div>
      <div class="m-5 p-3 bg-transblue rounded-xl hover:bg-transpink transition-all duration-300 cursor-pointer"
        :class="{ 'bg-transpink': activeRoute === '/favorite', 'bg-transblue': activeRoute !== '/favorite' }">
        最爱精选
      </div>
    </div>
    <div class="self-end mt-auto">
      <div class="m-5 p-3 bg-transblue rounded-xl hover:bg-transpink transition-all duration-300 cursor-pointer"
        :class="{ 'bg-transpink': activeRoute === '/about', 'bg-transblue': activeRoute !== '/about' }"
        @click="updateActiveRoute('/about'); router.push('/about')">关于</div>
    </div>
  </div>
</template>

<style scoped></style>