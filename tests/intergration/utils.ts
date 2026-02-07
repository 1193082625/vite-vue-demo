import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import zhCN from '@/i18n/lang/zh-CN'
import enUS from '@/i18n/lang/en-US'
import type { Pinia } from 'pinia'
import { mount } from '@vue/test-utils'
import type { Router } from 'vue-router'
import type { VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'

// 创建单例 i18n 实例，避免重复注册
let i18nInstance: ReturnType<typeof createI18n> | null = null

export function createTestRouter(routes: any[] = []) {
  return createRouter({
    history: createWebHistory(),
    routes:
      routes.length > 0
        ? routes
        : [
            { path: '/', component: () => import('@/views/home/index.vue') },
            { path: '/about', component: () => import('@/views/about/index.vue') },
            { path: '/login', component: () => import('@/views/Login/index.vue') },
          ],
  })
}

export function createTestPinia(): Pinia {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedState)
  setActivePinia(pinia)
  return pinia
}

export function createTestI18n() {
  // 如果已经创建过，直接返回
  if (i18nInstance) {
    return i18nInstance
  }

  i18nInstance = createI18n({
    legacy: false,
    locale: 'zh-CN',
    messages: {
      'zh-CN': zhCN,
      'en-US': enUS,
    },
  })

  return i18nInstance
}

/**
 * 挂载组件并注入所有依赖（用于集成测试）
 * 注意：不注册 i18n 和 AntDesignVue，因为它们已经在 setup.ts 中全局注册
 */
export function mountWithAllDependencies<T extends Component>(
  component: T,
  options?: {
    router?: Router
    pinia?: Pinia
    routes?: any[]
  }
): VueWrapper<InstanceType<T>> {
  const router = options?.router || createTestRouter(options?.routes)
  const pinia = options?.pinia || createTestPinia()

  // 不在这里注册 i18n 和 AntDesignVue，因为它们已经在 setup.ts 中全局注册
  // 如果注册会导致重复注册警告
  return mount(component, {
    global: {
      plugins: [router, pinia],
      // i18n 和 AntDesignVue 已经在 setup.ts 中全局注册，不需要再次注册
    },
  })
}
