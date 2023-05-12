<template>
    <div class="h-[310px]">
        <contentBox title="接入增长率趋势" type="box" class="h-full">
            <template #prove>
                <question-circle-outlined @click="proveRef.visible = true" class="mr-2 text-xl cursor-pointer" />
            </template>
            <div class="w-[100%] h-[75%]">
                <!-- 今日统计 -->
                <div class="echarts" id="growthTrends"></div>
            </div>
        </contentBox>

        <!-- 说明 -->
        <proveVue title="接入增长率趋势" info="展示平台资产信息的增长率趋势，其中增长率=（本期累计数-上期累计数）/上期累计数%，本期累计数-上期累计数=本期新增数" ref="proveRef" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import proveVue from "../../components/prove.vue";
import contentBox from '../../components/contentBox.vue';
import { color, ECharts, EChartsOption, init } from "echarts";

const proveRef = ref<any>()
let data = [
    {
        title: '商户增长率',
        value: [
            { date: '2022-10-31', value: 44 },
            { date: '2022-11-30', value: 2 },
            { date: '2022-12-31', value: 3 },
            { date: '2023-1-31', value: 12 },
            { date: '2023-2-28', value: 3 },
            { date: '2023-3-31', value: 4 },
        ]
    },
    {
        title: '场站增长率',
        value: [
            { date: '2022-10-31', value: 213 },
            { date: '2022-11-30', value: 12 },
            { date: '2022-12-31', value: 3 },
            { date: '2023-1-31', value: 4 },
            { date: '2023-2-28', value: 66 },
            { date: '2023-3-31', value: 23 },
        ]
    },
    {
        title: '快充接口增长率',
        value: [
            { date: '2022-10-31', value: 213 },
            { date: '2022-11-30', value: 2 },
            { date: '2022-12-31', value: 3 },
            { date: '2023-1-31', value: 175 },
            { date: '2023-2-28', value: 122 },
            { date: '2023-3-31', value: 146 },
        ]
    },
    {
        title: '慢充接口增长率',
        value: [
            { date: '2022-10-31', value: 213 },
            { date: '2022-11-30', value: 4 },
            { date: '2022-12-31', value: 3 },
            { date: '2023-1-31', value: 1 },
            { date: '2023-2-28', value: 122 },
            { date: '2023-3-31', value: 146 },
        ]
    },
]
const initChart = (): ECharts => {
    const charEle = document.getElementById("growthTrends") as HTMLElement;
    const charEch: ECharts = init(charEle);
    const option: EChartsOption = {
        legend: {
            data: data.map(x => x.title),
            textStyle: {
                color: "#7ec7ff",
                fontSize: 18
            },
        },
        tooltip: {
            trigger: "axis",
            confine: true,
            formatter: (params: any) => {
                let tipData = params[0];
                let html = `<div class="lineChart-bg">
                        <span>${tipData.name} ${tipData.value}%</span>
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
        grid: {
            left: '5%',
            right: '12%',
            bottom: '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                show: true,
                color: "#7ec7ff",
                padding: 0,
                fontSize: 18,
            },
            data: ['2022-10-31', '2022-11-30', '2022-12-31', '2023-1-31', '2022-2-28', '2022-3-31'],
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                color: "#7ec7ff",
                padding: 0,
                fontSize: 18,
            },
            axisLine: {
                show: false,
            },
        },
        dataZoom: {
            textStyle: { //滚动条两边字体样式
                color: "#7ec7ff",
                fontSize: 20
            },
            show: true, // 为true 滚动条出现
            realtime: true,
            type: 'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
            height: 20, // 表示滚动条的高度，也就是粗细
            start: 20, // 表示默认展示20%～80%这一段。
            end: 80,
        },
        series: data.map(x => {
            return {
                name: x.title,
                type: 'line',
                stack: 'Total',
                data: x.value.map(x => x.value)
            }
        })
    }
    charEch.setOption(option);
    return charEch;
};

defineExpose({
    initChart,
});

</script>

<style scoped lang="scss">
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
        background: url("../../images/line-bg.png") no-repeat;
        background-size: 100% 100%;

        span {
            font-size: 18px;
            color: #05FFFF;
        }
    }
}
</style>