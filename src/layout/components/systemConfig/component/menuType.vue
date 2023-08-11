<template>
  <a-divider orientation="center">
    ⚒ {{ $t("layouts.navigationMode") }}
  </a-divider>
  <div class="flex flex-wrap justify-between mt-2">
    <template v-for="item in menuTypeList" :key="item.mode">
      <a-tooltip
        placement="bottom"
        :class="{
          '!cursor-not-allowed': getConfigState('sysMode') === 'phone',
        }"
      >
        <template #title>
          <span>{{ item.title }}</span>
        </template>
        <div
          class="layout-item"
          :class="[
            item.mode,
            { active: getConfigState('menuType') == item.mode },
          ]"
          @click="toggleMenu(item)"
        >
          <div class="layout-menu"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <div class="icon">
            <check-circle-outlined
              :style="{ color: getConfigState('themeColor') }"
            />
          </div>
        </div>
      </a-tooltip>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { menuTypeEnum } from "@/enums/menu";
import { message } from "ant-design-vue";
import { layoutInterface } from "@/hooks/interface/layout";
import { $$t } from "@/plugins/language/setupI18n";

const { getConfigState, setConfigState } = inject<layoutInterface>("sysConfig");

interface menuTypeInterface {
  title: string;
  mode: string;
}
// 菜单类型
const menuTypeList = ref<menuTypeInterface[]>([
  { title: $$t("layouts.menuType1"), mode: menuTypeEnum.verticalDark },
  { title: $$t("layouts.menuType2"), mode: menuTypeEnum.verticalLight },
  { title: $$t("layouts.menuType3"), mode: menuTypeEnum.horizontal },
  { title: $$t("layouts.menuType4"), mode: menuTypeEnum.mix },
]);
const toggleMenu = (val: menuTypeInterface) => {
  if (getConfigState("sysMode") === "phone") {
    return message.error($$t("layouts.noSwitch"));
  }
  setConfigState("menuType", val.mode);
};
</script>

<style scoped lang="scss">
.layout-item {
  cursor: pointer;
  width: 45%;
  height: 90px;
  border: 2px solid var(--ant-primary-color);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 0 5px var(--ant-primary-4);
  display: flex;
  .layout-menu,
  .layout-light,
  .layout-content,
  .layout-container {
    border-radius: 3px;
  }
  .icon {
    display: block;
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 20px;
    display: none;
  }
}
.verticalDark,
.verticalLight {
  .layout-menu {
    width: 15%;
    height: 100%;
    background-color: var(--ant-primary-color);
  }
  .layout-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    .layout-light {
      width: 100%;
      height: 20px;
      background-color: var(--ant-primary-4);
    }
    .layout-content {
      width: 100%;
      margin-top: 5px;
      flex: 1;
      background-color: var(--ant-primary-1);
      border: 1px dashed var(--ant-primary-5);
    }
  }
}
.verticalLight {
  .layout-menu {
    width: 15%;
    height: 100%;
    background-color: var(--ant-primary-3);
  }
}
.horizontal {
  flex-direction: column;
  .layout-menu {
    width: 100%;
    height: 20px;
    background-color: var(--ant-primary-color);
  }
  .layout-container {
    margin-top: 5px;
    width: 100%;
    flex: 1;
    background-color: var(--ant-primary-1);
    border: 1px dashed var(--ant-primary-5);
  }
}
.mix {
  .layout-menu {
    width: 15%;
    height: 100%;
    background-color: var(--ant-primary-color);
  }
  .layout-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    .layout-light {
      width: 100%;
      height: 20px;
      background-color: var(--ant-primary-color);
    }
    .layout-content {
      width: 100%;
      margin-top: 5px;
      flex: 1;
      background-color: var(--ant-primary-1);
      border: 1px dashed var(--ant-primary-5);
    }
  }
}
.active {
  .icon {
    display: block;
  }
}

.dark {
  .layout-item {
    border: 2px solid #177ddc;
    box-shadow: 0 0 5px #177ddc;
    background-color: #141414;
  }
  .layout-menu {
    background-color: #177ddc;
  }
  .layout-menu {
    background-color: #177ddc;
  }
  .layout-content {
    background-color: #177ddc5c !important;
  }
  .layout-light {
    background-color: #177ddcb0 !important;
  }
  .mix {
    .layout-light {
      background-color: #177ddc !important;
    }
  }
  .layout-container,
  .layout-content {
    border-color: #177ddcb0 !important;
  }
  .horizontal {
    .layout-container {
      background-color: #177ddc5c !important;
    }
  }
  .anticon {
    color: #177ddc !important;
  }
}
</style>
