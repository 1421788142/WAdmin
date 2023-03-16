<template>
    <a-divider orientation="center">控件大小</a-divider>
    <div class="flex justify-center">
        <a-radio-group v-model:value="value" @change="change(value)">
            <a-radio-button value="small">Small</a-radio-button>
            <a-radio-button value="middle">Middle</a-radio-button>
            <a-radio-button value="large">Large</a-radio-button>
        </a-radio-group>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { layoutInterface } from '@/hooks/interface/layout'
const {
    getConfigState,
    setConfigState
} = inject<layoutInterface>('sysConfig')
const value = ref<string>(getConfigState('componentSize'))
const change = (key:string)=>{
    setConfigState('componentSize',key)
}
</script>

<style scoped>

</style>