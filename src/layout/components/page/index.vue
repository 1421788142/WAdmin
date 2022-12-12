<template>
  <div class="wrapper-box h-[-webkit-fill-available] p-1 my-1 mb-1 dark:!bg-[#141414] overflow-y-auto overflow-x-hidden">
    <router-view #default="{ Component, route }">
      <transition appear name="fade-transform">
        <keep-alive :include="includeList">
          <component :is="Component" v-if="routerViewShow" :key="route.path"/>
        </keep-alive>
      </transition>
    </router-view>
    <a-back-top :target="targetFn" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { filterKeepAlive } from "@/layout";
import userStore from '@/store/user';
import { useRoute } from "vue-router";

export default defineComponent({
  name: "layoutContent",
  setup() {
    const { getHistoryMenu, setHistoryMenu } = userStore()
    const route = useRoute()

    // 缓存的页面
    const includeList = ref<string[]>([])
    const setIncludeList = async ()=>{
      let historyList:menuItem[] = await getHistoryMenu()
      let history = [...historyList.map(x=>x.path)]
      let include = history.filter(x=>filterKeepAlive().includes(x))
      includeList.value = include
    }

    // 刷新视图
    const routerViewShow = ref<boolean>(true);
    const setViewShow = async (isHasReset = true) => {
      routerViewShow.value = false;
      let historyList = await getHistoryMenu()
      let menuItem:menuItem[] = historyList.filter(x=>x.path === route.path)
      let menuItemList:menuItem[] = historyList.filter(x=>x.path !== route.path)
      if(isHasReset){
        await setHistoryMenu(menuItemList)
        await setIncludeList()
      }
      routerViewShow.value = true;
      setTimeout(async ()=>{
        await setHistoryMenu([...menuItemList,...menuItem])
        await setIncludeList()
        routerViewShow.value = true;
      },500)
    };

    const targetFn = () => document.querySelector(".wrapper-box"); //回到顶部
    setViewShow();

    watch(()=>route.path,()=>{
      setIncludeList()
    })

    return { routerViewShow, setViewShow, filterKeepAlive, targetFn, includeList };
  },
});
</script>

<style scoped>
</style>