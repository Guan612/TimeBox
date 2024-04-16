import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { searchPhotoCollectionAPI } from '@/apis/photo'
import router from '@/router'

export const useSearchStore = defineStore(
    'search', () => {
        const keyword = ref('');
        const searchRes = ref([]);

        const search = async () => {
            const res = await searchPhotoCollectionAPI(keyword.value);
            searchRes.value = res.result;
            //console.log(res.reslut)
            router.push('/searchres')
        }


        return { keyword,searchRes,search }
    }
)