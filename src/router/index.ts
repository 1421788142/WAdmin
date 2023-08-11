import { App } from "vue";
//          创建路由    路由模式
import { createRouter } from "vue-router";
// 引入所有组件
import { routes } from "./routers";//常用路由
import getRoutes from "./autoload";//自动注册路由
import guard from "./guard";//路由守卫
import { storeToRefs } from "pinia"
import userStore from '@/store/user';
import { getHistoryMode } from "u/util";
// 创建
console.log(getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY))
const router = createRouter({
    history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
    routes: routes,//将布局路由和自动注册路由合并
    // 切换页面，滚动到最顶部
    scrollBehavior: () => ({ left: 0, top: 0 })
})
export async function setupRouter(app: App) {
    // 先走守卫模式然后进行动态添加菜单
    guard(router)
    const appStore = userStore()
    let { userRouterList } = storeToRefs(appStore)
    // 动态添加菜单
    router.addRoute(getRoutes(userRouterList.value || []))
    app.use(router)
}
export default router