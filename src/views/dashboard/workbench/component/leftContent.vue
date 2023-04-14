<template>
    <div>
        <div class="flex justify-between p-4">
            <span>规划</span>
            <span>更多</span>
        </div>
        <a-divider class="!m-0" />
        <div class="flex flex-wrap justify-between">
            <div v-for="(item, index) in cardItem" :key="index"
                class="box-border w-full p-5 duration-300 cursor-pointer md:w-1/3 p-5bg-slate-200 hover:shadow-lg">
                <div class="flex items-center">
                    <span>
                        <component :is="item.icon" class="text-4xl" />
                    </span>
                    <span class="ml-4 text-xl">{{ item.title }}</span>
                </div>
                <div class="my-2 text-gray-500 text-md">{{ item.subTitle }}</div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-500">{{ item.name }}</span>
                    <span class="text-gray-500">{{ item.time }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface card {
    title: string,
    subTitle: string | number,
    name: string,
    time: string,
    icon: string,
}
const cardItem = ref<card[]>([
    {
        title: 'WAdmin',
        subTitle: '一个人独立开发框架并且封装常用组件',
        name: 'Xiao Wu',
        time: '2022-07-18',
        icon: 'github-outlined'
    },
    {
        title: 'Github',
        subTitle: '掌握Github常用命令',
        name: 'Xiao Wu',
        time: '2022-07-18',
        icon: 'github-outlined'
    },
    {
        title: 'Gitee',
        subTitle: '掌握Gitee常用命令',
        name: 'Xiao Wu',
        time: '2022-07-18',
        icon: 'github-outlined'
    },
    {
        title: 'Vue3',
        subTitle: '熟练使用Vue3开发项目',
        name: 'Xiao Wu',
        time: '2022-07-18',
        icon: 'github-outlined'
    },
    {
        title: 'Vite',
        subTitle: '熟练使用Vite开发项目',
        name: 'Xiao Wu',
        time: '2022-07-18',
        icon: 'github-outlined'
    },
    {
        title: 'TypeScript',
        subTitle: '熟练使用Ts开发项目',
        name: 'Xiao Wu',
        time: '2022-07-18',
        icon: 'github-outlined'
    }
])
</script>

<style lang="scss" scoped></style>