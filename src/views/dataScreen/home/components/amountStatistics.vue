<template>
    <div class="h-[100%]">
        <contentBox title="金额汇总" type="boxOblong" class="h-[100%]">
            <div class="echarts" id="amountStatistics"></div>
        </contentBox>
    </div>
</template>

<script setup lang="ts">
import contentBox from './contentBox.vue';
import { ECharts, EChartsOption, init } from "echarts";
import { amountStatisticsInterface } from '@/apis/dataScreen/home'
const initChart = (data: amountStatisticsInterface[]): ECharts => {
    const charEle = document.getElementById("amountStatistics") as HTMLElement;
    const charEch: ECharts = init(charEle);
    const option: EChartsOption = {
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
        grid: {
            top: "5%",
            left: "10%",
            right: "5%",
            bottom: "25%"
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    // 坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    symbol: ["none", "arrow"],
                    symbolOffset: [0, 30],
                    lineStyle: {
                        color: "#233653",
                        shadowOffsetX: 20,
                        shadowColor: "#233653"
                    }
                },
                axisLabel: {
                    // 坐标轴刻度标签的相关设置
                    color: "#7ec7ff",
                    padding: 0,
                    fontSize: 18,
                    formatter: function (data) {
                        return data;
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#192a44"
                    }
                },
                axisTick: {
                    show: false
                },
                data: data.map(x => x.date)
            }
        ],
        yAxis: {
            nameTextStyle: {
                color: "#7ec7ff",
                fontSize: 12,
                padding: [0, 30, -4, 0]
            },
            minInterval: 1,
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#192a44"
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                color: "#7ec7ff",
                padding: 0,
                fontSize: 18,
            },
            axisTick: {
                show: false
            }
        },
        series: data.map(() => {
            return {
                name: "",
                type: "line",
                symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
                showSymbol: false,
                smooth: true,
                lineStyle: {
                    width: 1,
                    color: "#707070", // 线条颜色
                    borderColor: "#707070"
                },
                itemStyle: {
                    color: "#F5B348",
                    shadowColor: "rgba(245, 179, 72, 0.3)",
                    shadowBlur: 3
                },
                emphasis: {
                    scale: true
                },
                areaStyle: {
                    // 区域填充样式
                    // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: "#04868880" // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: "#04868880" // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: "#addbdc80" // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    },

                    shadowColor: "rgba(255, 199, 37, 0)", // 阴影颜色
                    shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                },
                data: data.map(x => x.value)
            };
        })
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
    height: 70%;

    :deep(.lineChart-bg) {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: max-content;
        height: 60px;
        padding: 0 10px;
        background: url("../images/line-bg.png") no-repeat;
        background-size: 100% 100%;

        span {
            font-size: 20px;
            color: rgb(255 255 255 / 80%);
        }
    }
}
</style>