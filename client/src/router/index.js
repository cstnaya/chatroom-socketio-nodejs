import { createRouter, createWebHistory } from 'vue-router'
import JoinView from '@/views/JoinView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: JoinView
    },
    {
      path: '/chat',
      component: () => import('@/views/ChatView.vue')
    }
  ]
})

export default router
