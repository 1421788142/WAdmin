<template>
    <div class="dataScreen-container">
        <!-- 头部 -->
        <div class="dataScreen" ref="dataScreenRef">
            <!-- 头部 -->
            <div class="dataScreen-header">
                <div class="header-lf">
                    <span class="absolute top-0 right-0 left-btn" @click="router.push('/')">首页</span>
                </div>
                <div class="header-ct">
                    <div class="header-ct-title">
                        <span>小二快充可视化大数据分析</span>
                    </div>
                </div>
                <div class="header-rg">
                    <menuVue />
                    <searchVue />
                </div>
            </div>
            <!-- 内容 -->
            <div class="grid grid-flow-row grid-cols-3 grid-rows-3 gap-6 pb-1">
                <!-- 接入数据 -->
                <accessDataVue />
                <!-- 充电运营数据 -->
                <operateDataVue />
                <!-- 枪口状态时长率分布 -->
                <deviceStatusVue ref="deviceStatusRef" />
                <!-- 枪口状态时长率分布 -->
                <growthTrendsVue ref="growthTrendsRef" />
                <!-- 排行榜 -->
                <theChartsVue ref="theChartsRef" />
                <!-- 充电时间 -->
                <chargingTimeVue ref="chargingTimeRef" />
                <!-- 场站对比 -->
                <contrastVue ref="contrastRef" />
                <!-- 充电趋势 -->
                <trendVue ref="trendRef" />
                <!-- 场站类型 -->
                <parkTypeVue ref="parkTypeRef" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ECharts } from "echarts";
import { getAssets } from '@/utils/util'
import { useRouter } from "vue-router";
import menuVue from "../components/menu.vue";
import searchVue from "../components/search.vue";
import accessDataVue from "./components/accessData.vue";
import operateDataVue from "./components/operateData.vue";
import deviceStatusVue from "./components/deviceStatus.vue";
import growthTrendsVue from "./components/growthTrends.vue";
import theChartsVue from "./components/theCharts.vue";
import chargingTimeVue from "./components/chargingTime.vue";
import contrastVue from "./components/contrast.vue";
import trendVue from "./components/trend.vue";
import parkTypeVue from "./components/parkType.vue";

const router = useRouter();
const dataScreenRef = ref<HTMLElement | null>(null);

// 获取子组件的ref
interface chartExpose {
    initChart: (params?: any) => ECharts;
    initData?: (params?: any) => any
}
// 图表
const deviceStatusRef = ref<chartExpose>();
const growthTrendsRef = ref<chartExpose>();
const contrastRef = ref<chartExpose>();
const trendRef = ref<chartExpose>();
const parkTypeRef = ref<chartExpose>();
// 声明echarts实例
interface ChartProps {
    [key: string]: ECharts | null;
}
const dataScreen: ChartProps = {
    chart1: null,
    chart2: null,
    chart3: null,
    chart4: null,
    chart5: null,
    chart6: null,
};

// 初始化 echarts
const initCharts = (): void => {
    dataScreen.chart1 = deviceStatusRef.value?.initChart() as ECharts;
    dataScreen.chart2 = growthTrendsRef.value?.initChart() as ECharts;
    dataScreen.chart3 = contrastRef.value?.initChart() as ECharts;
    dataScreen.chart4 = trendRef.value?.initChart() as ECharts;
    dataScreen.chart5 = parkTypeRef.value?.initChart()[0] as ECharts;
    dataScreen.chart6 = parkTypeRef.value?.initChart()[1] as ECharts;
};

onMounted(() => {
    // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
    if (dataScreenRef.value) {
        dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
        dataScreenRef.value.style.width = `2100px`;
        dataScreenRef.value.style.height = `1080px`;
    }

    // 初始化echarts
    initCharts();
    // 为浏览器绑定事件
    window.addEventListener("resize", resize);
});

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

// 根据浏览器大小推断缩放比例
const getScale = (width = 2100, height = 1080) => {
    let ww = window.innerWidth / width;
    let wh = window.innerHeight / height;
    return ww < wh ? ww : wh;
};

</script>

<style lang="scss">
@import "../assets/index.scss";
</style>