<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import IconList from '@/assets/icons/list.svg'
import { env } from '@/utils/env'
import { useUserStore } from '@/store/user'

defineProps<{ msg: string }>()

const count = ref(0)
const appTitle = computed(() => env.appTitle)
const userStore = useUserStore()
onMounted(() => {
  console.log('appTitle', env.appTitle)
  console.log('userStore', userStore.token)
})
</script>

<template>
  <h1>{{ appTitle }}</h1>
  <p v-if="msg" class="msg">{{ msg }}</p>
  <IconList class="icon-current-color w-[40px] h-[40px] text-red-500" />
  <a-button type="primary">Primary Button</a-button>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
  </p>
  <p class="read-the-docs font-bold text-red-500">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped lang="scss">
.read-the-docs {
  &:hover {
    color: $primary-color;
  }
}
</style>
