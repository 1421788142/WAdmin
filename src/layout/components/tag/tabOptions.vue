<template>
  <a-dropdown :trigger="[trigger]">
    <div v-if="tagsIndex == -1" class="flex items-center">
      <menu-outlined class="!text-xl cursor-pointer mt-[-5px]" />
    </div>
    <div
      class="menu-tag"
      :class="{ 'menu-tag-active': route.path === item.path }"
      v-else
    >
      <div class="flex items-center">
        <span class="text-xs title">{{ title }}</span>
        <close-outlined
          class="!mr-0 text-[12px] close-outlined"
          @click.stop="setupFn('closeCurrent')"
        />
      </div>
    </div>
    <template #overlay>
      <a-menu>
        <template v-for="tabItme in tabItmes" :key="tabItme.type">
          <a-menu-item
            @click.stop="setupFn(tabItme.type)"
            :disabled="isDisabled(tabItme.disabled)"
          >
            <div class="flex items-center">
              <component :is="tabItme.icon"></component>
              <span class="ml-2">{{ tabItme.title }}</span>
            </div>
          </a-menu-item>
        </template>
        <a-menu-item @click.stop="setupFn('closeAll')">
          <div class="flex items-center">
            <dash-outlined />
            <span class="ml-2">{{ $t("layouts.closeAllTabs") }}</span>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import type { itemType } from "./index";
import { $$t } from "@/plugins/language/setupI18n";
import { Trigger } from "ant-design-vue/es/dropdown/props";

interface propInterface {
  disabled?: boolean;
  item?: any;
  title?: string;
  trigger?: Trigger;
  tagsIndex?: number;
  tabItmes: itemType[];
}

const props = withDefaults(defineProps<propInterface>(), {
  disabled: true,
  title: $$t("commons.more"),
  trigger: "click",
  tagsIndex: -1,
  tabItmes: () => [],
});

const route = useRoute();
const emit = defineEmits(["change"]);
const setupFn = type => {
  emit("change", {
    key: type,
    data: props.item || route,
  });
};

// 是否禁用
const isDisabled = (disabled: boolean) => {
  let has = false;
  if (props.disabled) if (disabled && props.item.path != route.path) has = true;
  return has;
};
</script>

<style lang="scss">
.dark {
  .menu-tag {
    border: 1px solid #333;
  }
  .menu-tag::after {
    background-color: #177ddc;
  }
}
.menu-tag {
  cursor: pointer;
  position: relative;
  padding: 5px 20px;
  border-radius: 5px;
  border: 1px solid #eee;
  .close-outlined {
    position: absolute;
    opacity: 0;
    right: -30px;
    transition: 0.3s;
  }
}
.menu-tag::after {
  position: absolute;
  content: "";
  background-color: var(--ant-primary-color);
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
}
.menu-tag:hover {
  &::after {
    transition: width 0.3s;
    width: 100%;
  }
  .close-outlined {
    right: 5px;
    opacity: 1;
  }
}
.menu-tag-active::after {
  width: 100%;
}
</style>
