<template>
    <div class="h-full">
        <contentBox title="使用率排行统计" type="boxMax" class="h-full">
            <div class="echarts-header">
                <span>排名</span>
                <span>小区名称</span>
                <span>使用数量</span>
            </div>
            <div class="w-[100] h-[80%]">
                <div class="echarts" id="topRanking"></div>
            </div>
        </contentBox>
    </div>
</template>

<script setup lang="ts">
import contentBox from '../../components/contentBox.vue';
import { topRanking } from '@/apis/dataScreen/home'
import { ECharts, EChartsOption, init } from "echarts";
import { ranking1, ranking2, ranking3, ranking4 } from "../../assets/ranking-icon";

const colors = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]

const initChart = (data: topRanking[]): ECharts => {
    const charEle = document.getElementById("topRanking") as HTMLElement;
    const charEch: ECharts = init(charEle);
    let lgStyle = {
        width: 70,
        color: "#05E8FE",
        height: 25,
        fontSize: 16
    }
    let listData = data.sort((a, b) => b.value - a.value)
    const option: EChartsOption = {
        tooltip: {
            trigger: "axis",
            confine: true,
            formatter: (params: any) => {
                let tipData = params[0];
                let html = `
                    <div class="lineChart-bg">
                        <span>${tipData.name}使用${tipData.value}次</span>
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
            left: "18%",
            right: "4%",
            bottom: "1%",
            containLabel: true
        },
        xAxis: {
            type: "value",
            axisLine: {
                show: false,
            },
            nameGap: 1,
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                fontSize: 16
            },
            triggerEvent: false
        },
        yAxis: [
            {
                show: true,
                data: listData.map((val: topRanking) => val.name),
                inverse: true,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#05E8FE",
                    formatter: function (value: any) {
                        let str = value.length > 6 ? value.slice(0, 6) + "..." : value;
                        let index = listData.map((item: topRanking) => item.name).indexOf(value) + 1;
                        return ["{" + (index > 3 ? "lg" : "lg" + index) + "|NO." + index + "}", "{title|" + str + "}"].join(" ");
                    },
                    rich: {
                        lg1: {
                            backgroundColor: {
                                image: ranking1
                            },
                            ...lgStyle
                        },
                        lg2: {
                            backgroundColor: {
                                image: ranking2
                            },
                            align: "center",
                            ...lgStyle
                        },
                        lg3: {
                            backgroundColor: {
                                image: ranking3
                            },
                            align: "center",
                            ...lgStyle
                        },
                        lg: {
                            backgroundColor: {
                                image: ranking4
                            },
                            align: "center",
                            ...lgStyle
                        },
                        title: {
                            width: 180,
                            fontSize: 20,
                            align: "center",
                            padding: [0, 10, 0, 0]
                        }
                    }
                },
                triggerEvent: false
            },
            {
                show: false,
                inverse: true,
                data: listData,
            }
        ],
        series: [
            {
                name: "个",
                type: "bar",
                yAxisIndex: 0,
                data: listData,
                barWidth: 25,
                itemStyle: {
                    borderRadius: 30,
                    color: function (params) {
                        let num = colors.length;
                        return colors[params.dataIndex % num];
                    },
                },
                label: {
                    show: true,
                    position: [12, 0],
                    lineHeight: 30,
                    color: "#fff",
                    fontSize: 18,
                    formatter: (params: any) => {
                        return params.data.percentage;
                    }
                }
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
    height: calc(100% - 56px);

    :deep(.lineChart-bg) {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: max-content;
        height: 60px;
        background: url("../../images/line-bg.png") no-repeat;
        background-size: 100% 100%;
        padding: 0 10px;

        span {
            font-size: 18px;
            color: #fff;
        }
    }
}

.echarts-header {
    box-sizing: border-box;
    display: flex;
    height: 36px;
    margin: 10px 10px 0;
    line-height: 36px;

    span {
        width: 23%;
        margin-left: 25px;
        font-size: 20px;
        font-weight: bold;
        color: #05FFFF;
        text-align: center;

        &:nth-child(2) {
            margin-left: 4px;
        }

        &:last-child {
            width: 20%;
            margin-left: 60px;
        }
    }
}
</style>