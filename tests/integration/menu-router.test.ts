import { describe, beforeEach, it, vi, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import About from '@/views/About/index.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// Mock API 请求，避免测试时发送真实请求
vi.mock('@/api/user', () => ({
  getUserDetail: vi.fn(() =>
    Promise.resolve({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    })
  ),
  login: vi.fn(() =>
    Promise.resolve({
      token: 'test-token',
      userInfo: { id: 1, name: 'Test User' },
    })
  ),
}))

describe('测试菜单路由', () => {
  let router: ReturnType<typeof createRouter>

  beforeEach(() => {
    // 创建测试用的Router
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: Home,
        },
        {
          path: '/about',
          component: About,
        },
      ],
    })

    const pinia = createPinia()
    pinia.use(piniaPluginPersistedState)
    setActivePinia(pinia)
  })

  it('路由变化应该更新组件显示', async () => {
    await router.push('/')
    await router.isReady()

    const wrapper = mount(
      {
        template: '<router-view />',
      },
      {
        global: {
          plugins: [router],
        },
      }
    )

    await router.push('/about')
    await nextTick()

    expect(wrapper.text()).toContain('About')
  })
})
