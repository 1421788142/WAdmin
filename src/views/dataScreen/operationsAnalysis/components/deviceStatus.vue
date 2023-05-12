<template>
    <div class="h-[310px]">
        <contentBox title="枪口状态时长率分布" type="box" class="h-full">
            <template #prove>
                <question-circle-outlined @click="proveRef.visible = true" class="mr-2 text-xl cursor-pointer" />
            </template>
            <div class="w-[100%] h-[80%]">
                <!-- 今日统计 -->
                <div class="echarts" id="deviceStatus"></div>
            </div>
        </contentBox>

        <!-- 说明 -->
        <proveVue title="枪口状态时长率分布"
            info="展示选择时间内枪口状态时长率分布情况，其中枪口状态（空闲、充电中、插抢）时长 率=在线枪口的周期内实时状态时长/在线枪口的总服务时长%，枪口离网状态时长率= 在线枪口中掉线不超过24小时的时长/在线枪口的总服务时长%，故障时长率=（在线枪 口的周期内故障时长+在线枪口数掉线超过24小时的时长）/在线枪口数的总服务时长%"
            ref="proveRef" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import proveVue from "../../components/prove.vue";
import contentBox from '../../components/contentBox.vue';
import { ECharts, EChartsOption, init } from "echarts";

const proveRef = ref<any>()
let data = [
    { title: '全部', value: 324 },
    { title: '空闲', value: 23 },
    { title: '充电中', value: 182 },
    { title: '插枪', value: 42 },
    { title: '离网', value: 5 },
    { title: '故障', value: 2 },
]
const initChart = (): ECharts => {
    const charEle = document.getElementById("deviceStatus") as HTMLElement;
    const charEch: ECharts = init(charEle);
    const option: EChartsOption = {
        color: ['#05E8FE'],
        grid: {
            top: '5%',
        },
        tooltip: {
            trigger: "axis",
            confine: true,
            formatter: (params: any) => {
                let tipData = params[0];
                let html = `<div class="lineChart-bg">
                        <span>${tipData.name} ${tipData.value}元</span>
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
            data: data.map(x => x.title),
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
        width: max-content;
        height: 60px;
        padding: 0 10px;
        background: url("../../images/line-bg.png") no-repeat;
        background-size: 100% 100%;

        span {
            font-size: 20px;
            color: rgb(255 255 255 / 80%);
        }
    }
}
</style>