<template>
    <div class="flex items-center justify-between">
        <div v-for="item in list" class="flex items-center">
            <div class="flex justify-center mr-4">
                <w-svg-icon :iconStyle="iconStyle" :name="item.icon"></w-svg-icon>
            </div>
            <div>
                <div class="flex justify-center text-2xl">{{ item.title }}</div>
                <div class="flex items-center justify-start">
                    <span class="text-2xl">{{ item.value }}</span>
                    <span class="text-2xl">{{ item.unit }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { deviceNum } from '@/apis/dataScreen/home';

interface listInterface {
    title: string,
    icon: string,
    value: number,
    key: string,
    unit: string
}

const iconStyle = { width: 50, height: 50 }

const list = reactive<listInterface[]>([
    { title: '小区数量', icon: 'village', value: 0, key: 'parkNum', unit: '个' },
    { title: '站点数量', icon: 'address', value: 0, key: 'siteNum', unit: '个' },
    { title: '设备数量', icon: 'device', value: 0, key: 'deviceNum', unit: '台' },
    { title: '插口数量', icon: 'charge', value: 0, key: 'spigotNum', unit: '个' },
])

const initData = (data: deviceNum) => {
    list.forEach(x => x.value = data[x.key])
}
defineExpose({
    initData
});
</script>

<style scoped></style>