<template>
    <a-breadcrumb separator="/" class="!ml-3" id="w-breadcrumb">
        <a-breadcrumb-item @click="router.push({path:'/'})">
            <span class="font-bold text-black dark:!text-white cursor-pointer fz-md">首页</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="(item,index) in crumbsList" :key="index">
            <span class="text-black dark:!text-white cursor-pointer" :class="{'font-bold':item.children}">{{ item.meta.title }}</span>
            <template #overlay v-if="item.children">
                <a-menu>
                    <template v-for="v in item.children" :key="v.path">
                        <a-menu-item> <!-- 详情页则不展示到面包屑上 -->
                            <span class="text-black dark:!text-white cursor-pointer" @click="toPage(v)">{{v.meta.title}}</span>
                        </a-menu-item>
                    </template>
                </a-menu>
            </template>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from 'vue-router';
import { layoutInterface } from '@/hooks/interface/layout'
const router = useRouter()
const {
    crumbsList,
} = inject<layoutInterface>('sysConfig')

const toPage = (value:menuListType)=>{
    if(value.component !== 'Layout') return router.push({path:value.path || ''})
    let path = value.children && getPath(value.children) || ''
    router.push({path})
}

const getPath = (value:menuListType[]):string=>{
    let path = ''
    for(let i=0; i<value.length; i++){
        if(value[i].component !== 'Layout') return value[i].path
        value[i].children && value[i].children.length && getPath(value[i].children)
    }
    return path
}
</script>

<style lang="scss" scoped>

</style>