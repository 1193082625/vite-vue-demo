<template>
  <div>
    <h1>{{ t('home.welcome') }}</h1>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { getUserDetail } from '@/api/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const handleGetUserDetailFn = async () => {
  const res = await getUserDetail(1)
  console.log(res)
}

onMounted(() => {
  handleGetUserDetailFn()
})
</script>
