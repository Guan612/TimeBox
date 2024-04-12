<script setup>
import haderBar from './component/haderBar.vue'
import sideBar from './component/sideBar.vue'
</script>

<template class="flex flex-col">
    <haderBar></haderBar>
    <div class="flex flex-row w-full">
        <sideBar class="basis-1/5 hidden md:block"></sideBar>
        <router-view class="basis-4/5"></router-view>
    </div>
</template>

<style scoped></style>