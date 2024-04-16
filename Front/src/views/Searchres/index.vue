<script setup>
import {useSearchStore} from '@/stores/searchStore'
import { onMounted, ref } from 'vue';

const searchStore = useSearchStore()

</script>

<template>
    <div>搜索结果</div>
    <div v-for="item in searchStore.searchRes">
        <div>{{item.photoName}}</div>
    </div>
</template>

<style scoped>

</style>