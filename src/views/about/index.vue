<template>
    <div>
        <h1>About</h1>
        <div class="flex justify-center items-center">
            <a-button type="primary" @click="router.push('/')">Home</a-button>
        </div>
    </div>
</template>
<script setup lang="ts">
const router = useRouter()
</script>