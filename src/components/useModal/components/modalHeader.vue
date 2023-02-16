<template>
    <div class="flex items-center justify-between">
        <div class="flex items-center justify-center flex-1">
            <span>{{title}}</span>
        </div>
        <!-- 最小化 -->
        <minus-outlined :style="{ fontSize: '20px' }" @click="emit('modalMin')" />
        <!-- 全屏 -->
        <div class="flex items-center mx-4">
            <compress-outlined v-if="isFull" :style="{fontSize:'17px'}" @click="setup(false)" />
            <expand-outlined v-else :style="{fontSize:'17px'}" @click="setup(true)" />
        </div>
        <!-- 关闭 -->
        <CloseOutlined :style="{ fontSize: '20px' }" @click="()=>emit('cancel')" />
    </div>
</template>
<script setup lang="ts">
import { basicProps } from '../index'

const props = defineProps(basicProps)
const emit = defineEmits(['change','cancel','modalMin'])
const setup = (bol:boolean)=>{
    emit('change',bol)
}
</script>

<style lang="scss" scoped>

</style>