<script setup>
import haderBar from './component/haderBar.vue'
import sideBar from './component/sideBar.vue'
</script>

<template>
    <!-- <div class="flex flex-row">
        <sideBar class="basis-1/7 hidden md:block"></sideBar>
        <div class="flex flex-col basis-6/7">
            <haderBar class=""></haderBar>
            <router-view class="basis-5/6 flex-1"></router-view>
        </div>
    </div> -->
    <div class="flex flex-col h-screen">
        <haderBar></haderBar>
        <div class="flex flex-row flex-1 overflow-hidden">
            <sideBar class="basis-1/6 hidden md:block"></sideBar>
            <router-view class="basis-5/6 flex-1"></router-view>
        </div>
    </div>
</template>

<style scoped></style>