<template>
    <div class="flex items-center justify-between pr-10">
        <div class="flex items-center justify-center flex-1">
            <span>{{title}}</span>
        </div>
        <a-tooltip v-if="sysMode === sysModeEnum.web" placement="bottom" :title="isFull ? '取消全屏' : '全屏'">
            <fullscreen-exit-outlined v-if="isFull" :style="{fontSize:'20px'}" @click="setup(false)" />
            <fullscreen-outlined v-else :style="{fontSize:'20px'}" @click="setup(true)" />
        </a-tooltip>
    </div>
</template>

<script setup lang="ts">
import { basicProps } from '../index'
import { sysModeEnum } from '@/enums/sys'
import config from '@/store/config';
const configStore = config()
const { sysMode } = configStore

const props = defineProps(basicProps)
const emit = defineEmits(['change'])
const setup = (bol:boolean)=>{
    emit('change',bol)
}
</script>

<style lang="scss" scoped>

</style>