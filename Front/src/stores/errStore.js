import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useErrStore = defineStore('err', () => {
    const err = ref(null)
    const errMsg = computed(() => {
        if (err.value) {
            return err.value.message
        }
        return ''
    })
    return { err, errMsg }
    // 定义其他相关状态
})