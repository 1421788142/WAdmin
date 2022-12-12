<template>
<div>
    <div class="flex justify-between p-4">
        <span>快速导航</span>
        <span>更多</span>
    </div>
    <a-divider class="!m-0" />
    <div class="flex flex-wrap justify-between">
        <div 
            v-for="(item,index) in NavItem" :key="index" 
            class="box-border w-1/2 p-5 text-center duration-300 cursor-pointer md:w-1/3 p-5bg-slate-200 hover:shadow-lg"
        >
            <component :is="item.icon" class="text-2xl" :style="{color:item.color}" />
            <div class="mt-1 text-m2">{{item.title}}</div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface card {
    title:string,
    color:string,
    icon:string,
}
const NavItem = ref<card[]>([
    {
    title: '首页',
    icon: 'home-outlined',
    color: '#1fdaca',
  },
  {
    title: '仪表盘',
    icon: 'home-outlined',
    color: '#bf0c2c',
  },
  {
    title: '组件',
    icon: 'home-outlined',
    color: '#e18525',
  },
  {
    title: '系统管理',
    icon: 'home-outlined',
    color: '#3fb27f',
  },
  {
    title: '权限管理',
    icon: 'home-outlined',
    color: '#4daf1bc9',
  },
  {
    title: '图表',
    icon: 'home-outlined',
    color: '#00d8ff',
  },
])
</script>

<style lang="scss" scoped>

</style>