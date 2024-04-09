import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'


//存储用户信息
export const useUserStore = defineStore(
    'user', () => {
        const userInfo = ref({})
        const getuserInfo = async (user) => {
            const res = await loginAPI(user)
            userInfo.value = res.data
        }
        return { userInfo, getuserInfo }
    },
    {
        persist: true
    }
)