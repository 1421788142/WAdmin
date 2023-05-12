<template>
    <div class="flex flex-wrap items-center justify-between w-full p-4 bg-white dark:bg-[#1F1F1F]">
        <div class="flex flex-wrap items-center justify-start md:flex-nowrap">
            <div class="flex justify-center w-full md:w-max">
                <a-avatar :size="80" :src="userInfoData.avatar" />
            </div>
            <div class="ml-4">
                <div class="text-xl">早安, {{userInfoData.userName}}, 开始您一天的工作吧！</div>
                <div class="mt-2 text-md text-zinc-400">今日晴，20℃ - 32℃！</div>
            </div>
        </div>
        <div class="flex mt-4 md:mt-0">
            <div class="mx-6" v-for="(item,index) in msgList" :key="index">
                <div class="text-sm text-right text-zinc-400">{{item.title}}</div>
                <div class="mt-2 text-4xl">{{item.value}}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue-demi";
import userStore from '@/store/user';
import { userInterface } from '@/apis/user'
const { userInfo } = userStore()
const userInfoData = ref<userInterface>(userInfo)
interface msg {
    title:string,
    value:string | number
}
const msgList = ref<msg[]>([
    { title:'信息', value:'2/10' },
    { title:'项目', value:1 },
    { title:'团队', value:1 },
])
</script>

<style scoped>

</style>