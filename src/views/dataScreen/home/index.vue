<template>
    <div class="dataScreen-container">
        <div class="dataScreen" ref="dataScreenRef">
            <!-- 头部 -->
            <div class="dataScreen-header">
                <div class="header-lf">
                    <span class="header-screening" @click="router.push('/')">首页</span>
                </div>
                <div class="header-ct">
                    <div class="header-ct-title">
                        <span>WAdmin可视化大数据展示平台</span>
                        <div class="header-ct-warning">
                            <deviceNumVue ref="deviceNumRef" />
                        </div>
                    </div>
                </div>
                <div class="header-rg">
                    <span class="cursor-pointer header-download" @click="message.warn('待开发')">数据</span>
                    <span class="header-time">当前时间：{{ time }}</span>
                </div>
            </div>
            <!-- 中间部分 -->
            <div class="dataScreen-main">
                <!-- 中间部分 -->
                <div class="flex justify-between w-full">
                    <!-- 今日统计 -->
                    <div class="w-[25%] h-[100%]">
                        <todayStatisticsVue ref="todayStatisticsRef" />
                    </div>
                    <!-- 地图 -->
                    <div class="dataScreen-map w-[48%] h-[100%]">
                        <mapChartVue ref="mapChartRef" />
                    </div>
                    <!-- 使用率排行 -->
                    <div class="w-[25%] h-[100%]">
                        <topRankingVue ref="topRankingRef" />
                    </div>
                </div>
            </div>
            <!-- 底部部分 -->
            <div class="flex justify-between w-full mt-8 h-[320px]">
                <!-- 设备统计 -->
                <div class="w-[25%] h-[100%]">
                    <deviceStatisticsVue ref="deviceStatisticsRef" />
                </div>
                <!-- 金额汇总 -->
                <div class="w-[45%] h-[100%]">
                    <amountStatisticsVue ref="amountStatisticsRef" />
                </div>
                <!-- 设备数量排行 -->
                <div class="w-[25%] h-[100%]">
                    <topDeviceVue ref="topDeviceRef" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, onBeforeUnmount } from "vue";
import { chartData } from '.'
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useTime } from "@/hooks/useTime";
import { ECharts } from "echarts";
import mapChartVue from "./components/chinaMapChart.vue";
import todayStatisticsVue from "./components/todayStatistics.vue";
import deviceNumVue from "./components/deviceNum.vue";
import topRankingVue from "./components/topRanking.vue";
import deviceStatisticsVue from "./components/deviceStatistics.vue";
import topDeviceVue from "./components/topDevice.vue";
import amountStatisticsVue from "./components/amountStatistics.vue";
import { getAssets } from "@/utils/util";

const {
    topData,
    headData,
    toDayData,
    toDayOrders,
    deviceStatisticsData,
    amountStatisticsData,
    topDeviceData,
    mapData
} = chartData()

const router = useRouter();
const dataScreenRef = ref<HTMLElement | null>(null);

onMounted(() => {
    // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
    if (dataScreenRef.value) {
        dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
        dataScreenRef.value.style.width = `2100px`;
        dataScreenRef.value.style.height = `1080px`;
    }
    // 初始化echarts
    initCharts();
    // 初始化非echarts数据
    initData();
    // 为浏览器绑定事件
    window.addEventListener("resize", resize);
});

// 声明echarts实例
interface ChartProps {
    [key: string]: ECharts | null;
}
const dataScreen: ChartProps = {
    chart1: null,
    chart2: null,
    chart3: null,
    chart4: null,
};

// 获取子组件的ref
interface chartExpose {
    initChart: (params?: any) => ECharts;
    initData?: (params?: any) => any
}

//头部设备汇总 
const deviceNumRef = ref<chartExpose>();
// 设备数量排行
const topDeviceRef = ref<chartExpose>();
// 地图
const mapChartRef = ref<chartExpose>();

// 图表
const todayStatisticsRef = ref<chartExpose>();
const topRankingRef = ref<chartExpose>();
const deviceStatisticsRef = ref<chartExpose>();
const amountStatisticsRef = ref<chartExpose>();

// 初始化非图标数据
const initData = () => {
    deviceNumRef.value.initData(headData.value)
    todayStatisticsRef.value.initData(toDayData.value)
    topDeviceRef.value.initData(topDeviceData.value)
    mapChartRef.value.initData(mapData.value)
}

// 初始化 echarts
const initCharts = (): void => {
    dataScreen.chart1 = todayStatisticsRef.value?.initChart(toDayOrders.value) as ECharts;
    dataScreen.chart2 = topRankingRef.value?.initChart(topData.value) as ECharts;
    dataScreen.chart3 = deviceStatisticsRef.value?.initChart(deviceStatisticsData.value) as ECharts;
    dataScreen.chart4 = amountStatisticsRef.value?.initChart(amountStatisticsData.value) as ECharts;
};

// 根据浏览器大小推断缩放比例
const getScale = (width = 2100, height = 1080) => {
    let ww = window.innerWidth / width;
    let wh = window.innerHeight / height;
    return ww < wh ? ww : wh;
};

// 监听浏览器 resize 事件
const resize = () => {
    if (dataScreenRef.value) {
        dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    }
    // 使用了 scale 的echarts其实不需要需要重新计算缩放比例
    Object.values(dataScreen).forEach(chart => {
        chart && chart.resize();
    });
};

// 获取当前时间
const { nowTime } = useTime();
let timer: NodeJS.Timer | null = null;
let time: Ref<string> = ref(nowTime.value);
timer = setInterval(() => {
    time.value = useTime().nowTime.value;
}, 1000);

// 销毁时触发
onBeforeUnmount(() => {
    window.removeEventListener("resize", resize);
    clearInterval(timer!);
    Object.values(dataScreen).forEach(val => val?.dispose());
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
