<template>
    <a-divider orientation="center">🚀项目功能</a-divider>
    <div>
        <div class="flex items-center justify-between my-4">
            <span>历史对话框数量</span>
            <a-input-number @change="() => {
                change(modalMinNum, 'modalMinNum')
            }" v-model:value="modalMinNum" :min="0" :max="10" />
        </div>
        <div class="flex items-center justify-between my-4">
            <span>自动锁屏时间</span>
            <a-input-number class="!w-[150px] h-[50px]" v-model:value="lockNum" :min="0" :max="10000"
                :formatter="value => `${value}${value === '0' ? '(不自动锁屏)' : '分钟'}`"
                :parser="value => value.replace('分钟', '')" @change="lockNumChange" />
        </div>
        <div class="flex items-center justify-between my-4">
            <span>历史菜单</span>
            <a-switch v-model:checked="isHasHistory" @change="setConfigState('isHasHistory', isHasHistory)"
                checked-children="开" un-checked-children="关" />
        </div>
        <div class="flex items-center justify-between">
            <span>Logo</span>
            <a-switch v-model:checked="isHasLogo" @change="setConfigState('isHasLogo', isHasLogo)" checked-children="开"
                un-checked-children="关" />
        </div>
        <div class="flex items-center justify-between my-4">
            <span>折叠菜单</span>
            <a-switch v-model:checked="isHasCollapsed"
                :disabled="['mix', 'horizontal'].includes(getConfigState('menuType'))"
                @change="setConfigState('isHasCollapsed', isHasCollapsed)" checked-children="开" un-checked-children="关" />
        </div>
        <div class="flex items-center justify-between">
            <span>灰色模式</span>
            <a-switch v-model:checked="isHasGrey" @change="setupGrey(isHasGrey)" checked-children="开"
                un-checked-children="关" />
        </div>
        <div class="flex items-center justify-between my-4">
            <span>色弱模式</span>
            <a-switch v-model:checked="isHasColorblind" @change="setupColorblind(isHasColorblind)" checked-children="开"
                un-checked-children="关" />
        </div>
        <div>
            <a-button class="!flex items-center justify-center w-full my-4" @click="reset"><reload-outlined />重置</a-button>
            <a-button class="!flex items-center justify-center w-full"
                @click="reload()"><reload-outlined />清空缓存并返回登录页</a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { message, ConfigProvider } from 'ant-design-vue';
import { inject, ref, watch } from "vue";
import { layoutInterface } from '@/hooks/interface/layout'
import emitter from '@/plugins/mitt';


import userStore from '@/store/user'
const { loginOut } = userStore()

const {
    getConfigState,
    setConfigState,
    resetConfig,
    setupGrey,
    setupColorblind,
} = inject<layoutInterface>('sysConfig')

const isHasHistory = ref<boolean>()
const isHasLogo = ref<boolean>()
const isHasCollapsed = ref<boolean>()
const isHasGrey = ref<boolean>()
const isHasColorblind = ref<boolean>()
const modalMinNum = ref<number>(0)
const lockNum = ref<number>(0)

watch(() => getConfigState('isHasCollapsed'), (newVal) => {
    isHasCollapsed.value = newVal
})

const setDefaultVal = () => {
    isHasHistory.value = getConfigState('isHasHistory')
    isHasLogo.value = getConfigState('isHasLogo')
    isHasCollapsed.value = getConfigState('isHasCollapsed')
    isHasGrey.value = getConfigState('isHasGrey')
    isHasColorblind.value = getConfigState('isHasColorblind')
    modalMinNum.value = getConfigState('modalMinNum')
    lockNum.value = getConfigState('lockNum')
}

const lockNumChange = (value: number) => {
    if (!value) {
        change(0, 'lockNum')
        change(0, 'lockExpireNum')
        return
    }
    change(value, 'lockNum')
    emitter.emit('setExpire')
}

setDefaultVal()

const change = (value: boolean | number, type: string) => {
    setConfigState(type, value)
}

const reset = async (show = true) => {
    message.loading('重置中...', .3)
    setTimeout(async () => {
        await resetConfig()
        setDefaultVal()
        show && message.success('重置成功');
        ConfigProvider.config({
            theme: getConfigState('themeColor')
        })
    }, 500)
}

const reload = async () => {
    await reset(false)
    await loginOut()
}
</script>

<style scoped></style>