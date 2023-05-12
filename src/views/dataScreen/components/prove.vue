<template>
    <a-modal class="prove-model" v-model:visible="visible" width="600px" :maskStyle="{
        background: 'none'
    }" title="图表说明" :footer="false">
        <template #closeIcon>
            <span class="right-btn w-[110px] h-[40px] text-base leading-[35px]">关闭</span>
        </template>
        <div class="text-lg text-[#29fcff]">页面以充电订单的推送成功时间进行统计，可展示3年内的数据情况。</div>
        <div class="mt-4">
            <span class="text-lg text-[#29fcff] mr-4">{{ title }}</span>
            <span class="text-lg text-[#00A0E9]">{{ info }}</span>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const visible = ref<boolean>(false)
const props = defineProps<{ title: string, info: string }>()
defineExpose({ visible })
</script>

<style lang="scss">
.prove-model {
    background-color: #0b3a4bec !important;
    background: url("../images/prove.png") no-repeat;
    background-size: 100% 100%;

    .ant-modal-content,
    .ant-modal-header {
        background: none !important;
    }

    .ant-modal-close-x {
        width: 120px !important;
        height: 50px !important;
        padding-top: 10px;
    }

    .ant-modal-close {
        top: 25px !important;
    }

    .ant-modal-header {
        border: none !important;
        padding: 40px 0 0 0 !important;
    }

    .ant-modal-title {
        color: #29fcff !important;
        text-align: center;
    }
}
</style>