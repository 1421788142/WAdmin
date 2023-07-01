<script setup lang="ts">
import { computed, reactive } from "vue";
import config from "@/store/config";
import { ConfigProvider } from "ant-design-vue";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

const { getConfigState } = config();
// 配置全局组件大小 (small/default(middle)/large)
const size = computed((): string => getConfigState("componentSize"));
const colorState = reactive({
  primaryColor: getConfigState("themeColor"),
});
ConfigProvider.config({
  theme: colorState,
});
// Ant 语言配置
let lan = {
  zh_CN: zhCN,
  en_US: enUS,
};

let lanType =
  getConfigState("language") === "zh_CN" ? zhCN.locale : enUS.locale;
dayjs.locale(lanType);
let i18nLocale = lan[getConfigState("language")];
</script>

<template>
  <a-config-provider :component-size="size" :locale="i18nLocale">
    <router-view />
  </a-config-provider>
</template>
