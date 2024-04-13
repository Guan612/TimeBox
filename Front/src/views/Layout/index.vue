<script setup>
import haderBar from './component/haderBar.vue'
import sideBar from './component/sideBar.vue'
</script>

<template class="flex flex-col h-screen">
    <haderBar></haderBar>
    <div class="flex flex-row flex-1 overflow-hidden">
        <sideBar class="basis-1/6 hidden md:block"></sideBar>
        <router-view class="basis-5/6 flex-1"></router-view>
    </div>
</template>

<style scoped></style>