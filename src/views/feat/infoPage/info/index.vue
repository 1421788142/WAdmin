<template>
    <a-card title="这是详情页" :bordered="false">
        <div>
            <div class="my-5">组件拿到参数为{{params}}</div>
            <div class="flex">
                <a-button type="primary">
                    <router-link type="" :to="'/feat/infoPage'">返回上一页</router-link>
                </a-button>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const params = route.params
</script>

<style scoped>

</style>