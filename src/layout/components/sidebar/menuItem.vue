<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import hasTooltipVue from "./hasTooltip.vue";

const router = useRouter();
defineProps({
  menuItemValue: Object as PropType<menuListType>,
});
const toPage = (val: menuListType) => {
  let menuPath = val.meta.parentPath ?? val.path;
  router.push({ path: menuPath ?? "/" });
};
</script>
<template>
  <!-- 如果隐藏菜单 -->
  <template v-if="!menuItemValue.hidden && !menuItemValue.isFrame">
    <!-- 递归菜单 -->
    <a-sub-menu :key="menuItemValue.path" v-if="menuItemValue.children && menuItemValue.menuType === 'M'">
      <template #icon>
        <component v-if="menuItemValue.icon" :is="menuItemValue.icon"></component>
      </template>
      <template #title>
        <hasTooltipVue :text="menuItemValue.meta.title || '--'" />
      </template>
      <template v-for="children of menuItemValue.children">
        <menu-item :menuItemValue="children" />
      </template>
    </a-sub-menu>

    <!-- 页面 -->
    <a-menu-item :key="menuItemValue.path" @click="toPage(menuItemValue)" v-if="menuItemValue.menuType === 'C'">
      <hasTooltipVue :text="menuItemValue.meta.title || '--'" />
      <template #icon>
        <component v-if="menuItemValue.icon" :is="menuItemValue.icon"></component>
      </template>
    </a-menu-item>
  </template>

  <!-- 外链 -->
  <a :href="menuItemValue.path" target="_blank" v-else class="!text-[#262626] dark:text-white">
    <a-menu-item>
      <hasTooltipVue :text="menuItemValue.meta.title || '--'" />
      <template #icon>
        <component v-if="menuItemValue.icon" :is="menuItemValue.icon"></component>
      </template>
    </a-menu-item>
  </a>
</template>
<style lang="scss">
.ant-menu-item,
.ant-menu-submenu-title {
  display: flex !important;
  align-items: center !important;
}
</style>
