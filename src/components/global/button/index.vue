<template>
  <a-button
    v-bind="$attrs"
    :type="btnType"
    class="!flex !items-center"
    :style="{ color: color }"
    :disabled="disabled"
    v-permission="[type, $route.meta.permission]"
  >
    <template #icon>
      <slot name="icon">
        <component
          v-if="icon || btnIcon[type]"
          :is="icon || btnIcon[type]"
        ></component>
      </slot>
    </template>
    <span>{{ btnText }}</span>
  </a-button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { $$t } from "@/plugins/language/setupI18n";
import type { ButtonType } from "ant-design-vue/es/button/buttonTypes";
interface propsInterface {
  btnType?: ButtonType; //按钮类型
  title?: string; //按钮文字
  icon?: string | boolean; //按钮图标
  type?: string; //权限字符串 多个权限用逗号隔开 'add' || 'add,update'
  color?: string; //颜色
  disabled?: boolean; //禁用
}

const props = withDefaults(defineProps<propsInterface>(), {
  btnType: "text",
  type: "add",
  disabled: false,
});

enum btnIcon {
  add = "plus-outlined",
  update = "form-outlined",
  delete = "delete-outlined",
  export = "export-outlined",
}

const btnTitle = {
  add: $$t("buttons.add"),
  update: $$t("buttons.update"),
  delete: $$t("buttons.delete"),
  export: $$t("buttons.export"),
};

const btnText = computed(() => props.title || btnTitle[props.type]);
</script>

<style scoped></style>
