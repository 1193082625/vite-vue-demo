import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/default.vue'
import type { App } from 'vue'
import { setupRouterGuard } from './guards'
// import { parseQuery, stringifyQuery } from './encryption'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About/index.vue'),
        meta: {
          title: '关于我们',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      title: '404',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // stringifyQuery, // 序列化query参数
  // parseQuery, // 反序列化query参数
  scrollBehavior(_, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

setupRouterGuard(router)

export default router

export function setupRouter(app: App) {
  app.use(router)
}
