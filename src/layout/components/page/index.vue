<template>
  <div
    class="wrapper-box h-[-webkit-fill-available] px-1 my-1 mb-1 dark:!bg-[#141414] overflow-y-auto overflow-x-hidden"
  >
    <div
      class="close-full"
      v-if="isHasFull"
      @click="setConfigState('isHasFull', false)"
    >
      <close-outlined />
    </div>
    <router-view #default="{ Component, route }">
      <transition appear name="fade-transform">
        <keep-alive :include="includeList">
          <component :is="Component" v-if="routerViewShow" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
    <a-back-top :target="targetFn" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, inject, computed } from "vue";
import { filterKeepAlive } from "@/layout";
import userStore from "@/store/user";
import { useRoute } from "vue-router";
import { layoutRoute } from "@/router/routers";
import { layoutInterface } from "@/hooks/interface/layout";

export default defineComponent({
  name: "layoutContent",
  setup() {
    const { getConfigState, setConfigState } =
      inject<layoutInterface>("sysConfig");

    const isHasFull = computed(() => getConfigState("isHasFull"));

    const { getHistoryMenu, setHistoryMenu } = userStore();
    const route = useRoute();
    const keepAliveList = [...filterKeepAlive()];
    let detailKeepAlive = [...layoutRoute.map(x => x.path)];
    // 缓存的页面
    const includeList = ref<string[]>([]);
    const setIncludeList = async () => {
      let historyList: menuItem[] = await getHistoryMenu();
      let history = [...historyList.map(x => x.path)];
      let include = history.filter(x => keepAliveList.includes(x));
      includeList.value = [...include, ...detailKeepAlive];
    };

    // 刷新视图
    const routerViewShow = ref<boolean>(true);
    const setViewShow = async (isHasReset = true) => {
      routerViewShow.value = false;
      let historyList = await getHistoryMenu();
      // 正常菜单
      let menuItem: menuItem[] = historyList.filter(x => x.path === route.path);
      let menuItemList: menuItem[] = historyList.filter(
        x => x.path !== route.path,
      );

      // 详情菜单
      let [detailItem, detailList] = [[], []];
      if (route.meta.parentPath && route.meta.currentPath) {
        detailItem = detailKeepAlive.filter(x => x === route.meta.currentPath);
        detailList = detailKeepAlive.filter(x => x !== route.meta.currentPath);
      }
      if (route.meta?.currentPath && isHasReset) detailKeepAlive = detailList;

      if (isHasReset) {
        await setHistoryMenu(menuItemList);
        await setIncludeList();
      }
      routerViewShow.value = true;
      setTimeout(async () => {
        if (route.meta?.currentPath && isHasReset)
          detailKeepAlive = [...detailList, ...detailItem];
        await setHistoryMenu([...menuItemList, ...menuItem]);
        await setIncludeList();
        routerViewShow.value = true;
      }, 500);
    };

    const targetFn = () => document.querySelector(".wrapper-box"); //回到顶部
    setViewShow();

    watch(
      () => route.path,
      () => {
        setIncludeList();
      },
    );

    return {
      routerViewShow,
      setViewShow,
      filterKeepAlive,
      targetFn,
      includeList,
      getConfigState,
      setConfigState,
      isHasFull,
    };
  },
});
</script>

<style scoped lang="scss">
.close-full {
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  line-height: 24px;
  text-align: right;
  padding-right: 6px;
  font-size: 14px;
  color: #fff;
  z-index: 99;
  border-radius: 0 0 0 35px;
  box-shadow: 0 0 5px var(--ant-primary-color);
  background-color: var(--ant-primary-color);
  cursor: pointer;
}
.dark {
  .close-full {
    box-shadow: 0 0 5px #177ddc;
    background-color: #177ddc;
  }
}
</style>
