<template>
    <div class="h-[310px] theCharts-box">
        <contentBox title="排行榜" type="box" class="h-full">
            <template #subTitle>
                <div class="flex justify-end flex-1 bi-component">
                    <div>
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="场站"></a-tab-pane>
                            <a-tab-pane key="2" tab="渠道"></a-tab-pane>
                            <a-tab-pane key="3" tab="区域"></a-tab-pane>
                            <a-tab-pane key="4" tab="商户"></a-tab-pane>
                            <a-tab-pane key="5" tab="行业"></a-tab-pane>
                            <a-tab-pane key="6" tab="场站类型"></a-tab-pane>
                        </a-tabs>
                    </div>
                </div>
            </template>
            <template #prove>
                <question-circle-outlined @click="proveRef.visible = true" class="mr-2 text-xl cursor-pointer" />
            </template>
            <vue3-seamless-scroll :list="listData" class="dataScreen-alarm" :step="0.5" :hover="true"
                :limitScrollNum="listData.length">
                <div class="flex text-xl items-center my-2 text-[#05E8FE]" v-for="item, index in listData" :key="item.id">
                    <div class="w-[18%] text-center">{{ index + 1 }}</div>
                    <div class="w-[42%] truncate">{{ item.name }}</div>
                    <div class="w-[25%] text-center progress">
                        <div class="progress-value"
                            :style="{ background: colors[index!] || 'green', width: parseInt(String((item.value / maxNum) * 100)) + '%' }">
                        </div>
                    </div>
                    <div class="ml-2">{{ item.value }}</div>
                </div>
            </vue3-seamless-scroll>
        </contentBox>

        <!-- 说明 -->
        <proveVue title="排行榜" info="以运营指标情况进行各维度的排行" ref="proveRef" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import proveVue from "../../components/prove.vue";
import contentBox from '../../components/contentBox.vue';
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

const proveRef = ref<any>()
const activeKey = ref<string>('1')

const colors = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]

let data = [
    { id: 1, value: 25, name: "小三里桥" },
    { id: 2, value: 23, name: "老人大" },
    { id: 3, value: 18, name: "梁溪景贤路" },
    { id: 4, value: 23, name: "清明桥" },
    { id: 5, value: 44, name: "万达广场路面" },
    { id: 6, value: 42, name: "万达广场地下一层" },
    { id: 7, value: 42, name: "新吴区微纳园" },
    { id: 8, value: 22, name: "新吴区软件园" },
    { id: 9, value: 16, name: "无锡人民医院" },
    { id: 10, value: 26, name: "无锡交通旅游" },
]

const listData = computed(() => {
    return data.sort((a, b) => b.value - a.value)
})

const maxNum = Math.max(...listData.value.map(x => x.value))
</script>

<style lang="scss">
.dataScreen-alarm {
    height: 68%;
    overflow: hidden;
}

.progress {
    border-radius: 20px;
    height: 15px;
    background-color: #56d0e33a;

    .progress-value {
        border-radius: 20px;
        width: 0%;
        transition: .5s;
        height: 100%;
    }
}
</style>