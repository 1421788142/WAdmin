<template>
    <div class="flex bi-component items-center justify-center h-[45px] flex-1 text-xl text-[#29fcff]">
        <slot name="leftSlot"></slot>
        <span class="mr-4">{{ time }}</span>
        <a-popover trigger="click" overlayClassName="bi-component">
            <template #content>
                <div class="flex items-center bi-component">
                    <div class="mr-4">
                        <a-range-picker dropdownClassName="bi-component" v-model:value="query.time" />
                    </div>
                    <span class="left-btn w-[100px] h-[40px] text-base leading-[35px]">搜索</span>
                </div>
            </template>
            <search-outlined />
        </a-popover>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, onBeforeUnmount } from "vue";

import { useTime } from "@/hooks/useTime";
// 获取当前时间
const { nowTime } = useTime();
let timer: NodeJS.Timer | null = null;
let time: Ref<string> = ref(nowTime.value);
timer = setInterval(() => {
    time.value = useTime().nowTime.value;
}, 1000);

const query = ref<any>({
    time: []
})

// 销毁时触发
onBeforeUnmount(() => {
    clearInterval(timer!);
});
</script>
<style lang="scss"></style>