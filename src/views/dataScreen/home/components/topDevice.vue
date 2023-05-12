<template>
    <div class="h-[100%]">
        <contentBox title="设备数量排行统计" type="box" class="h-[100%]">
            <div class="header">
                <span>排名</span>
                <span>小区名称</span>
                <span>使用数量</span>
            </div>
            <vue3-seamless-scroll :list="alarmData" class="dataScreen-alarm" :step="0.5" :hover="true"
                :limitScrollNum="alarmData.length">
                <div class="flex text-xl my-2 text-[#05E8FE] map-item" v-for="item, index in alarmData" :key="item.id">
                    <div class="w-[18%] text-center">{{ index + 1 }}</div>
                    <div class="w-[62%]">{{ item.name }}</div>
                    <div class="w-[20%] text-center">{{ item.value }}</div>
                </div>
            </vue3-seamless-scroll>
        </contentBox>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import contentBox from '../../components/contentBox.vue';
import { topDevice } from '@/apis/dataScreen/home'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

const alarmData = ref<topDevice[]>([])

const initData = (data: topDevice[]) => {
    alarmData.value = data
}

defineExpose({
    initData
});

</script>

<style lang="scss" scoped>
.dataScreen-alarm {
    height: 55%;
    overflow: hidden;
}

.header {
    box-sizing: border-box;
    display: flex;
    height: 36px;
    margin: 10px 10px 0;
    line-height: 36px;

    span {
        width: 18%;
        margin-left: 4px;
        font-size: 20px;
        font-weight: bold;
        color: #05FFFF;
        text-align: center;

        &:nth-child(2) {
            width: 62%;
            text-align: left;
        }

        &:last-child {
            width: 20%;
            margin-left: 60px;
        }
    }
}
</style>