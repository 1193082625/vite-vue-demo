<template>
  <div>
    <h1>Login</h1>
    <a-form :model="form" :rules="rules" @finish="handleFinish">
      <a-form-item name="username" label="Username">
        <a-input v-model:value="form.username" />
      </a-form-item>
      <a-form-item name="password" label="Password">
        <a-input-password v-model:value="form.password" />
      </a-form-item>
      <!-- 显示错误信息 -->
      <a-form-item v-if="errorMessage">
        <div class="error-message">{{ errorMessage }}</div>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { login } from '@/api/user'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

const form = ref({
  username: '',
  password: '',
})
const errorMessage = ref('')

const rules = ref({
  username: [{ required: true, message: 'Please input your username!' }],
  password: [{ required: true, message: 'Please input your password!' }],
})

const handleFinish = async (values: any) => {
  try {
    errorMessage.value = ''
    const res = await login(values)

    // login 函数成功时返回的是 data（{ token, userInfo }）
    // 失败时会 reject，进入 catch
    if (res && typeof res === 'object' && 'token' in res) {
      // 登录成功
      message.success('登录成功')
      router.push('/')
    }
  } catch (error: any) {
    // 处理错误
    // 错误可能是 ApiResponse 格式（从拦截器 reject 的）
    console.error('Login error:', error)

    if (error && typeof error === 'object') {
      // 检查是否是 ApiResponse 格式的错误
      if ('code' in error && 'message' in error) {
        errorMessage.value = error.message || '登录失败'
      } else if ('response' in error && error.response?.data?.message) {
        errorMessage.value = error.response.data.message
      } else if ('message' in error) {
        errorMessage.value = error.message
      } else {
        errorMessage.value = '用户名或密码错误'
      }
    } else {
      errorMessage.value = '用户名或密码错误'
    }

    // 确保错误信息更新后，DOM 也会更新
    await nextTick()
    message.error(errorMessage.value)
  }
}
</script>

<style scoped lang="scss">
.error-message {
  color: #ff4d4f;
  font-size: 14px;
}
</style>
