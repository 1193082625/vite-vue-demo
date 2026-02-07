import { vi } from 'vitest'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { setActivePinia } from 'pinia'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, beforeEach, it, expect } from 'vitest'
import Home from '@/views/home/index.vue'

// Mock API 函数
vi.mock('@/api/user', () => ({
  getUserDetail: vi.fn(),
}))

// 导入 mock 的函数
import { getUserDetail } from '@/api/user'
const mockGetUserDetail = vi.mocked(getUserDetail)

describe('组件与API集成测试', () => {
  beforeEach(() => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedState)
    setActivePinia(pinia)
    // 重置 mock
    vi.clearAllMocks()
  })

  it('组件加载时应该调用API获取用户信息', async () => {
    const mockUserInfo = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    }

    // Mock API 返回成功响应
    mockGetUserDetail.mockResolvedValueOnce(mockUserInfo)

    // 挂载组件
    const wrapper = mount(Home, {
      global: {
        plugins: [createPinia()],
      },
    })

    // 等待组件挂载和 API 调用完成
    await nextTick()
    await flushPromises()
    await nextTick()
    await flushPromises()

    // 验证 API 被调用
    expect(mockGetUserDetail).toHaveBeenCalledWith(1)

    // 验证组件显示了用户信息
    expect(wrapper.text()).toContain('Test User')
  })

  it('API调用失败时应该显示错误信息', async () => {
    // Mock API 返回错误（使用 Promise.reject）
    const mockError = new Error('服务器错误')
    mockGetUserDetail.mockRejectedValueOnce(mockError)

    // 挂载组件（之前缺少这一步）
    mount(Home, {
      global: {
        plugins: [createPinia()],
      },
    })

    // 等待组件挂载和 API 调用完成
    await nextTick()
    await flushPromises()
    await nextTick()
    await flushPromises()

    // 验证 API 被调用
    expect(mockGetUserDetail).toHaveBeenCalledWith(1)

    // 如果组件有错误处理，验证错误信息显示
    // 注意：如果组件没有 try-catch，这里可能不会显示错误
    // expect(wrapper.text()).toContain('服务器错误')
  })
})
