<template>
    <div class="h-[310px]">
        <contentBox title="充电运营数据" type="box" class="h-full" :sub-title="`最后更新时间 ${currentTime}`">
            <template #prove>
                <question-circle-outlined @click="proveRef.visible = true" class="mr-2 text-xl cursor-pointer" />
            </template>
            <div class="flex justify-between text-center header header-active text-[#05e8fe]">
                <div class="py-1" v-for="item, index in title" :key="index" @click="tab(index)"
                    :class="index === active ? 'activeTitle' : ''">
                    {{ item }}</div>
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
        <proveVue title="充电运营数据" info="展示平台运营指标的数据情况" ref="proveRef" />
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref } from 'vue';
import proveVue from "../../components/prove.vue";
import contentBox from '../../components/contentBox.vue';

const proveRef = ref<any>()

const active = ref<number>(1)

const title = ['', '今日', '昨日', '全部']
const currentTime = ref<string>(dayjs().format('YY-MM-DD HH:mm:ss'))
const list = [
    { title: '充电电量(度)', allNum: 234, num1: 210, num2: 923 },
    { title: '充电金额(元)', allNum: 2394, num1: 2503, num2: 19328 },
    { title: '充电次数(次)', allNum: 112, num1: 109, num2: 923 },
    { title: '充电用户(个)', allNum: 54, num1: 65, num2: 2394 },
    { title: '异常订单(笔)', allNum: 1, num1: 2, num2: 6 },
]

const tab = (index: number) => {
    if (!index) return
    currentTime.value = dayjs().format('YY-MM-DD HH:mm:ss')
    active.value = index
}

</script>

<style scoped lang="scss">
.header {
    div {
        width: 25%;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.5s;
    }
}

.activeTitle {
    background-color: #17babd;
    color: #fff;
}

.header-active {
    background-color: #3c6e7276;
}

.body-active {
    background-color: #3c6e7276;
}
</style>