import {getUserHanderImgAPI} from '@/apis/user'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserHanderImgStore = defineStore(
    "userHImg",() => {
        const userHImg = ref('');
        
        const getUserHanderImg = async () => {
            const res = await getUserHanderImgAPI();
            if(res.result){
                userHImg.value = res.result;
            } else{
                userHImg.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
            }
            
        }

        return{userHImg,getUserHanderImg}
    },
    {
        persist: true,
        // 持久化
    }
)
    