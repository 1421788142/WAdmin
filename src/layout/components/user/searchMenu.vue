<template>
  <div class="flex items-center" id="menu-search">
    <a-tooltip placement="bottom" title="搜索">
      <search-outlined
        class="mr-4"
        @click="openModal"
        :style="{ fontSize: '20px' }"
      />
    </a-tooltip>
    <w-modal
      :title="'查找菜单'"
      width="50%"
      :footer="false"
      v-model:visible="visible"
    >
      <div class="px-1">
        <a-input
          autocomplete="off"
          id="searchInput"
          @change="getMenu(value)"
          v-model:value="value"
          size="large"
          allowClear
        />
      </div>
      <div class="max-h-[500px] overflow-y-auto px-1">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          @mouseenter="setHighlight(item)"
          @click="toPage(item)"
          class="flex items-center justify-between p-4 my-2 bg-white rounded-md shadow-md cursor-pointer dark:bg-[#1f1f1f] dark:text-white dark:border"
          :class="{ active: Highlight(item) }"
        >
          <div class="flex items-center duration-300 menu-item">
            <component
              class="mr-2"
              v-if="item.length > 0 && item[0].icon"
              :is="item[0].icon"
            ></component>
            <template v-if="item.length > 0">
              <div v-for="(val, ind) in item" :key="ind">
                <span>{{ val.title }}</span>
                <span class="mx-2" v-if="ind < item.length - 1">></span>
              </div>
            </template>
          </div>
          <enter-outlined />
        </div>
        <div class="my-4" v-if="!menuList.length">
          <a-empty description="暂无菜单" />
        </div>
      </div>
      <div class="flex items-center px-1 mt-4">
        <div class="flex items-center">
          <enter-outlined class="mr-2 btn" />
          <span>确认</span>
        </div>
        <div class="flex items-center mx-4">
          <arrow-up-outlined class="btn" />
          <arrow-down-outlined class="mx-2 btn" />
          <span>切换</span>
        </div>
        <div class="flex items-center">
          <div class="px-1 btn">esc</div>
          <span>关闭</span>
        </div>
      </div>
    </w-modal>
  </div>
</template>

<script setup lang="ts">
import { screenPageList } from "../../index";

import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";

const route = useRoute();
const router = useRouter();

const visible = ref<boolean>(false);
const value = ref<string>("");

interface Active {
  title: string;
  icon: string;
  path: string;
}
const menuActive = ref<Active>();
const menuList = ref<Active[][]>([]);
// 获取查询的菜单
const getMenu = (val: string) => {
  if (val && val.length > 0) {
    menuList.value = screenPageList<Active>(val);
    if (menuList.value.length === 0) return false;
    let menuItem = menuList.value[0];
    menuActive.value = menuItem[menuItem.length - 1] ?? null;
  } else {
    menuList.value = [];
  }
};
// 设置高亮
const setHighlight = (val: Active[]) => {
  menuActive.value = val.length > 0 ? val[val.length - 1] : null;
};

// 是否高亮
const Highlight = (val: Active[]): boolean => {
  let has = false;
  if (val.length > 0 && val[val.length - 1].path === menuActive.value.path) {
    has = true;
  }
  return has;
};

// 跳转页面
const toPage = (val: Active[]) => {
  setHighlight(val);
  if (route.path === menuActive.value.path)
    return message.error("已在当前页面");
  router.push({ path: menuActive.value.path });
  visible.value = false;
};

const onKeyDown = (e: KeyboardEvent) => {
  let downKey = e.keyCode || e.which;
  let isHasKey = [40, 38, 13].includes(downKey);
  if (isHasKey && menuList.value.length && menuActive.value && visible.value) {
    let index: number = menuList.value.findIndex(
      x => x[x.length - 1].path === menuActive.value.path,
    ); //下标
    let menuLength = menuList.value.length;
    let firstItem = menuList.value[0][menuList.value[0].length - 1]; //第一个菜单
    let lastItem =
      menuList.value[menuLength - 1][menuList.value[menuLength - 1].length - 1]; //最后一个菜单

    if (downKey === 38) {
      //上
      if (index > 0) {
        menuActive.value =
          menuList.value[index - 1][menuList.value[index - 1].length - 1];
      } else {
        menuActive.value = lastItem;
      }
    }
    if (downKey === 40) {
      //下
      if (index < menuList.value.length - 1) {
        menuActive.value =
          menuList.value[index + 1][menuList.value[index + 1].length - 1];
      } else {
        menuActive.value = firstItem;
      }
    }
    if (downKey === 13) {
      //回车
      toPage(menuList.value[index]);
    }
  }
};

onMounted(() => {
  document.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeyDown);
});

// 打开弹框
const openModal = async () => {
  visible.value = true;
  await nextTick();
  document.getElementById("searchInput").focus();
};
</script>

<style scoped lang="scss">
.active {
  background-color: var(--ant-primary-color);
  color: #fff;
  .menu-item {
    transform: scale(1.1);
  }
}

.dark {
  .active {
    background-color: #177ddc;
    color: #fff;
  }
}

.btn {
  display: flex;
  width: 24px;
  height: 22px;
  padding-bottom: 2px;
  margin-right: 0.4em;
  border-radius: 2px;
  box-shadow: inset 0 -2.5px #cdcde6, inset 0 0 1px 1px #fff,
    0 1px 2px 1px #1e235a66;
  align-items: center;
  justify-content: center;
}
</style>
