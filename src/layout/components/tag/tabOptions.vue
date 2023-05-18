<template>
    <a-dropdown :trigger="[trigger]">
        <a-button v-if="tagsIndex == -1" class="flex items-center justify-center" type="primary" size="small">
            <span class="text-xs">更多</span>
            <DownOutlined />
        </a-button>
        <div class="flex items-center justify-center tab-item" v-else>
            <span class="mr-2 text-xs">{{ title }}</span>
            <close-outlined class="!mr-0 close-outlined" v-if="tagsIndex > 0" @click.stop="setupFn('closeCurrent')" />
        </div>
        <template #overlay>
            <a-menu>
                <template v-for="tabItme in tabItmes" :key="tabItme.type">
                    <a-menu-item @click.stop="setupFn(tabItme.type)" :disabled="isDisabled(tabItme.disabled)">
                        <div class="flex items-center">
                            <component :is="tabItme.icon"></component>
                            <span class="ml-2">{{ tabItme.title }}</span>
                        </div>
                    </a-menu-item>
                </template>
                <a-menu-item @click.stop="setupFn('closeAll')">
                    <div class="flex items-center">
                        <dash-outlined />
                        <span class="ml-2">关闭所有标签页</span>
                    </div>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { itemType } from './index'

interface propInterface {
    disabled?: boolean,
    item?: any,
    title?: string,
    trigger?: string,
    tagsIndex?: number,
    tabItmes: itemType[]
}

const props = withDefaults(defineProps<propInterface>(), {
    disabled: true,
    title: '更多',
    trigger: 'click',
    tagsIndex: -1,
    tabItmes: () => []
})

const route = useRoute()
const emit = defineEmits(['change'])
const setupFn = (type) => {
    emit('change', {
        key: type,
        data: props.item || route
    })
}

// 是否禁用
const isDisabled = (disabled: boolean) => {
    let has = false
    if (props.disabled) if (disabled && props.item.path != route.path) has = true
    return has
}
</script>

<style lang="scss"></style>