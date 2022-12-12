<template>
    <a-card title="登录过期实例" :bordered="false">
        <div>
            <div class="flex">
                <a-button type="primary" @click="loginExpired">HttpsStatus == 401</a-button>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import { loginExpired } from '@/apis/user'
</script>

<style scoped>

</style>