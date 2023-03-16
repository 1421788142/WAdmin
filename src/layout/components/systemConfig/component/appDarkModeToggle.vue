<template>
    <a-divider orientation="center">主题</a-divider>
    <div class="flex justify-center">
        <a-switch v-model:checked="checked" @change="chnageDark">
            <template #checkedChildren>
                <w-svg-icon name="sun" :iconStyle="iconStyle" />
            </template>
            <template #unCheckedChildren>
                <w-svg-icon name="moon" :iconStyle="iconStyle" />
            </template>
        </a-switch>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, inject } from 'vue';
import { layoutInterface } from '@/hooks/interface/layout'

const {
    switchDark,
    getConfigState
} = inject<layoutInterface>('sysConfig')

const checked = ref<boolean>(false)
const iconStyle = { width:20, height:20 }
watchEffect(()=>{
    checked.value = getConfigState('isHasDark')
})
const chnageDark = (value:boolean)=>{
    switchDark(value)
}
</script>

<style scoped>
.ant-switch-checked{
    background-color: #555555 !important;
}
</style>