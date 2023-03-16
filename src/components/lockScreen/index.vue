<template>
    <div class="w-lock-screen" v-if="getConfigState('isHasLock')">
        <div class='cursor-pointer w-lock-screen-top' @Click="showData = true">
            <lock-outlined class='icon' />
            <div class='title'>点击解锁屏幕</div>
        </div>
        <div class='!select-none flex flex-row justify-around grid-flow-row gap-2 my-40 text-white items-center'>
            <digitalFlip/>
        </div>
        <transition name="fade-slide">
            <div class="w-screen h-screen bg-[#060606bd] fixed left-0 top-0 z-10 backdrop-blur flex justify-center items-center" v-show="showData">
                <div class='flex flex-col items-center justify-center mb-4 w-[300px] mx-auto fixed' v-show="showData">
                    <a-avatar src='https://vben.vvbin.cn/assets/header.1b5fa5f8.jpg' :size="100" />
                    <div class='my-4 text-4xl text-white'>WAdmin</div>
                    <a-input-password v-model:value="lockNum" placeholder='请输入您的锁屏密码' />
                    <div class="my-2 text-red-700 text-lt">{{ errMsg }}</div>
                    <div class="flex justify-between w-full text-white">
                        <span class="cursor-pointer" @click="showData = false">返回</span>
                        <span class="cursor-pointer" @click="loginOut">重新登录</span>
                        <span class="cursor-pointer" @click="toSys">进入系统</span>
                    </div>
                </div>
            </div>
        </transition>
        <div class='mt-10 text-4xl text-center text-white'>
            {{ `${year}/${month} ${week}` }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import digitalFlip from '../digitalFlip/index.vue'
import { useNow } from '@/hooks/useNow'
import { layoutInterface } from '@/hooks/interface/layout'

import userStore from '@/store/user';
const { loginOut } = userStore()
const { 
    month, 
    year, 
    week,
} = useNow();

const {
    getConfigState,
    setConfigState
} = inject<layoutInterface>('sysConfig')

const showData = ref<boolean>(false)
const lockNum = ref<string>('') //锁屏密码
const errMsg = ref<string>('') //锁屏提示

const toSys = ()=>{
    if(lockNum.value !== getConfigState('lockPassword')) return errMsg.value = '密码错误'
    setConfigState('isHasLock',false)
    errMsg.value = ''
}
</script>

<style scoped>

</style>