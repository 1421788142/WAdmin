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
import { layoutInterface } from "@/hooks/interface/layout";

export default defineComponent({
  name: "layoutContent",
  setup() {
    const { getConfigState, setConfigState } =
      inject<layoutInterface>("sysConfig");

    const isHasFull = computed(() => getConfigState("isHasFull"));

    const { getHistoryMenu } = userStore();
    const route = useRoute();

    //需要缓存的页面
    const keepAliveList = [...filterKeepAlive()];

    let currentPath = ""; //刷新时过滤当前页面

    // 缓存的页面
    const includeList = ref<string[]>([]);
    const setIncludeList = async () => {
      let historyList: menuItem[] = await getHistoryMenu();
      let history = [...historyList.map(x => x.path)];
      let include = history.filter(x => keepAliveList.includes(x));
      includeList.value = [...include].filter(x => x !== currentPath);
    };

    // 刷新视图
    const routerViewShow = ref<boolean>(true);
    const setViewShow = async (isHasReset = true) => {
      // 执行刷新动作 需先剔除当前菜单 然后重新加入到historyList中、
      if (isHasReset) {
        routerViewShow.value = false;
        currentPath = route.path;
        await setIncludeList();
      }
      setTimeout(async () => {
        routerViewShow.value = true;
        currentPath = "";
        await setIncludeList();
      }, 50);
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
