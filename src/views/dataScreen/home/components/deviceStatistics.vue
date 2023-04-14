<template>
    <div class="w-[100%] h-[100%]">
        <contentBox title="设备统计" type="box" class="h-[100%]">
            <!-- 今日统计 -->
            <div class="echarts" id="deviceStatistics"></div>
        </contentBox>
    </div>
</template>

<script setup lang="ts">
import contentBox from './contentBox.vue';
import { ECharts, EChartsOption, init } from "echarts";
import { deviceStatisticsInterface } from '@/apis/dataScreen/home'

const colors = ["#078dbc", "#6ad40b", "#6172fc", "#1786ff", "#ffbe2f", "#4dc89d", "#b797df", "#ffd3aa"]

const initChart = (data: deviceStatisticsInterface[]): ECharts => {
    const charEle = document.getElementById("deviceStatistics") as HTMLElement;
    const charEch: ECharts = init(charEle);
    const option: EChartsOption = {
        grid: {
            top: "0%",
            left: "2%",
            right: "2%",
            bottom: "0%"
        },
        tooltip: {
            trigger: "item",
            formatter: "{b} :  {c}个",
            className: 'tooltipCar'
        },
        legend: {
            show: true,
            top: "middle",
            left: "20px",
            icon: "circle",
            orient: "vertical",
            align: "auto",
            itemWidth: 20,
            textStyle: {
                color: "#05E8FE",
                fontSize: 22
            },
            itemGap: 20,
            formatter: function (name: string) {
                let text = "";
                data.forEach((val: deviceStatisticsInterface) => {
                    if (val.name === name) {
                        text = `${name} --- ${val.value}个`;
                    }
                });
                return text;
            },
            data: data.map((val: deviceStatisticsInterface) => val.name)
        },
        series: [
            {
                type: "pie",
                radius: ["60%", "85%"],
                center: ["68%", "45%"],
                color: colors,
                itemStyle: {
                    borderColor: "#031845",
                    borderWidth: 10
                },
                data: data,
                labelLine: {
                    show: false
                },
                label: {
                    show: false
                }
            },
            {
                type: "pie",
                radius: ["20%", "28%"],
                center: ["68%", "45%"],
                color: ["#ffffff", "red"],
                startAngle: 105,
                data: [
                    { value: 30 },
                    { value: 5 },
                    { value: 65 }
                ],
                silent: true,
                labelLine: {
                    show: false
                },
                label: {
                    show: false
                }
            },
            {
                type: "pie",
                radius: [0, "30%"],
                center: ["68%", "45%"],
                startAngle: 90,
                data: [
                    {
                        value: 25,
                        name: "1",
                        itemStyle: {
                            color: "transparent",
                            borderWidth: 4,
                            borderColor: "#ffffff"
                        }
                    },
                    {
                        value: 75,
                        name: "2",
                        itemStyle: {
                            color: "transparent"
                        }
                    }
                ],
                selectedOffset: 10,
                silent: true,
                labelLine: {
                    show: false
                },
                label: {
                    show: false
                }
            }
        ]
    };
    charEch.setOption(option, true);
    return charEch;
};
defineExpose({
    initChart
});
</script>

<style lang="scss" scoped>
.echarts {
    width: 100%;
    height: 200px;

    :deep(.tooltipCar) {
        background-color: #16E3E380 !important;
        border: none !important;
        color: #fff !important;
        font-size: 18px !important;
    }
}
</style>