<template>
    <div class="right-btn">
        <a-dropdown>
            <div @click="router.push(menuList[0].path)">
                {{ menuList[0].title }}
            </div>
            <template #overlay>
                <div class="bg-[#16E3E580]">
                    <div v-for="menu in menuList" @click="toPage(menu)"
                        class="p-4 py-2 cursor-pointer hover:bg-[#03344780] transition">
                        <span class="text-[#05E8FE]">{{ menu.title }}</span>
                    </div>
                </div>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

interface menuType {
    title: string,
    path: string,
    sort: number
}
const menuListTarget = [
    { title: '数据分析', path: '/dataScreen/operationsAnalysis', sort: 0 },
    { title: '数据大屏', path: '/dataScreen/home', sort: 0 },
]

const menuList = computed(() => {
    menuListTarget.forEach(x => x.path === route.path && (x.sort = 9))
    return menuListTarget.sort((a, b) => a.sort - b.sort)
})

const toPage = (menu: menuType) => {
    if (route.path === menu.path) return
    router.push(menu.path)
}
</script>

<style scoped></style>