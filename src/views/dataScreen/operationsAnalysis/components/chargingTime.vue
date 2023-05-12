<template>
    <div class="h-[310px] bi-component">
        <contentBox title="充电时间偏好" type="box" class="h-full">
            <template #subTitle>
                <div class="flex justify-end flex-1">
                    <div>
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="0" tab="电量"></a-tab-pane>
                            <a-tab-pane key="1" tab="金额"></a-tab-pane>
                            <a-tab-pane key="2" tab="次数"></a-tab-pane>
                        </a-tabs>
                    </div>
                </div>
            </template>
            <template #prove>
                <question-circle-outlined @click="proveRef.visible = true" class="mr-2 text-xl cursor-pointer" />
            </template>
            <div class="flex items-center justify-around">
                <div class="flex justify-end bg-[#085c5dde] search-box">
                    <a-date-picker valueFormat="YYYY-MM" dropdownClassName="bi-component" v-model:value="currentTime"
                        picker="month" />
                </div>
                <div class="w-[72%] relative mt-[-20px]">
                    <a-calendar class="bi-component" v-model:value="currentTime" valueFormat="YYYY-MM">
                        <template #headerRender></template>
                        <template #dateFullCellRender="{ current }">
                            <div class="py-[2px] text-xl text-center">
                                <span class="text-[#fff]">{{ showValue(current) }}</span>
                            </div>
                        </template>
                    </a-calendar>
                </div>
            </div>
        </contentBox>

        <!-- 说明 -->
        <proveVue title="充电时间偏好" info="展示一个月内的充电时间偏好行为情况" ref="proveRef" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import proveVue from "../../components/prove.vue";
import contentBox from '../../components/contentBox.vue';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

const proveRef = ref<any>()
const activeKey = ref<string>('0')
const unit = ['度', '元', '次']

const dataArr = Array.from({ length: 32 }, () => Math.floor(Math.random() * 250) + 1);

const currentTime = ref<string>(dayjs().format('YYYY-MM')) //当前年月

const showValue = (time: Dayjs) => {
    let M = dayjs(currentTime.value || dayjs()).format('M') //当前月份
    let MM = dayjs(time).format('M') //日历月份
    let D = Number(dayjs(time).format('D')) - 1 //当前日期
    if (M !== MM) {
        return ''
    } else {
        return dataArr[D!] ? `${dataArr[D]}${unit[activeKey.value]}` : '-'
    }
}

</script>

<style lang="scss"></style>