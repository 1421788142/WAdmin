<template>
    <a-divider class="!mt-0 !mb-1" />
    <div class="flex items-center justify-between mb-1">
        <div class="grid justify-start grid-flow-col gap-2 overflow-y-auto w-[70%]">
            <a-button
                v-for="(item,index) of historyMenu" :key="index"
                :type="currentPage == item.path ? 'primary' : ''"
                @click.stop="tabPage(item.path)"
                size="small"
            >
                <tabOptions 
                    :tabItmes="tabItmes" 
                    :title="item.title" 
                    :tagsIndex="Number(index)" 
                    trigger="contextmenu" 
                    :item="item" 
                    @change="optionChange"
                />
            </a-button>
        </div>
        <div class="flex items-center">
            <sync-outlined class="text-xl cursor-pointer" @click="refresh" :class="animate" />
            <expand-outlined class="mx-4 text-xl cursor-pointer" @click="fullChange" />
            <tabOptions 
                :tabItmes="tabItmes" 
                :disabled="false" 
                @change="optionChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import tabOptions from './tabOptions.vue'
import { useTagData } from './index'

import { useRoute, useRouter } from 'vue-router';
import { layoutInterface } from '@/layout/type'

const {
    getConfigState,
    setConfigState
} = inject<layoutInterface>('sysConfig')

const route = useRoute()
const router = useRouter()

const { 
    tabItmes,
    historyMenu,
    set,
    closeCurrent,
    closeLeft,
    closeRight,
    closeAll,
    closeOther
} = useTagData(route,router)

// 标签页切换
const tabPage = (path:string)=>{
    router.push({path:path})
}
// 切换全屏
const fullChange = ()=>{
    setConfigState('isHasFull',!getConfigState('isHasFull'))
}
//重新加载页面
const emit = defineEmits(['change'])
const animate = ref<string>('')
const refresh = ()=>{
    animate.value = 'animate-spin'//加载动画
    setTimeout(()=>animate.value = '',1000)
    emit('change')
}

const currentPage = ref<string>('') //当前路由path
// 监听路由变化
watch(() => route.path,(newPath:string) => {
    currentPage.value = newPath
    set()
},{ immediate: true });

// 标签操作栏事件
type keyType = 'refresh' | 'closeCurrent' | 'closeLeft' | 'closeRight' | 'closeOther' | 'closeAll'
interface valueInterface {
    key:keyType,
    data:menuItem
}

const optionChange = (value:valueInterface)=>{
    if(value.key === 'refresh') return refresh()
    switch(value.key){
        case 'closeLeft':
            closeLeft(value.data);
        break;
        case 'closeRight':
            closeRight(value.data);
        break;
        case 'closeAll':
            closeAll();
        break;
        case 'closeOther':
            closeOther(value.data);
        break;
        default:
            closeCurrent(value.data);
        break;
    }
    historyMenu.value.length > 0 && emit('change', value.key === 'closeAll')
}
</script>

<style scoped>

</style>