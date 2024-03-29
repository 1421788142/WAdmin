<template>
  <div class="historyMenu">
    <a-divider class="!mt-0 !mb-1" />
    <div class="flex w-full items-center justify-between mb-1 h-[30px]">
      <a-tabs type="card" @change="tabPage" size="large" v-model:activeKey="currentPage">
        <a-tab-pane v-for="(item, index) in historyMenuTag" :key="item.path">
          <template #tab>
            <tabOptions
              :tabItmes="tabItmes"
              :title="item.title"
              :tagsIndex="Number(index)"
              trigger="contextmenu"
              :item="item"
              @change="optionChange"
            />
          </template>
        </a-tab-pane>
      </a-tabs>
      <div class="flex items-center !text-lg">
        <sync-outlined class="cursor-pointer" @click="refresh" :class="animate" />
        <expand-outlined class="mx-2 cursor-pointer" @click="fullChange" />
        <tabOptions :tabItmes="tabItmes" :disabled="false" @change="optionChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, nextTick } from "vue";
import tabOptions from "./tabOptions.vue";
import { useTagData } from "./index";

import { deepClone } from "@/utils/util";
import { isNullAndUnDef } from "@/utils/is";
import Sortablejs from "sortablejs";
import type Sortable from "sortablejs";

import { useRoute, useRouter } from "vue-router";
import { layoutInterface } from "@/hooks/interface/layout";

const { getConfigState, setConfigState } = inject<layoutInterface>("sysConfig");

const route = useRoute();
const router = useRouter();

const { tabItmes, historyMenuTag, set, closeCurrent, closeLeft, closeRight, closeAll, closeOther } = useTagData(
  route,
  router,
);

// 标签页切换
const tabPage = (path: string) => {
  let params = historyMenuTag.value.find(x => x.path === path)?.params;
  router.push({ path: path, query: params || {} });
};
// 切换全屏
const fullChange = () => {
  setConfigState("isHasFull", !getConfigState("isHasFull"));
};
const emit = defineEmits(["change"]);

//重新加载页面
const animate = ref<string>("");
const refresh = () => {
  animate.value = "animate-spin"; //加载动画
  setTimeout(() => (animate.value = ""), 1000);
  emit("change");
};

const currentPage = ref<string>(""); //当前路由path
// 监听路由变化
watch(
  () => route.path,
  (newPath: string) => {
    currentPage.value = newPath;
    set();
  },
  { immediate: true },
);

// 标签操作栏事件
type keyType = "refresh" | "closeCurrent" | "closeLeft" | "closeRight" | "closeOther" | "closeAll";
interface valueInterface {
  key: keyType;
  data: historyTagItem;
}

const optionChange = (value: valueInterface) => {
  if (value.key === "refresh") return refresh();
  switch (value.key) {
    case "closeLeft":
      closeLeft(value.data);
      break;
    case "closeRight":
      closeRight(value.data);
      break;
    case "closeAll":
      closeAll();
      break;
    case "closeOther":
      closeOther(value.data);
      break;
    default:
      closeCurrent(value.data);
      break;
  }
  historyMenuTag.value.length && emit("change", value.key === "closeAll");
};

// 拖拽排序
let sortableOrder: string[] = [];
let sortable: Sortable;
nextTick(() => {
  sortable = Sortablejs.create(document.getElementsByClassName("ant-tabs-nav-list")[0], {
    animation: 500,
    delay: 400,
    delayOnTouchOnly: true,
    handle: ".ant-tabs-tab",
    onEnd: (evt: Sortable) => {
      const { oldIndex, newIndex } = evt;
      if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) return;
      let historyMenuList = deepClone<historyTagItem[]>(historyMenuTag.value);
      if (oldIndex > newIndex) {
        historyMenuList.splice(newIndex, 0, historyMenuList[oldIndex]);
        historyMenuList.splice(oldIndex + 1, 1);
      } else {
        historyMenuList.splice(newIndex + 1, 0, historyMenuList[oldIndex]);
        historyMenuList.splice(oldIndex, 1);
      }
      historyMenuTag.value = historyMenuList;
    },
  });
  // 记录原始order 序列
  sortableOrder = sortable.toArray();
});
</script>

<style scoped lang="scss">
.historyMenu {
  :deep(.ant-tabs) {
    .ant-tabs-nav {
      margin: 0 !important;
    }

    .ant-tabs-ink-bar {
      display: none !important;
    }

    .ant-tabs-content-holder {
      display: none !important;
    }

    .ant-tabs-tab {
      padding: 0 !important;
      border: 0 !important;
      font-size: 12px !important;
    }

    .ant-tabs-tab-active {
      border-bottom-color: #f0f0f0 !important;
    }
  }
}
</style>
