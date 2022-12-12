<template>
    <a-card title="跳转详情页(这是主页面)" :bordered="false">
        <div>
            <div class="my-5">当前参数为{{params}}</div>
            <div class="flex">
                <a-input class="!w-[200px]" v-model:value="params.id"></a-input>
                <a-button type="primary" class="mx-5" :disabled="!params.id">
                    <router-link type="" :to="'/feat/infoPage/detail/'+params.id">跳转详情页</router-link>
                </a-button>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const params = ref<any>({
    id:''
})
</script>

<style scoped>

</style>