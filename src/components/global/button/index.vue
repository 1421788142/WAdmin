<template>
    <a-button v-bind="$attrs" :type="btnType" class="!flex !items-center" :style="{ 'color': color }" :disabled="disabled"
        v-permission="[type, $route.meta.permission]">
        <template #icon>
            <slot name="icon">
                <component v-if="icon || btnIcon[type]" :is="icon || btnIcon[type]"></component>
            </slot>
        </template>
        <span>{{ title ?? btnTitle[type] }}</span>
    </a-button>
</template>

<script setup lang="ts">
import { btnIcon, btnTitle } from '@/enums/menu'
interface propsInterface {
    btnType?: string, //按钮类型
    title?: string, //按钮文字
    icon?: string | boolean, //按钮图标
    type?: string, //权限字符串
    color?: string, //颜色
    disabled?: boolean, //禁用
}

const props = withDefaults(defineProps<propsInterface>(), {
    btnType: 'text',
    type: 'add',
    disabled: false
})
</script>

<style scoped></style>