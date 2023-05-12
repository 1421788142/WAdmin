<template>
    <div class="h-[310px]">
        <contentBox title="场站对比" subTitle="区块大小代表枪口数值,颜色深浅代表电量多少" type="box" class="h-full">
            <template #prove>
                <question-circle-outlined @click="proveRef.visible = true" class="mr-2 text-xl cursor-pointer" />
            </template>
            <div class="w-[100] h-[80%]">
                <div class="echarts" id="contrast"></div>
            </div>
        </contentBox>

        <!-- 说明 -->
        <proveVue title="场站对比" info="展示平台资产对比情况" ref="proveRef" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import proveVue from "../../components/prove.vue";
import contentBox from '../../components/contentBox.vue';
import { ECharts, EChartsOption, init } from "echarts";

const proveRef = ref<any>()

const listData = [
    { name: '无锡微纳园', value: 100 },
    { name: '新吴区软件科技园', value: 80 },
    { name: '万达广场', value: 60 },
    { name: '小三里桥', value: 40 },
    { name: '无锡人民医院', value: 20 },
]

const initChart = (): ECharts => {
    const charEle = document.getElementById("contrast") as HTMLElement;
    const charEch: ECharts = init(charEle);
    const option: EChartsOption = {
        color: ['#00c2d5', '#00a3b3', '#00909f', '#00737e', '#004f56'],
        textStyle: {
            fontSize: 18,
        },
        tooltip: {
            formatter: (params: any) => {
                let html = `<div class="lineChart-bg">
                        <span>${params.name} ${params.value}</span>
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
        series: [
            {
                type: 'treemap',
                data: listData,
            }
        ]
    };
    charEch.setOption(option);
    return charEch;
};
defineExpose({
    initChart
});

</script>

<style lang="scss" scoped>
.echarts {
    width: 100%;
    height: 90%;

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
            font-size: 20px !important;
            color: #fff !important;
        }
    }
}
</style>