import { Router, RouteLocationNormalized } from "vue-router"
import userStore from '@/store/user';
import { start, close } from '@/plugins/nprogress'
import { Modal } from 'ant-design-vue'
class Guard {
    constructor(private router: Router) {}
    public run() {
        const { VITE_PROJECT_NAME } = import.meta.env
        // 路由守卫
        this.router.beforeEach(async (to:RouteLocationNormalized, from:RouteLocationNormalized) => {
            //跳转路由清除弹窗
            Modal.destroyAll()
            start()

            //跳转前清空所有正在请求的接口
            const { setupRequestRecord, getUserInfo } = userStore()
            setupRequestRecord(null,'cancel') 

            let userInfo = getUserInfo//获取token
            if(this.isLogin(to, userInfo)) return { name:'login' }//判断是否登录
            if(this.prohibitLogin(to, userInfo)) return from //以登录状态禁止跳到登录
            if(to.meta.hidden && !to.meta.isDetail) return { name:'noAuthority' } //判断是否有权限访问
            let title = to.meta.title ? to.meta.title + '-' : ''
            window.document.title = title + VITE_PROJECT_NAME 
        })
        // 跳转完成清空进度条
        this.router.afterEach(() => close());
    }

    // 是否需要登录
    private isLogin(route: RouteLocationNormalized, userInfo: any) {
        return Boolean( route.name !=='login' && !userInfo)
    }
    // 已经登录禁止到登录页
    private prohibitLogin(route: RouteLocationNormalized, userInfo: any) {
        return Boolean( route.name === 'login' && userInfo)
    }
}
export default (router: Router) => {
    new Guard(router).run()
}   