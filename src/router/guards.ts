import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    // 设置页面标题
    if (to.meta.title) {
      document.title = to.meta.title as string
    }

    // 检查是否需要登录
    if (to.meta.requiresAuth) {
      // 动态导入 store，确保 Pinia 已初始化
      const { useUserStore } = await import('@/store/user')
      const userStore = useUserStore()

      if (!userStore.isLogin) {
        next({ name: 'Login', query: { redirect: to.fullPath } })
        return
      }
    }

    next()
  })

  // 全局后置守卫
  router.afterEach((to, from) => {
    // 可以在这里添加页面访问统计等逻辑
    console.log('页面访问统计:', to, from)
  })

  // 错误处理
  router.onError(error => {
    console.error('路由错误:', error)
  })
}
