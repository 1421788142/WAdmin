import { RouteRecordRaw } from 'vue-router'
// 注册常用的路由
export const routes = [
    {
        path: '/:any(.*)',
        name: 'notFound',
        component: () => import('@/views/errors/404.vue'),
    },
    {
        path: '/403',
        name: 'noAuthority',
        component: () => import('@/views/errors/403.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/login.vue'),
        meta: {
            title: "登录页",
            icon: ""
        }
    },
    // 大屏页面需要单独配置替换掉自动注册的页面路由
    {
        path: '/dataScreen/home',
        name: 'dataScreenHome',
        component: () => import('@/views/dataScreen/home/index.vue'),
        meta: {
            title: "数据大屏",
            icon: "bar-chart-outlined"
        }
    },
    {
        path: '/dataScreen/operationsAnalysis',
        name: 'dataScreenOperationsAnalysis',
        component: () => import('@/views/dataScreen/operationsAnalysis/index.vue'),
        meta: {
            title: "数据大屏",
            icon: "bar-chart-outlined"
        }
    }
] as RouteRecordRaw[]

// 详情菜单路由  meta parentPath 必选参数
export const layoutRoute = [
    {
        component: 'feat/infoPage/detail/index',
        path: "/feat/infoPage/detail/:id",
        meta: {
            title: '详情页',
            icon: '',
            parentPath: '/feat/infoPage',
            currentPath: "/feat/infoPage/detail/:id",
        }
    }
]