import {createRouter, createWebHistory} from 'vue-router'
import layout from '@/views/Layout/index.vue'
import userCenter from '@/views/User/index.vue'
import login from '@/views/User/component/login.vue'
import register from "@/views/User/component/register.vue"
import photo from '@/views/Photo/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: layout,
      children:[
        {
          path: '/',
          name: 'home',
          component:photo
        }
      ]
    },
    {
      path: '/user',
      name: 'userInfo',
      component: userCenter,
      children: [
        {
          path: '/user',
          name:'login',
          component: login,
        },
        {
          path:'/user/register',
          name:'register',
          component:register,
        }
      ]
    }
  ]
})

export default router
