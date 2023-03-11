<template>
    <a-card title="Icon 选择" :bordered="false">
        <div class="w-[40%] my-5"><w-icon-picker v-model:icon="icon" /></div>
        <a-input class="!w-[400px]" v-model:value="icon" addon-before="v-model:icon绑定值" disabled />
    </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const icon = ref<string>('')
</script>

<style scoped>

</style>