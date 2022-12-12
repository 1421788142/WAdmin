import { RouteRecordRaw } from 'vue-router'
// 注册常用的路由
const routes = [
    {
        path:'/:any(.*)',
        name:'notFound',
        component:()=>import('../views/errors/404.vue'),
    },
    {
        path:'/403',
        name:'noAuthority',
        component:()=>import('../views/errors/403.vue'),
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/auth/login.vue'),
        meta: {
			title: "登录页",
			icon: ""
		}
    }
] as RouteRecordRaw[]
export default routes