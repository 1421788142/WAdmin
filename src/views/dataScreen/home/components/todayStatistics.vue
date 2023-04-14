<template>
    <div class="h-[100%]">
        <contentBox title="今日统计" type="boxMax" class="h-[100%]">
            <div class="w-[100%] h-[35%] p-2 flex justify-between flex-wrap">
                <div v-for="item in list" class="w-[50%] flex flex-col mb-4 items-center justify-center text-[#05E8FE]">
                    <div class="mb-2 text-2xl">{{ item.title }}</div>
                    <div class="text-4xl font-bold">{{ item.value }}</div>
                </div>
            </div>
            <div class="w-[100%] h-[45%] mt-[4%]">
                <!-- 今日统计 -->
                <div class="echarts" id="todayStatistics"></div>
            </div>
        </contentBox>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { toDay } from '@/apis/dataScreen/home';
import contentBox from './contentBox.vue';
import { toDayOrdersInterface } from '@/apis/dataScreen/home';
import { ECharts, EChartsOption, init } from "echarts";
interface listInterface {
    title: string,
    value: number,
    key: string,
}
const list = reactive<listInterface[]>([
    { title: '总订单(笔)', value: 0, key: 'totalOrders' },
    { title: '使用中订单(笔)', value: 0, key: 'useOrders' },
    { title: '耗电量(度)', value: 0, key: 'consumePower' },
    { title: '减少碳排放量(吨)', value: 0, key: 'discharge' },
])
const initChart = (data: toDayOrdersInterface[]): ECharts => {
    const charEle = document.getElementById("todayStatistics") as HTMLElement;
    const charEch: ECharts = init(charEle);
    const option: EChartsOption = {
        color: ['#05E8FE'],
        title: [
            {
                left: 'center',
                text: '订单趋势图',
                textStyle: { color: '#05E8FE', fontSize: '20px' },
            },
        ],
        tooltip: {
            trigger: "axis",
            confine: true,
            formatter: (params: any) => {
                let tipData = params[0];
                let html = `
                    <div class="lineChart-bg">
                        <span>${tipData.name}共有${tipData.value}笔订单</span>
                    </div>`;
                return html;
            },
            backgroundColor: "transparent", // 提示标签背景颜色
            borderColor: "transparent",
            axisPointer: {
                lineStyle: {
                    type: "dashed"
                },
                snap: true
            },
            extraCssText: "box-shadow: none;padding:0"
        },
        xAxis: {
            type: 'category',
            data: data.map(x => x.date),
            axisLine: {
                lineStyle: {
                    color: "#05E8FE",
                },
            },
            axisLabel: {
                fontSize: 20,
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: ['#005E61']
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#05E8FE"
                }
            },
            axisLabel: {
                fontSize: 20,
            }
        },
        series: [
            {
                data: data.map(x => x.value),
                type: 'bar'
            }
        ]
    }
    charEch.setOption(option);
    return charEch;
};

const initData = (data: toDay) => {
    list.forEach(x => x.value = data[x.key])
}

defineExpose({
    initChart,
    initData
});
</script>

<style lang="scss" scoped>
.echarts {
    width: 100%;
    height: 100%;

    :deep(.lineChart-bg) {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 220px;
        height: 60px;
        background: url("../images/line-bg.png") no-repeat;
        background-size: 100% 100%;

        span {
            font-size: 18px;
            color: #05FFFF;
        }
    }
}
</style>