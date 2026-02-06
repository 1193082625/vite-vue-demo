<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <header class="h-[60px] w-full p-[20px] flex items-center justify-between">
      <div class="text-[20px] font-bold">Header</div>
      <div class="flex items-center gap-[10px]">
        <div class="cursor-pointer text-[14px] font-bold" @click="router.push('/')">首页</div>
        <div class="cursor-pointer text-[14px] font-bold" @click="router.push('/about')">关于我们</div>
      </div>
    </header>
    <!-- 确保 router-view 存在 -->
    <main class="flex-1 flex items-center justify-center">
      <router-view />
    </main>
  </div>
</template>
