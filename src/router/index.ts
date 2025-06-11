import { createRouter, createWebHistory } from 'vue-router'
import App from '@/views/App.vue'

const router = createRouter({
  history: createWebHistory('/sd3-p12-md-project-2425-mellow-motion/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
    },
    {
      path: '/game-container',
      name: 'game-container',
      component: () => import('@/views/GameContainer.vue'),
    }
  ],
})

export default router
