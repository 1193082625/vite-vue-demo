<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <div class="flex items-center gap-[10px]">
    <div class="cursor-pointer text-[14px] font-bold" @click="router.push('/')">首页</div>
    <div class="cursor-pointer text-[14px] font-bold" @click="router.push('/about')">关于我们</div>
  </div>
</template>
