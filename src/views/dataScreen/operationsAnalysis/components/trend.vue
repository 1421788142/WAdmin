<template>
    <div class="h-[310px]">
        <contentBox title="充电运营趋势" type="box" class="h-full">
            <template #subTitle>
                <div class="flex items-center justify-end flex-1 bi-component">
                    <a-select :options="startMode" allowClear dropdownClassName="bi-component" placeholder="启动方式"
                        class="!w-[150px]">
                        <template #notFoundContent>
                            <div class="text-center">
                                <container-outlined class="!text-[#29fcff] text-4xl" />
                                <div class="!text-[#29fcff] mt-2">暂无数据</div>
                            </div>
                        </template>
                    </a-select>
                    <a-select allowClear dropdownClassName="bi-component" placeholder="渠道" class="!w-[150px] !mx-2">
                        <template #notFoundContent>
                            <div class="text-center">
                                <container-outlined class="!text-[#29fcff] text-4xl" />
                                <div class="!text-[#29fcff] mt-2">暂无数据</div>
                            </div>
                        </template>
                    </a-select>
                    <div>
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="0" tab="日"></a-tab-pane>
                            <a-tab-pane key="1" tab="周"></a-tab-pane>
                            <a-tab-pane key="2" tab="月"></a-tab-pane>
                        </a-tabs>
                    </div>
                </div>
            </template>
            <template #prove>
                <question-circle-outlined @click="proveRef.visible = true" class="mr-2 text-xl cursor-pointer" />
            </template>
            <div class="w-[100] h-[80%]">
                <div class="echarts" id="trend"></div>
            </div>
        </contentBox>

        <!-- 说明 -->
        <proveVue title="充电运营趋势" info="可查看各渠道或充电启动方式运营趋势" ref="proveRef" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SelectProps } from 'ant-design-vue';
import proveVue from "../../components/prove.vue";
import contentBox from '../../components/contentBox.vue';
import { ECharts, EChartsOption, init } from "echarts";

const proveRef = ref<any>()
const activeKey = ref<string>('0')

const startMode = ref<SelectProps['options']>([
    { label: '扫码支付', value: 1 },
    { label: '终端操作', value: 2 }
])



const listData = [
    { value: 210, date: "2022-1" },
    { value: 19323, date: "2022-2" },
    { value: 16002, date: "2022-3" },
    { value: 19000, date: "2022-4" },
    { value: 18324, date: "2022-5" },
    { value: 12222, date: "2022-6" },
    { value: 1323, date: "2022-7" },
    { value: 13512, date: "2022-8" },
    { value: 173, date: "2022-9" },
    { value: 113, date: "2022-10" },
    { value: 142, date: "2022-11" },
    { value: 10, date: "2022-12" },
]

const initChart = (): ECharts => {
    const charEle = document.getElementById("trend") as HTMLElement;
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
            left: "15%",
            right: "5%",
            bottom: "35%"
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
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false
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
                data: listData.map(x => x.date)
            }
        ],
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
            end: 80
        },
        yAxis: {
            type: 'value',
            nameTextStyle: {
                color: "#7ec7ff",
                fontSize: 12,
                padding: [0, 30, -4, 0]
            },
            minInterval: 1,
            splitLine: {
                show: false,
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
        series: listData.map(() => {
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
                data: listData.map(x => x.value)
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
            font-size: 20px;
            color: rgb(255 255 255 / 80%);
        }
    }
}
</style>