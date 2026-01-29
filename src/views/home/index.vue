<template>
    <div>
        <h1>Home</h1>
        <div class="flex justify-center items-center">
            <a-button type="primary" @click="router.push('/about')">About</a-button>
        </div>
    </div>
</template>
<script setup lang="ts">
const router = useRouter()
</script>