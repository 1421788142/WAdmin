<template>
    <div class="w-[100%] h-[100%]">
        <span>测试缓存</span> <a-input v-model:value="value"></a-input>
        <a-date-picker v-model:value="value" />
        <a-calendar :fullscreen="false" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref<string>('')
</script>

<style scoped></style>