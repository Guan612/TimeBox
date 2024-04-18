<script setup>
import { ref } from 'vue';
import router from '@/router';

const logoImg = ref('https://upload.wikimedia.org/wikipedia/commons/1/1a/Dolby_logo_2019.svg')
</script>

<template>
  <div class="flex flex-col bg-transblue h-screen">
    <div class="m-7 md:m-10 text-center">
      <img :src="logoImg" class="bg-center w-20 ml-5 hover:scale-110 transition-all duration-300"
        @click="router.push('/')">
    </div>

    <div class="h-10">3</div>
  </div>
</template>

<style scoped></style>