import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { createTestPinia, createTestRouter, mountWithAllDependencies } from './utils'
import LoginPage from '@/views/Login/index.vue'
import { useUserStore } from '@/store/user'
import { flushPromises } from '@vue/test-utils'

// Mock API 函数
vi.mock('@/api/user', () => ({
  login: vi.fn(() =>
    Promise.resolve({
      token: 'test-token',
      userInfo: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      },
    })
  ),
}))

describe('登录流程集成测试', () => {
  let router: ReturnType<typeof createTestRouter>
  let pinia: ReturnType<typeof createTestPinia>

  beforeEach(() => {
    router = createTestRouter()
    pinia = createTestPinia()
    vi.clearAllMocks()
  })

  it('登录成功后应该跳转到首页并更新Store', async () => {
    // Arrange: 挂载登录页面
    const wrapper = mountWithAllDependencies(LoginPage, { router, pinia })
    const store = useUserStore()

    // 等待组件完全挂载
    await nextTick()
    await flushPromises()

    // Act: 查找输入框
    const inputs = wrapper.findAll('input')
    const usernameInput = inputs[0]
    const passwordInput = inputs[1]

    // 验证输入框存在
    expect(usernameInput.exists()).toBe(true)
    expect(passwordInput.exists()).toBe(true)

    // Act: 填写登录表单
    await usernameInput.setValue('admin')
    await passwordInput.setValue('password123')

    // 等待输入更新
    await nextTick()

    // Act: 提交表单
    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)

    await form.trigger('submit')

    // 等待 API 调用和路由跳转完成
    await nextTick()
    await flushPromises()
    await router.isReady()
    await nextTick()

    // Assert: 验证Store状态已更新
    expect(store.isLogin).toBe(true)
    expect(store.token).toBeTruthy()

    // Assert: 验证路由已跳转
    expect(router.currentRoute.value.path).toBe('/')
  })
})
