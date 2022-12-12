<template>
<div>
    <div class="flex justify-between p-4">
        <span>规划</span>
        <span>更多</span>
    </div>
    <a-divider class="!m-0" />
    <div>
        <div 
            v-for="(item,index) in cardItem" :key="index" 
            class="box-border flex p-5 duration-300 border-b cursor-pointer p-5bg-slate-200 hover:shadow-lg"
        >
            <div class="mr-2">
                <a-avatar :src="item.avatar" />
            </div>
            <div>
                <div class="text-lg">{{item.title}}</div>
                <div class="mt-2 text-gray-400">{{item.time}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface card {
    title:string,
    time:string,
    avatar:string
}
const cardItem = ref<card[]>([
    {
        title:'Xiao Wu 在开源组创建了Vue项目',
        time:'2022-07-01',
        avatar:'/image/logo.png'
    },
    {
        title:'Xiao Wu 在开源组对项目做出了初步规划',
        time:'2022-07-01',
        avatar:'/image/logo.png'
    },
    {
        title:'Xiao Wu 在开源组开始开发项目',
        time:'2022-07-01',
        avatar:'/image/logo.png'
    },
        {
        title:'Xiao Wu 在开源组对项目开始安装项目所需插件',
        time:'2022-07-02',
        avatar:'/image/logo.png'
    },
        {
        title:'Xiao Wu 在开源组对项目配置完路由',
        time:'2022-07-03',
        avatar:'/image/logo.png'
    },
    {
        title:'Xiao Wu 在开源组对项目配置页面布局',
        time:'2022-07-04',
        avatar:'/image/logo.png'
    },
    {
        title:'Xiao Wu 在开源组对项目配置菜单',
        time:'2022-07-04',
        avatar:'/image/logo.png'
    },
    {
        title:'Xiao Wu 在开源组对配置项目系统设置模块',
        time:'2022-07-10',
        avatar:'/image/logo.png'
    },
    {
        title:'Xiao Wu 在开源组对axios请求模块进行封装',
        time:'2022-07-20',
        avatar:'/image/logo.png'
    },
    {
        title:'Xiao Wu 在开源组对菜单组件封装避免复用',
        time:'2022-07-20',
        avatar:'/image/logo.png'
    }
])
</script>

<style lang="scss" scoped>

</style>