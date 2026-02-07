<script setup lang="ts">
import NavigationBar from './NavigationBar.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <header class="h-[60px] w-full p-[20px] flex items-center justify-between">
      <div class="text-[20px] font-bold">Header</div>
      <NavigationBar />
    </header>
    <!-- 确保 router-view 存在 -->
    <main class="flex-1 flex items-center justify-center">
      <router-view />
    </main>
  </div>
</template>
