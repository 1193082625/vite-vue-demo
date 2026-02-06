<template>
  <div>
    <h1>Home</h1>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { getUserDetail } from '@/api/user'

const handleGetUserDetailFn = async () => {
  const res = await getUserDetail(1)
  console.log(res)
}

onMounted(() => {
  handleGetUserDetailFn()
})
</script>
