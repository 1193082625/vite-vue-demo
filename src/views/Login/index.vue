<template>
  <div>
    <h1>Login</h1>
    <a-form :model="form" :rules="rules" @finish="handleFinish">
      <a-form-item name="username" label="Username">
        <a-input v-model:value="form.username" />
      </a-form-item>
      <a-form-item name="password" label="Password">
        <a-input-password v-model:value="form.password" />
        <!-- 或者使用 a-input 并设置 type -->
        <!-- <a-input v-model:value="form.password" type="password" /> -->
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api/user'

const form = ref({
  username: '',
  password: '',
})
const rules = ref({
  username: [{ required: true, message: 'Please input your username!' }],
  password: [{ required: true, message: 'Please input your password!' }],
})
const handleFinish = (values: any) => {
  console.log(values)
  login(values).then(res => {
    console.log(res)
  })
}
</script>

<style scoped lang="scss"></style>
