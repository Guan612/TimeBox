import {createRouter, createWebHistory} from 'vue-router'
import layout from '@/views/Layout/index.vue'
import login from '@/views/User/login.vue'
import register from "@/views/User/register.vue"
import photo from '@/views/Photo/index.vue'
import colleCard from '@/views/Photo/component/colleCard.vue'
import searchRes from '@/views/Searchres/index.vue'
import userCenter from '@/views/User/userCenter.vue'

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
          component:photo,
          meta: {title: "首页"},
        },
        {
          path: '/colle/:id',
          name: 'collection',
          component:colleCard,
          meta: {title: "照片合集详情"},
        },
        {
          path: '/searchres',
          name: 'searchres',
          component:searchRes,
          meta: {title: "搜索结果"},
        },
        {
          path: '/user',
          name: 'user',
          component:userCenter,
          meta: {title: "个人中心"},
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component:login,
      meta: {title: "登录"},
    },
    {
      path:'/register',
      name:'register',
      component:register,
      meta: {title: "注册"},
    }
  ]
})

export default router
