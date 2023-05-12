<template>
    <div class="h-[310px]">
        <contentBox title="场站行业类型" type="box" class="h-full">
            <template #prove>
                <question-circle-outlined @click="proveRef.visible = true" class="mr-2 text-xl cursor-pointer" />
            </template>
            <div class="w-[100%] h-[80%] flex justify-between items-center">
                <!-- 今日统计 -->
                <div class="echarts w-[40%]" id="parkTypeColumn"></div>
                <div class="echarts w-[60%]" id="parkTypeCake"></div>
            </div>
        </contentBox>

        <!-- 说明 -->
        <proveVue title="场站行业类型" info="展示充电场站类型,行业类型的分布情况" ref="proveRef" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import proveVue from "../../components/prove.vue";
import contentBox from '../../components/contentBox.vue';
import { ECharts, EChartsOption, init } from "echarts";

const proveRef = ref<any>()
let data = [
    { title: '停车场', value: 23 },
    { title: '广场', value: 182 },
]
const initChart = (): ECharts[] => {
    const charEleColumn = document.getElementById("parkTypeColumn") as HTMLElement;
    const charEleCake = document.getElementById("parkTypeCake") as HTMLElement;
    const charEch: ECharts = init(charEleColumn);
    const charEchCake: ECharts = init(charEleCake);
    const optionColumn: EChartsOption = {
        color: ['#05E8FE'],
        grid: {
            top: '5%',
            left: '20%'
        },
        tooltip: {
            trigger: "axis",
            confine: true,
            formatter: (params: any) => {
                let tipData = params[0];
                let html = `
                    <div class="lineChart-bg">
                        <span>${tipData.name}共有${tipData.value}个</span>
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
    const optionCake: EChartsOption = {
        tooltip: {
            trigger: "item",
            formatter: "{b} :  {c}个",
            className: 'tooltipCar',
            backgroundColor: "transparent", // 提示标签背景颜色
            borderColor: "transparent",
            axisPointer: {
                lineStyle: {
                    type: "dashed"
                },
                snap: true
            },
            extraCssText: "box-shadow: none;padding:20px"
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    color: '#05E8FE',
                    fontSize: 18
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: 1048, name: `专业-1048` },
                    { value: 300, name: `公用-300` }
                ]
            }
        ]
    }
    charEch.setOption(optionColumn);
    charEchCake.setOption(optionCake);
    return [charEch, charEchCake];
};

defineExpose({
    initChart,
});

</script>

<style scoped lang="scss">
.echarts {
    height: 100%;

    :deep(.lineChart-bg),
    :deep(.tooltipCar) {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: max-content;
        height: 60px;
        padding: 0 10px;
        background: url("../../images/line-bg.png") no-repeat;
        background-size: 100% 100%;
        font-size: 20px !important;
        color: #fff !important;
    }
}
</style>