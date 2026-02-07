<template>
  <div>
    <h1>{{ t('home.welcome') }}</h1>
    <h1>{{ userInfo.name }}</h1>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserDetail } from '@/api/user'
import { useI18n } from 'vue-i18n'
import type { UserInfo } from '@/types/user'

const { t } = useI18n()
const errorMessage = ref('')
const userInfo = ref<UserInfo>({
  id: 0,
  name: '',
  email: '',
})

const handleGetUserDetailFn = async () => {
  try {
    errorMessage.value = ''
    const res = await getUserDetail(1)
    // getUserDetail 返回的是 UserInfo，不是 ApiResponse
    // 所以直接赋值即可
    userInfo.value = res as UserInfo
  } catch (error: any) {
    // 处理错误
    errorMessage.value = error?.message || error?.response?.data?.message || '请求失败'
    console.error('获取用户信息失败:', error)
  }
}

onMounted(() => {
  handleGetUserDetailFn()
})
</script>
