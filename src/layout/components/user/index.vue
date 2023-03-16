<template>
    <div class="h-[50px] min-w-max !max-w-[70vw] overflow-auto flex justify-between items-center">
        <searchMenu/>
        <div class="flex items-center mr-2" id="full-screen">
            <a-tooltip placement="bottom" :title="isFull ? t('sys.CancelFullScreen') : t('sys.FullScreen')">
                <fullscreen-exit-outlined v-if="isFull" :style="{fontSize:'20px'}" @click="toggleFullscreen" />
                <fullscreen-outlined v-else :style="{fontSize:'20px'}" @click="toggleFullscreen" />
            </a-tooltip>
        </div>
        <messageContent />
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
                <span class="mr-2 text-sm font-bold text-zinc-600 dark:!text-white">
                    {{ userInfoData?.userName || '' }}
                </span>
                <a-avatar :size="35" :src="userInfoData?.avatar" />
            </div>
            <template #overlay>
                <a-menu>
                    <a-menu-item v-for="(menu,index) in menuList" :key="index" @click="menuClick(index)">
                        <div class="flex items-center justify-around">
                            <component :is="menu.icon"></component>
                            <span>{{menu.title}}</span>
                        </div>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
        <w-modal title="锁定屏幕" width="500px" v-model:visible="lockVisible" :footer="false">
            <div class="text-center">
                <a-avatar :size="100" :src="userInfoData?.avatar" />
                <div class="mx-10 mt-10">
                    <a-input-password placeholder="请输入锁屏密码" v-model:value="lockNum" />
                    <a-button class="w-full mt-4" type="primary" @click="lockOk">锁定</a-button>
                </div>
            </div>
        </w-modal>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, inject } from 'vue';
import screenfull from 'screenfull'

import searchMenu from './searchMenu.vue';
import messageContent from './messageContent.vue';

import { message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';

import { useRouter } from 'vue-router';
import { layoutInterface } from '@/hooks/interface/layout'

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
    if (!screenfull.isEnabled) return message.error('不支持全屏')
    isFull.value = false
    screenfull.toggle()
}

const menuList = [
    { title:'锁定屏幕', icon:'lock-outlined' },
    { title:t('sys.ModifyInfo'), icon:'file-protect-outlined' },
    { title:t('sys.OutLogin'), icon:'poweroff-outlined' },
]

const lockVisible = ref<boolean>(false) //锁屏弹窗
const lockNum = ref<string>('') //锁屏密码
lockNum.value = getConfigState('lockPassword')
const menuClick = (key:number) => {
    if(key === 0) return lockVisible.value = true
    if(key === 1) return 
    Modal.confirm({
    title: '温馨提示',
    content: '是否确认退出系统?',
    okText: '确认',
    cancelText: '取消',
    onOk() {
        loginOut()
    }
    });
};
const lockOk = ()=>{
    lockVisible.value = false
    setConfigState('lockPassword',lockNum.value)
    setConfigState('isHasLock',true)
}

</script>

<style scoped>

</style>
