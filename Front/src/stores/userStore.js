import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import router from '@/router'

//存储用户信息
export const useUserStore = defineStore(
    'user', () => {
        const userInfo = ref({})
        const getuserInfo = async (user) => {
            const res = await loginAPI(user)
            //console.log(res)
            userInfo.value = res.result
            if(res){
                router.push('/')
            }
        }

        //退出登录
        const logout = () => {
         userInfo.value = {}
        }
        return { userInfo, getuserInfo,logout }
    },
    {
        persist: true
    }
)