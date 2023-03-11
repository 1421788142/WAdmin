<template>
    <a-button 
        :type="btnType" 
        class="!flex !items-center"
        :style="{'color':color}"
        v-permission="[type,$route.meta.permission]"
    >
        <template #icon>
            <component v-if="icon" :is="icon"></component>
            <slot></slot>
        </template>
        <span>{{title}}</span>
    </a-button>
</template>

<script setup lang="ts">
interface propsInterface {
    btnType?:string,
    title?:string,
    icon?:string | boolean,
    type?:string
    color?:string
}

const props = withDefaults(defineProps<propsInterface>(),{
    btnType:'text',
    title:'新增',
    icon:'plus-outlined',
    type:'add'
})
</script>

<style scoped>

</style>