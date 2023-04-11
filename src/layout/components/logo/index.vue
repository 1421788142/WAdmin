<template>
    <div 
        class="flex h-[!60px] !min-h-[60px] items-center justify-center bg-white cursor-pointer logo dark:!border-r-0 dark:!text-white" 
        :class="[
            {'border-b border-r':(getConfigState('menuType') === 'verticalLight' && !getConfigState('isHasDark'))},
            {'py-2 !bg-[#001529]':['mix','verticalDark'].includes(getConfigState('menuType'))},
            {'!bg-[#1F1F1F]':['verticalDark','mix'].includes(getConfigState('menuType')) && getConfigState('isHasDark')},
            {'!bg-[#141414]':['verticalLight','horizontal'].includes(getConfigState('menuType')) && getConfigState('isHasDark')}
        ]" 
        @click="toHome"
    >
        <a-avatar :size="35" :src="getAssets(VITE_PROJECT_LOGO)" />
        <span class="ml-4 font-bold text-black text-[20px] dark:!text-white"
            :class="{'!text-white':['mix','verticalDark'].includes(getConfigState('menuType'))}"
        v-if="!getConfigState('isHasCollapsed')">{{VITE_PROJECT_NAME}}</span>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { layoutInterface } from '@/hooks/interface/layout'
import { getAssets } from '@/utils/util';

const {
    getConfigState
} = inject<layoutInterface>('sysConfig')
// 读取项目配置
const { VITE_PROJECT_NAME, VITE_PROJECT_LOGO } = import.meta.env
const router = useRouter()
// 跳转首页
const toHome = ()=>{
    router.push({path:'/'})
}
</script>

<style scoped>

</style>