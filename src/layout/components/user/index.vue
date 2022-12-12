<template>
    <div class="h-[50px] min-w-max !max-w-[70vw] overflow-auto flex justify-between items-center">
        <searchMenu/>
        <div class="flex items-center mr-2" id="full-screen">
            <a-tooltip placement="bottom" :title="isFull ? t('sys.CancelFullScreen') : t('sys.FullScreen')">
                <fullscreen-exit-outlined v-if="isFull" :style="{fontSize:'20px'}" @click="toggleFullscreen" />
                <fullscreen-outlined v-else :style="{fontSize:'20px'}" @click="toggleFullscreen" />
            </a-tooltip>
        </div>
        <a-popover :trigger="['click']" placement="bottom">
            <div id="sys-message" class="flex items-center mx-2 cursor-pointer ant-dropdown-link">
                <a-badge count="10">
                    <bell-outlined :style="{fontSize:'20px'}" />
                </a-badge>
            </div>
            <template #content>
                <messageContent class="w-[250px]" />
            </template>
        </a-popover>
        <a-dropdown :trigger="['click']">
            <span id="chang-lan" class="leading-4">
                <span v-if="language === 'en_US'" class="mx-2 cursor-pointer">
                    {{t('sys.enCN')}}
                </span>
                <span v-else class="mx-2 cursor-pointer">
                    {{t('sys.zhCN')}}
                </span>
            </span>
            <template #overlay>
                <a-menu>
                    <a-menu-item @click="changLan('zh_CN')" :disabled="language === 'zh_CN'">{{t('sys.zhCN')}}</a-menu-item>
                    <a-menu-item @click="changLan('en_US')" :disabled="language === 'en_US'">{{t('sys.enCN')}}</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
        <a-dropdown>
            <div class="flex items-center justify-between px-4 py-1 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">
                <span class="mr-2 text-sm font-bold text-zinc-600 dark:!text-white">{{ userInfoData.userName }}</span>
                <a-avatar :size="35" :src="userInfoData.avatar" />
            </div>
            <template #overlay>
                <a-menu @click="onClick">
                    <a-menu-item key="1">{{t('sys.ModifyInfo')}}</a-menu-item>
                    <a-menu-item key="2">{{t('sys.OutLogin')}}</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, inject } from 'vue';
import screenfull from 'screenfull'

import searchMenu from './searchMenu.vue';
import messageContent from './messageContent.vue';

import { message } from 'ant-design-vue';
import type { MenuProps } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';

import { useRouter } from 'vue-router';
import { layoutInterface } from '@/layout/type'

import userStore from '@/store/user';
import { userInterface } from '@/apis/user'

const { t } = useI18n()
const router = useRouter()
const { userInfo, loginOut } = userStore()
const userInfoData = ref<userInterface>(userInfo)

const {
    getConfigState,
    setConfigState
} = inject<layoutInterface>('sysConfig')

//获取类型，语言模块
let language = getConfigState('language')
const changLan = (value:string)=>{
    setConfigState('language',value)
    router.go(0)
}

// 全屏
const isFull = ref<boolean>(false)
const toggleFullscreen = ()=>{
    isFull.value = true
    if (screenfull.isEnabled) {
        if(screenfull.isFullscreen){
            isFull.value = false
        }
        screenfull.toggle()
    } else {
        message.error('不支持全屏')
    }
}
const onClick: MenuProps['onClick'] = ({ key }) => {
    if(key == 2){
        Modal.confirm({
        title: '温馨提示',
        content: '是否确认退出系统?',
        okText: '确认',
        cancelText: '取消',
        onOk() {
            loginOut()
        }
      });
    }
};
</script>

<style scoped>

</style>
