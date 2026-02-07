import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/store/user'

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('初始状态', () => {
    it('应该有默认的token', () => {
      const store = useUserStore()
      expect(store.token).toBe('aa')
      expect(store.isLogin).toBe(true)
    })

    it('userInfo应该为null', () => {
      const store = useUserStore()
      expect(store.userInfo).toBeNull()
    })
  })

  describe('setToken', () => {
    it('应该设置token', () => {
      const store = useUserStore()
      store.setToken('test-token')
      expect(store.token).toBe('test-token')
      expect(store.isLogin).toBe(true)
    })

    it('设置空 token 后，isLogin应该为false', () => {
      const store = useUserStore()
      store.setToken('')
      expect(store.token).toBe('')
      expect(store.isLogin).toBe(false)
    })
  })

  describe('setUserInfo', () => {
    it('应该设置userInfo', () => {
      const store = useUserStore()
      const mockUserInfo = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St, Anytown, USA',
        city: 'Anytown',
        state: 'CA',
      }
      store.setUserInfo(mockUserInfo)
      expect(store.userInfo).toEqual(mockUserInfo)
    })

    it('应该可以清空用户信息', () => {
      const store = useUserStore()
      store.setUserInfo({ id: 1, name: 'ceshi' })
      store.setUserInfo(null)
      expect(store.userInfo).toBeNull()
    })
  })

  describe('logOut', () => {
    it('应该清空token和userInfo', () => {
      const store = useUserStore()
      store.setToken('test-token')
      store.setUserInfo({ id: 1, name: 'ceshi' })
      store.logOut()
      expect(store.token).toBe('')
      expect(store.userInfo).toBeNull()
    })
  })
})
