<template>
  <div id="wrapper-box" class="wrapper-box h-[-webkit-fill-available] p-1 my-1 mb-1 dark:!bg-[#141414] overflow-y-auto overflow-x-hidden">
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
import { layoutRoute } from '@/router/routers'

export default defineComponent({
  name: "layoutContent",
  setup() {
    const { getHistoryMenu, setHistoryMenu } = userStore()
    const route = useRoute()
    const keepAliveList = [...filterKeepAlive()]
    let detailKeepAlive = [...layoutRoute.map(x=>x.path)]
    // 缓存的页面
    const includeList = ref<string[]>([])
    const setIncludeList = async ()=>{
      let historyList:menuItem[] = await getHistoryMenu()
      let history = [...historyList.map(x=>x.path)]
      let include = history.filter(x=>keepAliveList.includes(x))
      includeList.value = [...include,...detailKeepAlive]
    }

    // 刷新视图
    const routerViewShow = ref<boolean>(true);
    const setViewShow = async (isHasReset = true) => {
      routerViewShow.value = false;
      let historyList = await getHistoryMenu()
      // 正常菜单
      let menuItem:menuItem[] = historyList.filter(x=>x.path === route.path)
      let menuItemList:menuItem[] = historyList.filter(x=>x.path !== route.path)

      // 详情菜单
      let [ detailItem, detailList ] = [[],[]]
      if(route.meta.parentPath && route.meta.currentPath){
        detailItem = detailKeepAlive.filter(x=>x === route.meta.currentPath)
        detailList = detailKeepAlive.filter(x=>x !== route.meta.currentPath)
      }
      if(route.meta?.currentPath && isHasReset)detailKeepAlive = detailList
      
      if(isHasReset){
        await setHistoryMenu(menuItemList)
        await setIncludeList()
      }
      routerViewShow.value = true;
      setTimeout(async ()=>{
        if(route.meta?.currentPath && isHasReset) detailKeepAlive = [...detailList,...detailItem]
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