import { createRouter, createWebHistory } from 'vue-router'
import App from '@/views/App.vue'

const router = createRouter({
  history: createWebHistory('/mellow-motion-school-exercise/'),
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
