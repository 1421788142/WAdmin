<template>
  <div
    class="min-w-[0] flex-1 items-center"
    :class="[
      { 'overflow-y-auto': getConfigState('menuType') !== 'horizontal' },
      { '!w-[600px]': getConfigState('menuType') === 'horizontal' },
    ]"
  >
    <a-menu
      :mode="mode"
      :theme="theme"
      :class="menuClass"
      :selectedKeys="selectedKeys"
      :openKeys="getConfigState('menuType') === 'horizontal' ? [] : openKeys"
      @openChange="onOpenChange"
    >
      <template v-for="item in menuList" :key="item.path">
        <menuItemVue :menuItemValue="item" />
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from "@/hooks/useMenu";
import menuItemVue from "./menuItem.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const props = defineProps({
  menuTheme: String,
});
// menu Hooks
const {
  menuList,
  selectedKeys,
  openKeys,
  theme,
  mode,
  menuClass,
  getConfigState,
  setMenuList,
  onOpenChange,
} = useMenu(props.menuTheme, route);

defineExpose({ setMenuList });
</script>

<style>
.ant-menu-horizontal {
  border: none;
}
</style>
