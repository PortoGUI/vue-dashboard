import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/index.vue')
const Feedback = () => import('../views/feedback/index.vue')
const Credential = () => import('../views/credential/index.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    meta: {
      requersAuth: true
    }
  },
  {
    path: '/credential',
    name: 'Credential',
    component: Credential,
    meta: {
      requersAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
