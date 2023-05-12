<template>
    <div class="h-[310px]">
        <contentBox title="接入数据" type="box" class="h-full">
            <template #prove>
                <question-circle-outlined @click="proveRef.visible = true" class="mr-2 text-xl cursor-pointer" />
            </template>
            <div class="flex justify-between py-1 text-center header header-active active text-[#05e8fe]">
                <div></div>
                <div>累计</div>
                <div>投运</div>
                <div>静态</div>
            </div>
            <div class="flex justify-between py-1 text-center header" v-for="item, index in list" :key="index"
                :class="[1, 3].includes(index) ? 'body-active' : ''">
                <div class="text-[#05e8fe]">{{ item.title }}</div>
                <div class="text-white">{{ item.allNum }}</div>
                <div class="text-white">{{ item.num1 }}</div>
                <div class="text-white">{{ item.num2 }}</div>
            </div>
        </contentBox>

        <!-- 说明 -->
        <proveVue title="接入数据" info="展示平台资产信息的接入情况" ref="proveRef" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import proveVue from "../../components/prove.vue";
import contentBox from '../../components/contentBox.vue';

const proveRef = ref<any>()

const list = [
    { title: '商户数', allNum: 12, num1: 12, num2: 0 },
    { title: '场站数', allNum: 27, num1: 5, num2: 22 },
    { title: '充电桩数', allNum: 42345, num1: 242, num2: 42103 },
    { title: '快充枪数', allNum: 13423, num1: 12342, num2: 23 },
    { title: '慢充枪数', allNum: 53232, num1: 3242, num2: 32512 },
]

</script>

<style scoped lang="scss">
.header {
    div {
        width: 25%;
        font-size: 18px;
        cursor: pointer;
    }
}

.header-active {
    background-color: #3c6e7276;
}

.body-active {
    background-color: #3c6e7276;
}
</style>