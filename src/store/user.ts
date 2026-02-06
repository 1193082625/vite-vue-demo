import { defineStore } from 'pinia'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
import { ref, computed } from 'vue'
import type { UserInfo } from '../types/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('aa')
    const userInfo = ref<UserInfo | null>(null)
    const isLogin = computed(() => !!token.value)

    const setToken = (val: string) => {
      token.value = val
    }

    const setUserInfo = (info: UserInfo | null) => {
      userInfo.value = info
    }

    const logOut = () => {
      token.value = ''
      userInfo.value = null
    }

    return {
      token,
      userInfo,
      isLogin,
      setToken,
      setUserInfo,
      logOut,
    }
  },
  {
    // 如果不需要持久化，则设置: persist: false
    persist: {
      key: 'user-store', // 持久化存储的 key
      storage: localStorage, // 持久化存储的类型 localStorage, sessionStorage, memory, indexedDB
      paths: ['token', 'userInfo'], // 持久化 token 和 userInfo
    } as PersistenceOptions,
  }
)
