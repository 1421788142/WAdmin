<template>
    <a-drawer
        v-model:visible="drawerShow"
        title="项目配置"
        placement="right"
        width="350px"
    >
     <div>
        <!-- 主题切换 -->
        <appDarkModeToggle/>
        <!-- 导航模式 -->
        <menuTypeVue/>
        <!-- 主题色切换 -->
        <themeColorVue/>
        <!-- 组件大小 -->
        <cmponentSizeVue/>
        <!-- 页面功能 -->
        <interfaceFunction/>
     </div>
    </a-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import appDarkModeToggle from "./component/appDarkModeToggle.vue";
import menuTypeVue from "./component/menuType.vue";
import themeColorVue from "./component/themeColor.vue";
import cmponentSizeVue from "./component/componentSize.vue";
import interfaceFunction from "./component/interfaceFunction.vue";

// 是否显示弹窗
const drawerShow = ref<boolean>(false)
const show = ()=> drawerShow.value = true
defineExpose({show})
</script>

<style scoped lang="scss">
</style>