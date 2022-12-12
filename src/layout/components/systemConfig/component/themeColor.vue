<template>
  <a-divider orientation="center">系统主题</a-divider>
  <div class="flex justify-center py-4">
    <input
        class="w-[120px] h-[40px]"
        type="color"
        :value="colorState.primaryColor"
        @input="e => onColorChange('primaryColor', e.target)"
    />
  </div>
  <div class="flex justify-center">
    <div v-for="(item,index) in systemTheme" :key="index">
        <div class="w-[30px] h-[30px] cursor-pointer mx-2 flex justify-center items-center border-[1px]"
        :style="{'background-color':item}" @click="onColorChange('primaryColor',{value:item})">
            <check-outlined v-if="item === colorState.primaryColor" :style="{fontSize:'18px',color:'#fff'}" />
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, inject, watch } from "vue";
import { ConfigProvider } from 'ant-design-vue';
import { layoutInterface } from '@/layout/type'

const {
    getConfigState,
    setConfigState,
} = inject<layoutInterface>('sysConfig')

const colorState = reactive({
    primaryColor: getConfigState('themeColor')
});

watch(()=>getConfigState('themeColor'),(newVal)=>{
    colorState.primaryColor = newVal
})

const onColorChange = (type: string, value: any) => {
    Object.assign(colorState, { [type]: value.value });
    ConfigProvider.config({
        theme: colorState,
    });
    setConfigState('themeColor',value.value)
};

const systemTheme = reactive<string[]>([
    '#009688',
    '#1890FF',
    '#9C27B0',
    '#FF9800',
    '#FF5C93',
    '#BAA380',
    '#0096C7',
]);
</script>

<style scoped lang="scss">

</style>
