<script setup lang="ts">
import { computed, reactive } from "vue";
import { ConfigProvider } from 'ant-design-vue';

import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

import config from '@/store/config';
const { getConfigState } = config()

// 配置全局组件大小 (small/default(middle)/large)
const size = computed((): string => getConfigState('componentSize'));
const colorState = reactive({
    primaryColor: getConfigState('themeColor'),
});
ConfigProvider.config({
    theme: colorState,
});
// Ant 语言配置
const i18nLocale = computed((): any => {
	if (getConfigState('language') && getConfigState('language') == "zh_CN") return zhCN;
	if (getConfigState('language') == "en_US") return enUS;
	return "";
});

</script>

<template>
  <a-config-provider :component-size="size" :locale="i18nLocale">
    <router-view />
  </a-config-provider>
</template>
