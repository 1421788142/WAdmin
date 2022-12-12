<template>
    <a-divider orientation="center">主题</a-divider>
    <div class="flex justify-center">
        <a-switch v-model:checked="checked"  @change="chnageDark">
            <template #checkedChildren>
                <div class="flex items-center justify-center">
                    <a-image :preview="false" :width="20" :height="20" src="/svg/sun.svg"></a-image>
                </div>
            </template>
            <template #unCheckedChildren>
                <div class="flex items-center justify-center">
                    <a-image :preview="false" :width="20" :height="20" src="/svg/moon.svg"></a-image>
                </div>
            </template>
        </a-switch>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, inject } from 'vue';
import { layoutInterface } from '@/layout/type'

const {
    switchDark,
    getConfigState
} = inject<layoutInterface>('sysConfig')
const checked = ref<boolean>(false)
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