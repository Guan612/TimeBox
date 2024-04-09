import axios from "axios"
import {useUserStore} from '@/stores/userStore'

const http =  axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 2000
})

//请求拦截器
http.interceptors.request.use(
    async (config)=>{
        const userStore = useUserStore()
        const token = await userStore.userInfo.token
        config.haders['Authorization'] = `Bearer ${token}`
        return config
    },
    (error)=>{
        console.log(error)
        return Promise.reject(error)
    }
);

//响应拦截器
http.interceptors.response.use(
    (response)=>{
        return response.data;
    },
    (error)=>{
        console.log(error)
        return Promise.reject(error);
    }
)

export default http;